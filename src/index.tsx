import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import Practice from './Practice';
import reportWebVitals from './reportWebVitals';
import { AlertProvider, useAlert } from './context/AlertContext';
import { useEffect } from 'react';

const AlertDismissOnNavigate = () => {
  const { dismiss } = useAlert();
  const location = useLocation();
  useEffect(() => { dismiss(); }, [location.pathname, dismiss]);
  return null;
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <BrowserRouter>
        <AlertDismissOnNavigate />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
