import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import basestyles from '../../styles/Base.scss';
import styles from '../../styles/Styles.scss';
import EncryptionForm from '../Forms/EncryptionForm';
import DecryptionForm from '../Forms/DecryptionForm';
import Button from '../Forms/Button';
import { encryptBody, decryptBody } from '../../actions/encryptionActions';
import actionTypes from '../../constants/actionTypes';

class LayoutContainer extends Component {

  constructor(props) {
    super(props);
    this.onSubmitEncryptionClick = this.onSubmitEncryptionClick.bind(this);
    this.onSubmitDecryptionClick = this.onSubmitDecryptionClick.bind(this);
    this.submitEncryption = this.submitEncryption.bind(this);
    this.submitDecryption = this.submitDecryption.bind(this);

  }

  onSubmitEncryptionClick() {
    this.refs.encryptionForm.getWrappedInstance().submit();
  }

  onSubmitDecryptionClick() {
    this.refs.decryptionForm.getWrappedInstance().submit();
  }

  submitEncryption() {
    this.props.encryptBody(this.props.encryptFormValues.values);
  }

  submitDecryption() {
    this.props.decryptBody(this.props.decryptFormValues.values);
  }

  render() {
    return (
      <div className='Layout container'>
        <div className='row flex'>
          <h2 className={styles.header}>{'Normativa de Seguridad de la Tecnología (ISO-27002)'}</h2>
          <div className={styles.logo}/>
        </div>
        {this.props.application.errorEncryption &&
        <div className='row'>
          <div className="alert alert-danger">
            <p>{'La llave pública no es la correcta'}</p></div>
        </div>}
        <div className='row'>
          <h4>{'Encriptacion asimetrica'}</h4>
        </div>

        <div className='row'>
          <EncryptionForm
            ref='encryptionForm'
            onSubmit={this.submitEncryption}
          />
        </div>
        <div className='pull-right'>
          <Button label={'Encriptar Texto'} onClick={this.onSubmitEncryptionClick} primary/>
        </div>
        {this.props.application.showDecryptionForm &&
        <div>
          <div className='row flex'>
            <h4>{'Desencripcion'}</h4>
          </div>

          <div className='row'>
            <DecryptionForm
              ref='decryptionForm'
              onSubmit={this.submitDecryption}
            />
          </div>
          <div className='pull-right'>
            <Button label={'Desencriptar Texto'} onClick={this.onSubmitDecryptionClick} primary/>
          </div>
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {application} = state;
  return {
    application,
    encryptFormValues: state.form.encryptionForm,
    decryptFormValues: state.form.decryptionForm
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    encryptBody: (data) => {
      dispatch(encryptBody(data)).then((response) => {
        if (response.type === actionTypes.encryptionMessageSuccess) {
          let text = JSON.stringify(response.response.data);
          text = text.replace(/{|}|"|/g, '');
          text = text.replace(':', '=""');
          dispatch(change('decryptionForm', 'encryptedText', text));
        }
      });
    },
    decryptBody: (data) => {
      dispatch(decryptBody(data)).then((response) => {
        if (response.type === actionTypes.decryptionMessageSuccess) {
          let text = JSON.parse(response.response.data);
          debugger
          dispatch(change('decryptionForm', 'decryptedText', text.plainText));
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
