region='us-east-1'
bucket_name='order-accuracycapture-image-bucket'
# bucket_name='sagemaker-us-east-1-868024899531'
aws s3 cp images/ s3://${bucket_name}/input --recursive

aws cloudformation create-stack --stack-name might-infra \
    --template-body file://cfn/cfn-main.yaml \
    --parameters file://cfn/cfn-main.json \
    --capabilities CAPABILITY_NAMED_IAM --region ${region}


# aws cloudformation update-stack --stack-name might-infra \
#     --template-body file://cfn/cfn-main.yaml \
#     --parameters file://cfn/cfn-main.json \
#     --capabilities CAPABILITY_NAMED_IAM