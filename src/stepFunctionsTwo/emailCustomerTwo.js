const { saveOrder } = require('../services/orders');

module.exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event, null, 2));
  const order = event;

  await saveOrder(order);

  await emailCustomer();

  callback(null, order);
};

const emailCustomer = () => {};
