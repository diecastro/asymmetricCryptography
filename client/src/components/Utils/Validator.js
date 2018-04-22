import errorMessages from '../../constants/messages';
import _ from 'lodash';

const Validator = {

    messages: errorMessages.validator,
  
    hasNoValue: function (value) {
      return !value;
    },

    validateEncryptionForm: function (values){
        let errors = {};
        let that = this;
    
        const requiredFields = [
          'plainText',
          'publicKey'
        ];
        _.map(requiredFields, (field) => {
          if (this.hasNoValue(values[field])) {
            errors[field] = that.messages.requiredText;
          }
        });
    
        return errors;
      },
      validateDecryptionForm: function (values){
        let errors = {};
        let that = this;
    
        const requiredFields = [
          'publicKey',
          'encryptedText'
        ];
        _.map(requiredFields, (field) => {
          if (this.hasNoValue(values[field])) {
            errors[field] = that.messages.requiredText;
          }
        });
    
        return errors;
      },
};  

export default Validator;
