import {CALL_API} from '../middleware/api';
import actionTypes from '../constants/actionTypes';

export function encryptBody(body) {
  let endpoint = 'encrypt/encryptText';
  return {
    [CALL_API]: {
      endpoint: endpoint,
      method: 'POST',
      encrypted: true,
      types: [actionTypes.encryptionMessageRequest, actionTypes.encryptionMessageSuccess, actionTypes.encryptionMessageFailure],
      body
    }
  };
}

export function decryptBody(body) {
  let endpoint = 'encrypt/decryptText';
  return {
    [CALL_API]: {
      endpoint: endpoint,
      method: 'POST',
      encrypted: false,
      types: [actionTypes.decryptionMessageRequest, actionTypes.decryptionMessageSuccess, actionTypes.decryptionMessageFailure],
      body
    }
  };
}