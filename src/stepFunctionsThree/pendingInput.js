const { saveOrder } = require('../services/orders');

module.exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event, null, 2));

  const payloadOrder = event.find(obj => 'order' in obj);
  const payloadTaskToken = event.find(obj => 'taskToken' in obj);
  const { order } = payloadOrder;

  order.taskToken = payloadTaskToken.taskToken;

  console.log('order:', order);

  await saveOrder(order);

  callback(null, order);
};
