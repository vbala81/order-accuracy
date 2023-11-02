var AWS = require('aws-sdk')

const rekognition = new AWS.Rekognition({ region: 'us-east-1' });

exports.handler = async (event) => {
  // TODO implement
  console.log(JSON.stringify(event));
  const params = {
    Image: {
      S3Object: {
        Bucket: event.Records[0].s3.bucket.name,
        Name: event.Records[0].s3.object.key,
      },
    },
    MinConfidence: 70,
  };
  console.log(JSON.stringify(params));

  const imageLabels = await rekognition.detectLabels(params).promise();
  // If no labels found -> image doesn't contain any forbidden content
  if (!imageLabels || imageLabels.length === 0) {
    return [];
  }

  //console.log('Found Labels:', imageLabels.Labels);
  const labels = imageLabels.Labels.map((label) => label.Name);
  console.log('Found Labels:', labels.join(","));
  const lambda1 = new AWS.Lambda();


  await lambda1.invoke({
    FunctionName: process.env.lambda_function,
    Payload: JSON.stringify({"body" : {
      connectionId: 'dummy',
      message: labels.join(',')
    }})
}) .promise();
}
