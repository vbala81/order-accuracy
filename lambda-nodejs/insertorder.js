const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = async function (event, context) {
    console.log(event);
    let params = {};
    try {
        let detail = JSON.parse(event.body);
        console.log(detail);
        params = {
            TableName: process.env.table,
            Item: {
                Id: (Math.random() + 1).toString(36).substring(7),
                orderId: (Math.random() + 1).toString(36).substring(7),
                order: detail.order,
                orderdate: detail.orderdate,
                isready: detail.isready,
                orderissue: detail.orderissue,
                s3imagelink: ""
            },
        }
        await ddb
            .put(params)
            .promise();
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body : JSON.stringify({
                message: "Exception in inserting .." + err
            }),
            "headers": {
                "content-type": "application/json"
              }
            
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
        "headers": {
            "content-type": "application/json"
          }
    };
};