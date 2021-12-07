module.exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event, null, 2));
  const order = event;

  await notifyStore();

  callback(null, order);
};

const notifyStore = () => {};
