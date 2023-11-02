const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
    let connections;
    try {
        connections = await ddb.scan({ TableName: process.env.table }).promise();
    } catch (err) {
        return {
            statusCode: 500,
        };
    }
    
    var endpoint = process.env.endpoint
    if(event.requestContext)
        endpoint = event.requestContext.domainName + '/' + event.requestContext.stage;
    
    
    const callbackAPI = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint:endpoint
    });

    console.log(event);
    
    const message = event.body.message? event.body.message : JSON.parse(event.body).message;
    const reqconnectionId = event.requestContext? event.requestContext.connectionId :'dummy'
    
    const sendMessages = connections.Items.map(async ({ connectionId }) => {
        if (connectionId !== reqconnectionId) {
            try {
                await callbackAPI
                    .postToConnection({ ConnectionId: connectionId, Data: message })
                    .promise();
            } catch (e) {
                console.log(e);
            }
        }
    });

    try {
        await Promise.all(sendMessages);
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
        };
    }

    return { statusCode: 200 };
};