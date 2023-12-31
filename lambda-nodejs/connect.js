const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = async function (event, context) {
    try {
        console.log(event);
        await ddb
            .put({
                TableName: process.env.table,
                Item: {
                    connectionId: event.requestContext.connectionId,
                },
            })
            .promise();
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
        };
    }
    return {
        statusCode: 200,
    };
};