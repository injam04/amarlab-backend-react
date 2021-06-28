import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './assets/css/fullcalendar.bundle.css';
// import './assets/css/plugins.bundle.css';
// import './assets/css/prismjs.bundle.css';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/css/style.bundle.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
