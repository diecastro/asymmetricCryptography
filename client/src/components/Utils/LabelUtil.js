import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';

const LabelUtil = {
  getTheme: function () {
    return createMuiTheme({
      palette: createPalette({
        primary: {
          '50': '#e3f2fd',
          '100': '#888C8D',
          '200': '#90caf9',
          '300': '#64b5f6',
          '400': '#42a5f5',
          '500': '#FD7C24',
          '600': '#1e88e5',
          '700': '#1976d2',
          '800': '#1565c0',
          '900': '#0d47a1',
          A100: '#82b1ff',
          A200: '#448aff',
          A400: '#2979ff',
          A700: '#FD7C24',
          contrastDefaultColor: 'light',
        },
        button: {
          backgroundColor: '#FD7C24',
        }
      })
    });
  }
};

export default LabelUtil;
