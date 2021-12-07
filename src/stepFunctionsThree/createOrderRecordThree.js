const { saveOrder } = require('../services/orders');

module.exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event, null, 2));
  const order = event;

  await saveOrder(order);

  callback(null, order);
};
