const { DynamoDB } = require('aws-sdk');

const dynamodb = new DynamoDB.DocumentClient({ region: process.env.region });
const { ORDER_TABLE_NAME } = process.env;

const getOrder = async id => {
  try {
    const res = await dynamodb
      .get({
        TableName: ORDER_TABLE_NAME,
        Key: {
          id,
        },
      })
      .promise();

    const order = res.Item;

    return order;
  } catch (error) {
    console.error(error);

    return false;
  }
};

const createOrder = async orderInfo => {
  orderInfo.updatedAt = new Date().toISOString();

  try {
    await dynamodb
      .put({
        TableName: ORDER_TABLE_NAME,
        Item: orderInfo,
      })
      .promise();

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

module.exports = { getOrder, createOrder };
