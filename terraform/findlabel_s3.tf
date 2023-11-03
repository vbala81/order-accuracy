data "archive_file" "findlabelsimage-handler" {
  type        = "zip"
  source_file = "../lambda-nodejs/findlabelsfromImage.js"
  output_path = "../lambda-nodejs/zip/lambda_function_findlabels.zip"
}


resource "aws_lambda_function" "findlabelsfromImage_lambda" {
  filename         = data.archive_file.findlabelsimage-handler.output_path
  function_name    = "${var.application_name}_findlabelfromImage"
  role             = aws_iam_role.order_messenger_lambda_role.arn
  handler          = "findlabelsfromImage.handler"
  runtime          = "nodejs16.x"
  source_code_hash = data.archive_file.findlabelsimage-handler.output_base64sha256

  environment {
    variables = {
      "lambda_function" = aws_lambda_function.order_send_messenger_lambda.function_name
    }
  }
}

resource "aws_s3_bucket" "captureImage" {
  bucket = lower("${var.application_name}catureImage")

}


resource "null_resource" "wait_for_lambda_trigger" {
  depends_on   = [aws_lambda_permission.s3_trigger]
  provisioner "local-exec" {
    command = "sleep 60"
  }
}

resource "aws_lambda_permission" "s3_trigger" {
  statement_id  = "AllowS3Invoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.findlabelsfromImage_lambda.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = "arn:aws:s3:::${aws_s3_bucket.captureImage.id}"
}

resource "aws_s3_bucket_notification" "aws-lambda-trigger" {
  bucket = aws_s3_bucket.captureImage.id
  lambda_function {
    lambda_function_arn = aws_lambda_function.findlabelsfromImage_lambda.arn
    events              = ["s3:ObjectCreated:*"]
  }

  depends_on = [
    aws_lambda_function.findlabelsfromImage_lambda,
    aws_s3_bucket.captureImage,
    null_resource.wait_for_lambda_trigger
  ]
}


