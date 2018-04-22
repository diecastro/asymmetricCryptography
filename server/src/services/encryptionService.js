module.exports.encrypText = payload => new Promise((resolve, reject) => {
  payload.false === undefined ? resolve(payload) : reject(payload);
});
