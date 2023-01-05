import {showMessage} from 'react-native-flash-message';

export const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: '#d63031',
    color: '#FFF',
    icon: 'danger',
  });
};

export const showSuccess = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: '#2ecc71',
    color: '#FFF',
    icon: 'success',
  });
};
