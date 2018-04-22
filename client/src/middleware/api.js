import messages from '../constants/messages';

const serialize = function (data) {

  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
};

function callApi(endpoint, method, authenticated, body, encrypted) {

  const encrypt = new JSEncrypt();
  let token = localStorage.getItem('token') || null;
  body = typeof body === 'object' ? JSON.stringify(body) : body;

  let config = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization' : `Bearer ${token}`
    },
  };

  if (method !== 'GET') {

    if (encrypted) {
      let newBody = JSON.parse(body);
      let key = newBody.publicKey;
      delete newBody.publicKey;
      encrypt.setPublicKey(key);
      // encrypt.setPublicKey(siteKey);
      let encryptedPayload = encrypt.encrypt(JSON.stringify(newBody));
      config.body = encodeURI(encryptedPayload);
    } else {
      config.body = body ? serialize({payload: body}) : null;
    }

  }

  if (authenticated && !token) {
    return Promise.reject({message: 'No token saved'});
  }

  return fetch(serverBaseUrl + endpoint, config)
    .then(response => {
      if (response.status === 204 || response.status === 403) {
        return response.text().then(payload => ({payload, response}));
      } else if (response.status === 400) {
        return response.json().then(payload => {
          return {payload: {message: payload.message}, response: response};
        });
      } else if (response.status === 413) {
        return {payload: {message: messages.tooLarge.message}, response: response};
      } else {
        return response.json().then(payload => ({payload, response}));
      }
    }).then(({payload, response}) => {
      if (!response.ok) {
        try {
          let errorPayload = JSON.parse(payload);
          return Promise.reject(errorPayload)
        }
        catch (err) {
          return Promise.reject(payload)
        }
      }
      return payload
    }).catch(err => {
      try {
        let error = JSON.parse(err);
        return Promise.reject(error)
      }
      catch (e) {
        return Promise.reject(err)
      }
    })
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {

  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (!action[CALL_API]) {
    return next(action);
  }

  let {endpoint, method, types, authenticated, body, encrypted} = callAPI;

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({type: requestType}));

  return callApi(endpoint, method, authenticated, body, encrypted).then(
    response => next(actionWith({
      response,
      authenticated,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'There was an error'
    }))
  )
}
