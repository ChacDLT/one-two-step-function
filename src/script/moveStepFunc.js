const yargs = require('yargs');
const AWS = require('aws-sdk');

const init = async () => {
  const { argv } = yargs
    .option('region', {
      alias: 'r',
      description: 'AWS Region',
      type: 'string',
      demandOption: true,
    })
    .option('env', {
      alias: 'e',
      description: 'Environment (stage) Name',
      type: 'string',
      demandOption: true,
    })
    .option('profile', {
      alias: 'p',
      description: 'AWS CLI profile name',
      type: 'string',
    })
    .option('id', {
      alias: 'i',
      description: 'id',
      type: 'string',
      demandOption: true,
    })
    .option('message', {
      alias: 'm',
      description: 'message to send to stepfunction',
      type: 'string',
      demandOption: true,
    })
    .help()
    .alias('help', 'h');

  const { region, env, id, profile, message } = argv;

  if (profile) {
    process.env.AWS_PROFILE = profile;
  }

  AWS.config.update({ region });

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const stepfunctions = new AWS.StepFunctions();
  const tableName = 'order-dev-table';

  const { Item: order } = await dynamodb
    .get({
      TableName: tableName,
      Key: {
        id,
      },
    })
    .promise();

  const params = {
    output: JSON.stringify(order),
    taskToken: order.taskToken,
  };

  await stepfunctions.sendTaskSuccess(params).promise();
};

init();
