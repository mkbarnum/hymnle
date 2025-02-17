import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Practice from './Practice';
import reportWebVitals from './reportWebVitals';
import { AlertProvider } from './context/AlertContext';

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <BrowserRouter>
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
