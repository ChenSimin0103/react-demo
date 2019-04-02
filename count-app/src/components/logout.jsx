import React, { Component } from 'react';
import auth from '../services/authService';

class Logout extends Component {
  compontDidMount() {
    auth.logout();

    window.location = '/';
  }
  render() {
    return null;
  }
}

export default Logout;
