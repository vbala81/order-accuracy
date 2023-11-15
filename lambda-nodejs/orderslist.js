const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = async function (event, context) {
    console.log(event);
    try {
       let queryresults =  await ddb
            .scan({
                TableName: process.env.table
            })
            .promise();
            console.log(queryresults);
            return {
                statusCode: 200, 
                body: JSON.stringify(queryresults),
                "headers": {
                    "content-type": "application/json"
                  }
            };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            "headers": {
                "content-type": "application/json"
              },
              body : JSON.stringify({
                message: "Exception in inserting .." + err
            })
        };
    }
    
};