const { v4: uuidv4 } = require('uuid');

module.exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event, null, 2));
  const order = event;

  order.invoiceNumber = await createInvoice(order);

  callback(null, order);
};

const createInvoice = async order => {
  console.log('order:', order);

  return uuidv4();
};
