terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {
    bucket = "order-accuracycapture-image-bucket"
    key    = "plusone/terraform.tfstate"
    region = "us-east-1"
    profile = "AWS_868024899531_iesawsna-sandbox"
  }
  required_version = ">= 1.3.6"
}

provider "aws" {
  region = "us-east-1"
  profile = "AWS_868024899531_iesawsna-sandbox"

  default_tags {
    tags = {
      Environment = "develop"
      Application = "Order_${var.application_name}"
    }
  }
}


resource "aws_apigatewayv2_api" "order_messenger_api_gateway" {
  name                       = "${var.application_name}_0rder_chat_api"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

resource "aws_apigatewayv2_integration" "order_messenger_api_integration" {
  api_id                    = aws_apigatewayv2_api.order_messenger_api_gateway.id
  integration_type          = "AWS_PROXY"
  integration_uri           = aws_lambda_function.order_messenger_lambda.invoke_arn
  credentials_arn           = aws_iam_role.order_messenger_api_gateway_role.arn
  content_handling_strategy = "CONVERT_TO_TEXT"
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_integration" "order_disconnect_messenger_api_integration" {
  api_id                    = aws_apigatewayv2_api.order_messenger_api_gateway.id
  integration_type          = "AWS_PROXY"
  integration_uri           = aws_lambda_function.order_disconnect_messenger_lambda.invoke_arn
  credentials_arn           = aws_iam_role.order_messenger_api_gateway_role.arn
  content_handling_strategy = "CONVERT_TO_TEXT"
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_integration" "order_sendmessage_messenger_api_integration" {
  api_id                    = aws_apigatewayv2_api.order_messenger_api_gateway.id
  integration_type          = "AWS_PROXY"
  integration_uri           = aws_lambda_function.order_send_messenger_lambda.invoke_arn
  credentials_arn           = aws_iam_role.order_messenger_api_gateway_role.arn
  content_handling_strategy = "CONVERT_TO_TEXT"
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_integration" "order_default_messenger_api_integration" {
  api_id                    = aws_apigatewayv2_api.order_messenger_api_gateway.id
  integration_type          = "AWS_PROXY"
  integration_uri           = aws_lambda_function.order_default_messenger_lambda.invoke_arn
  credentials_arn           = aws_iam_role.order_messenger_api_gateway_role.arn
  content_handling_strategy = "CONVERT_TO_TEXT"
  passthrough_behavior      = "WHEN_NO_MATCH"
}



resource "aws_apigatewayv2_route" "order_messenger_api_default_route" {
  api_id    = aws_apigatewayv2_api.order_messenger_api_gateway.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.order_default_messenger_api_integration.id}"
}


resource "aws_apigatewayv2_route" "order_messenger_api_connect_route" {
  api_id    = aws_apigatewayv2_api.order_messenger_api_gateway.id
  route_key = "$connect"
  target    = "integrations/${aws_apigatewayv2_integration.order_messenger_api_integration.id}"
}


resource "aws_apigatewayv2_route" "order_messenger_api_disconnect_route" {
  api_id    = aws_apigatewayv2_api.order_messenger_api_gateway.id
  route_key = "$disconnect"
  target    = "integrations/${aws_apigatewayv2_integration.order_disconnect_messenger_api_integration.id}"
}

resource "aws_apigatewayv2_route" "order_messenger_api_sendmessage_route" {
  api_id    = aws_apigatewayv2_api.order_messenger_api_gateway.id
  route_key = "sendmessage"
  target    = "integrations/${aws_apigatewayv2_integration.order_sendmessage_messenger_api_integration.id}"
}


resource "aws_apigatewayv2_stage" "order_messenger_api_stage" {
  api_id      = aws_apigatewayv2_api.order_messenger_api_gateway.id
  name        = var.api_stage_name
  auto_deploy = true

}

resource "aws_lambda_permission" "order_messenger_lambda_permissions" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.order_messenger_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.order_messenger_api_gateway.execution_arn}/*/*"
}

resource "aws_lambda_permission" "order_defaultmessenger_lambda_permissions" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.order_default_messenger_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.order_messenger_api_gateway.execution_arn}/*/*"
}

resource "aws_lambda_permission" "order_disconnectmessenger_lambda_permissions" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.order_disconnect_messenger_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.order_messenger_api_gateway.execution_arn}/*/*"
}

resource "aws_lambda_permission" "order_sendmessagemessenger_lambda_permissions" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.order_send_messenger_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.order_messenger_api_gateway.execution_arn}/*/*"
}

resource "aws_dynamodb_table" "order_messenger_table" {
  name           = "${var.application_name}-chat-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key       = "connectionId"

  attribute {
    name = "connectionId"
    type = "S"
  }

  ttl {
    attribute_name = "ExpirationTime"
    enabled        = true
  }
}

resource "aws_dynamodb_table" "orders" {
  name           = "${var.application_name}-orders-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key       = "Id"

  attribute {
    name = "Id"
    type = "S"
  }
 
  attribute {
    name = "orderdate"
    type = "S"
  }
  # attribute {
  #   name = "order"
  #   type = "S"
  # }
  # attribute {
  #   name = "orderissue"
  #   type = "S"
  # }
  # attribute {
  #   name = "isready"
  #   type = "B"
  # }
  # attribute {
  #   name = "s3bucketurl"
  #   type = "S"
  # }
  attribute {
    name = "orderId"
    type = "S"
  }
  global_secondary_index {
    name               = "OrderIdtimestampIndex"
    hash_key           = "orderId"
    range_key          = "orderdate"
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "INCLUDE"
    non_key_attributes = ["order","orderissue","isready","s3bucketurl"]
  }


}
