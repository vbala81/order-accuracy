resource "aws_apigatewayv2_api" "order_accuracy_api_gateway" {
  name                       = "${var.application_name}_order_accuracy_api"
  protocol_type              = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["POST", "GET", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age = 300
  }
}

// Stage

resource "aws_apigatewayv2_stage" "order_accuracy_api_stage" {
  api_id      = aws_apigatewayv2_api.order_accuracy_api_gateway.id
  name        = var.api_stage_name
  auto_deploy = true

}

// integration

resource "aws_apigatewayv2_integration" "order_insertorder_api_integration" {
  api_id                    = aws_apigatewayv2_api.order_accuracy_api_gateway.id
  integration_type          = "AWS_PROXY"
   integration_method        = "POST"
  integration_uri           = aws_lambda_function.order_insert_lambda.invoke_arn
  //credentials_arn           = aws_iam_role.order_messenger_api_gateway_role.arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}



//lambda to insert the order


data "archive_file" "insertorder-handler" {
  type        = "zip"
  source_file = "../lambda-nodejs/insertorder.js"
  output_path = "../lambda-nodejs/zip/lambda_function_insertorder.zip"
}

resource "aws_lambda_function" "order_insert_lambda" {
  filename         = data.archive_file.insertorder-handler.output_path
  function_name    = "${var.application_name}_order-insert"
  role             = aws_iam_role.order_messenger_lambda_role.arn
  handler          = "insertorder.handler"
  runtime          = "nodejs16.x"
  source_code_hash = data.archive_file.insertorder-handler.output_base64sha256

  environment {
    variables = {
      "table" = aws_dynamodb_table.orders.id
    }
  }
  
}

resource "aws_cloudwatch_log_group" "order_insertorder_logs" {
  name              = "/aws/lambda/${aws_lambda_function.order_insert_lambda.function_name}"
  retention_in_days = 30
}


resource "aws_apigatewayv2_route" "order_insertion_route" {
  api_id    = aws_apigatewayv2_api.order_accuracy_api_gateway.id
  route_key = "POST /orders/insert"

  target = "integrations/${aws_apigatewayv2_integration.order_insertorder_api_integration.id}"
}



resource "aws_lambda_permission" "order_insertion_lambda_permissions" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.order_insert_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.order_accuracy_api_gateway.execution_arn}/*/*"
}


// get the orders


data "archive_file" "getorder-handler" {
  type        = "zip"
  source_file = "../lambda-nodejs/orderslist.js"
  output_path = "../lambda-nodejs/zip/lambda_function_orderslist.zip"
}

resource "aws_lambda_function" "order_list_lambda" {
  filename         = data.archive_file.getorder-handler.output_path
  function_name    = "${var.application_name}_order-list"
  role             = aws_iam_role.order_messenger_lambda_role.arn
  handler          = "orderslist.handler"
  runtime          = "nodejs16.x"
  source_code_hash = data.archive_file.getorder-handler.output_base64sha256

  environment {
    variables = {
      "table" = aws_dynamodb_table.orders.id
    }
  }
  
}

resource "aws_cloudwatch_log_group" "order_list_logs" {
  name              = "/aws/lambda/${aws_lambda_function.order_list_lambda.function_name}"
  retention_in_days = 30
}






resource "aws_apigatewayv2_integration" "order_list_api_integration" {
  api_id                    = aws_apigatewayv2_api.order_accuracy_api_gateway.id
  integration_type          = "AWS_PROXY"
   integration_method        = "POST"
  integration_uri           = aws_lambda_function.order_list_lambda.invoke_arn
  //credentials_arn           = aws_iam_role.order_messenger_api_gateway_role.arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}





resource "aws_apigatewayv2_route" "order_list_route" {
  api_id    = aws_apigatewayv2_api.order_accuracy_api_gateway.id
  route_key = "GET /orders/list"

  target = "integrations/${aws_apigatewayv2_integration.order_list_api_integration.id}"
}



resource "aws_lambda_permission" "order_list_lambda_permissions" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.order_list_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.order_accuracy_api_gateway.execution_arn}/*/*"
}


