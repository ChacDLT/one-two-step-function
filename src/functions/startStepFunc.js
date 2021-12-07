const { StepFunctions } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const stepfunctions = new StepFunctions();
const faker = require('faker');

module.exports.handler = async event => {
  console.log('event', event);
  const stepFunctionArn = getStepFunctionArn(event);
  const order = generateOrder();

  startStepFunction(order, stepFunctionArn);
};

const startStepFunction = async (order, stepFunctionArn) => {
  const params = {
    stateMachineArn: stepFunctionArn,
    input: JSON.stringify(order),
    name: order.executionName,
  };

  try {
    await stepfunctions.startExecution(params).promise();
  } catch (error) {
    console.error(error);
  }
};

const generateOrder = () => {
  const order = {};

  const id = uuidv4();

  console.log('id: ', id);

  order.id = id;
  order.executionName = id;
  order.name = faker.name.findName();
  order.email = faker.internet.email();
  order.product = faker.commerce.product();
  order.price = faker.commerce.price();
  order.orderStatus = 'created';

  return order;
};

const getStepFunctionArn = key => {
  switch (key) {
    case 'one':
      return 'arn:aws:states:us-west-2:037364081076:stateMachine:firstdevStateMachine';
    case 'two':
      return 'arn:aws:states:us-west-2:037364081076:stateMachine:seconddevStateMachine';
    default:
      console.log('Cant find arn');
  }
};
