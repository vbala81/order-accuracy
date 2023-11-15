data "aws_iam_policy_document" "order_messenger_lambda_policy" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    effect    = "Allow"
    resources = ["arn:aws:logs:*:*:*"]
  }

  statement {
    actions = [
      "rekognition:*",
    ]
    effect    = "Allow"
    resources = ["*"]
  }
  statement {
    actions = [
      "s3:*",
    ]
    effect    = "Allow"
    resources = [aws_s3_bucket.captureImage.arn, "${aws_s3_bucket.captureImage.arn}/**"]
  }

  statement {
    actions = [
      "lambda:InvokeFunction",
      "lambda:InvokeAsync"
    ]
    effect    = "Allow"
    resources = ["*"]
  }



  statement {
    actions = [
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:Scan",
    ]
    effect    = "Allow"
    resources = [aws_dynamodb_table.order_messenger_table.arn,
                aws_dynamodb_table.orders.arn]
  }

  statement {
    actions = [
      "execute-api:*",
    ]
    effect = "Allow"
    resources = [
      "${aws_apigatewayv2_stage.order_messenger_api_stage.execution_arn}/*/*/*"
    ]
  }
}
data "aws_iam_policy_document" "order_messenger_api_gateway_policy" {
  statement {
    actions = [
      "lambda:InvokeFunction",
    ]
    effect = "Allow"
    resources = [aws_lambda_function.order_messenger_lambda.arn,
      aws_lambda_function.order_default_messenger_lambda.arn,
      aws_lambda_function.order_send_messenger_lambda.arn,
      aws_lambda_function.order_disconnect_messenger_lambda.arn,
      //aws_lamda_function.order_insert_lambda.arn
    ]
  }
  //depends_on = [ aws_lambda_function.order_insert_lambda ]
}


resource "aws_iam_policy" "order_messenger_lambda_policy" {
  name   = "${var.application_name}_WsLambdaPolicy"
  path   = "/"
  policy = data.aws_iam_policy_document.order_messenger_lambda_policy.json
}

resource "aws_iam_policy" "order_messenger_api_gateway_policy" {
  name   = "${var.application_name}_WSAPIGPolicy"
  path   = "/"
  policy = data.aws_iam_policy_document.order_messenger_api_gateway_policy.json
}

resource "aws_iam_role" "order_messenger_lambda_role" {
  name = "${var.application_name}_WsLambdaRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
  managed_policy_arns = [aws_iam_policy.order_messenger_lambda_policy.arn]
}

resource "aws_iam_role" "order_messenger_api_gateway_role" {
  name = "${var.application_name}_WsAPIGRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "apigateway.amazonaws.com"
        }
      },
    ]
  })

  managed_policy_arns = [aws_iam_policy.order_messenger_api_gateway_policy.arn]
}

data "archive_file" "connect-handler" {
  type        = "zip"
  source_file = "../lambda-nodejs/connect.js"
  output_path = "../lambda-nodejs/zip/lambda_function_connect.zip"
}

data "archive_file" "disconnect-handler" {
  type        = "zip"
  source_file = "../lambda-nodejs/disconnect.js"
  output_path = "../lambda-nodejs/zip/lambda_function_disconnect.zip"
}

data "archive_file" "sendmessage-handler" {
  type        = "zip"
  source_file = "../lambda-nodejs/sendmessage.js"
  output_path = "../lambda-nodejs/zip/lambda_function_sendmessage.zip"
}

data "archive_file" "default-handler" {
  type        = "zip"
  source_file = "../lambda-nodejs/default.js"
  output_path = "../lambda-nodejs/zip/lambda_function_default.zip"
}



resource "aws_lambda_function" "order_default_messenger_lambda" {
  filename         = data.archive_file.default-handler.output_path
  function_name    = "${var.application_name}_order-default"
  role             = aws_iam_role.order_messenger_lambda_role.arn
  handler          = "default.handler"
  runtime          = "nodejs16.x"
  source_code_hash = data.archive_file.default-handler.output_base64sha256

  environment {
    variables = {
      "table" = aws_dynamodb_table.order_messenger_table.id
    }
  }
}

resource "aws_lambda_function" "order_messenger_lambda" {
  filename         = data.archive_file.connect-handler.output_path
  function_name    = "${var.application_name}_order-connect"
  role             = aws_iam_role.order_messenger_lambda_role.arn
  handler          = "connect.handler"
  runtime          = "nodejs16.x"
  source_code_hash = data.archive_file.connect-handler.output_base64sha256

  environment {
    variables = {
      "table" = aws_dynamodb_table.order_messenger_table.id
    }
  }
}

resource "aws_lambda_function" "order_disconnect_messenger_lambda" {
  filename         = data.archive_file.disconnect-handler.output_path
  function_name    = "${var.application_name}_order-disconnect"
  role             = aws_iam_role.order_messenger_lambda_role.arn
  handler          = "disconnect.handler"
  runtime          = "nodejs16.x"
  source_code_hash = data.archive_file.disconnect-handler.output_base64sha256

  environment {
    variables = {
      "table" = aws_dynamodb_table.order_messenger_table.id
    }
  }
}


resource "aws_lambda_function" "order_send_messenger_lambda" {
  filename         = data.archive_file.sendmessage-handler.output_path
  function_name    = "${var.application_name}_order-sendmessage"
  role             = aws_iam_role.order_messenger_lambda_role.arn
  handler          = "sendmessage.handler"
  runtime          = "nodejs16.x"
  source_code_hash = data.archive_file.sendmessage-handler.output_base64sha256

  environment {
    variables = {
      "table"    = aws_dynamodb_table.order_messenger_table.id,
      "endpoint" = replace("${aws_apigatewayv2_api.order_messenger_api_gateway.api_endpoint}/${var.api_stage_name}", "wss://", "")
    }
  }
}


resource "aws_cloudwatch_log_group" "order_send_messenger_logs" {
  name              = "/aws/lambda/${aws_lambda_function.order_send_messenger_lambda.function_name}"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "order_disconnect_messenger_logs" {
  name              = "/aws/lambda/${aws_lambda_function.order_disconnect_messenger_lambda.function_name}"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "order_messenger_logs" {
  name              = "/aws/lambda/${aws_lambda_function.order_messenger_lambda.function_name}"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "order_default_messenger_logs" {
  name              = "/aws/lambda/${aws_lambda_function.order_default_messenger_lambda.function_name}"
  retention_in_days = 30
}
