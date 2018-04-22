import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import {FormControlLabel} from 'material-ui/Form';
import Validator from '../Utils/Validator';
import _ from 'lodash';
import styles from '../../styles/Styles.scss';


const renderTextField = ({input, label, helperText, meta: {touched, error}, ...custom, ...props}) => {
  let errorText = touched && error ? error : null;
  return (
    <TextField
      id={input.name}
      label={label}
      error={Boolean(touched && error)}
      helperText={errorText ? errorText : helperText}
      value={input.value ? input.value : ''}
      labelClassName={styles.formLabel}
      inputClassName={styles.formInput}
      multiline={true}
      {...input}
      {...custom}
    />
  );
};

const validate = values => {
  if (_.isEmpty(values)) {
    return {};
  } else {
    return Validator.validateEncryptionForm(values);
  }
};

class EncryptionForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, pristine, reuset, submitting} = this.props;


    return (
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowForm}`}>
            <div className='col-md-6 no-padding'>
              <Field
                label='Texto a encriptar'
                type='text'
                component={renderTextField}
                fullWidth={true}
                name='plainText'
              />
            </div>
            <div className='col-md-6 no-padding'>
              <Field
                label='Texto Encriptado'
                component={renderTextField}
                fullWidth={true}
                name='encryptedText'
                type='text'
                disabled={true}
              />
            </div>
            </div>
        </form>
    );
  }
}


EncryptionForm = reduxForm({
  form: 'encryptionForm',
  validate,
  fields: [
    'plainText',
    'encryptedText',
  ],
  enableReinitialize: true
})(EncryptionForm);

function mapStateToProps(state, ownProps) {

  let initialValues = {};
  initialValues.plainText = null;
  initialValues.encryptedText = null;
  return {
    initialValues: initialValues,
  }
}

EncryptionForm = connect(mapStateToProps, null, null, {withRef: true})(EncryptionForm);
export default EncryptionForm;
