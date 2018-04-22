
import React, { Component } from 'react';
import LabelUtil from '../components/Utils/LabelUtil';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';
import Perf from 'react-addons-perf';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';

export default class Root extends Component {

  constructor(props) {
    super(props);

    window.Perf = Perf;
  }

  render() {
    const { store, history } = this.props;
    return (
      <MuiThemeProvider theme={LabelUtil.getTheme()}>
        <Provider store={store}>
          <div className='root'>
            <Router
              onUpdate={() => window.scrollTo(0, 0)}
              history={history}
              routes={routes}
            />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
