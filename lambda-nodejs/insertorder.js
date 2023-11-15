const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = async function (event, context) {
    console.log(event);
    try {
        let detail = JSON.parse(event.body);
        console.log(detail);
        await ddb
            .put({
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
            })
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
        body: JSON.stringify({
            message: "Inserted Successfully"
        }),
        "headers": {
            "content-type": "application/json"
          }
    };
};