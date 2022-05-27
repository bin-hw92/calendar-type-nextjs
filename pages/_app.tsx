import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import PropTypes from 'prop-types';
import wrapper from '../store/configureStore';
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired, // elementType  = jsx
};

export default wrapper.withRedux(MyApp);