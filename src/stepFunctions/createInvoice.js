const { v4: uuidv4 } = require('uuid');
const { saveOrder } = require('../services/orders');

module.exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event, null, 2));
  const order = event;

  order.invoiceNumber = await createInvoice(order);

  await saveOrder(order);

  await notifyStore();

  callback(null, order);
};

const notifyStore = () => {};
const createInvoice = async order => {
  console.log('order:', order);

  return uuidv4();
};
