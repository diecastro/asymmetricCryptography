import actionTypes from '../constants/actionTypes';

const defaultValues = {
  errorEncryption:false,
  showDecryptionForm:false
};

const initialReducer = (state = defaultValues, action) => {
  switch (action.type) {
    case actionTypes.encryptionMessageFailure: 
      return {...state, errorEncryption:true, showDecryptionForm:false}
      break;
    case actionTypes.encryptionMessageRequest: 
    case actionTypes.encryptionMessageSuccess: 
      return {...state, errorEncryption:false, showDecryptionForm:true}
      break;
    default:
      return state;
  }
};

export default initialReducer;
