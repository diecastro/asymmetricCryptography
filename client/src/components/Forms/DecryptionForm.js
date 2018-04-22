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
    return Validator.validateDecryptionForm(values);
  }
};

class DecryptionForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, pristine, reuset, submitting} = this.props;


    return (
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowForm}`}>
            <div className='col-md-12 no-padding'>
              <Field
                label='Texto Encriptado'
                type='text'
                component={renderTextField}
                fullWidth={true}
                name='encryptedText'
                disabled={true}
              />
            </div>
            <div className='col-md-12 no-padding'>
              <Field
                label='Texto Desencriptado'
                component={renderTextField}
                fullWidth={true}
                name='decryptedText'
                type='text'
                disabled={true}
              />
            </div>
            </div>
        </form>
    );
  }
}


DecryptionForm = reduxForm({
  form: 'decryptionForm',
  validate,
  fields: [
    'publicKey',
    'encryptedText',
    'decryptedText'
  ],
  enableReinitialize: true
})(DecryptionForm);

function mapStateToProps(state, ownProps) {

  let initialValues = {};
  initialValues.publicKey = null;
  initialValues.encryptedText = null;
  initialValues.decryptedText = null;
  return {
    initialValues: initialValues,
  }
}

DecryptionForm = connect(mapStateToProps, null, null, {withRef: true})(DecryptionForm);
export default DecryptionForm;
