import React, { Component } from 'react';
import { connect } from 'react-redux';
import basestyles from '../../styles/Base.scss';
import styles from '../../styles/Styles.scss';
import EncryptionForm from '../Forms/EncryptionForm';
import Button from '../Forms/Button';

class LayoutContainer extends Component {

  constructor(props) {
    super(props);
    this.onSubmitEncryptonClick = this.onSubmitEncryptonClick.bind(this);
    this.submitEncryption = this.submitEncryption.bind(this);
  }
  onSubmitEncryptonClick() {
    this.refs.EncryptionForm.getWrappedInstance().submit();
  }
  submitEncryption(){
    console.log('submit');
  }
  render() {
    return (
      <div className='Layout container'>
        <div className='row flex'>
          <h2 className={styles.header}>{'Normativa de Seguridad de la Tecnología (ISO-27002)'}</h2>
          <div className={styles.logo}/>
        </div>
        <div className='row'>
          <h4>{'Encryptacion asimetrica'}</h4>
        </div>

        <div className='row'>
        <EncryptionForm
        ref='EncryptionForm'
        onSubmit={this.submitEncryption}
        />
        </div>
        <div>
        <Button label={'Encriptar Texto'} onClick={this.onSubmitEncryptonClick} primary/>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  const {application} = state;

  return {
    application: application,
  };
}

const mapDispatchToProps = (dispatch) => {

  return {
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
