output "websocket-endpoint" {
  value = "${aws_apigatewayv2_api.order_messenger_api_gateway.api_endpoint}/${var.api_stage_name}"
}

output "captureImagebucketName" {
  value = "s3://${aws_s3_bucket.captureImage.id}"
}

output "http-endpoint" {
  value = "${aws_apigatewayv2_api.order_accuracy_api_gateway.api_endpoint}"
}