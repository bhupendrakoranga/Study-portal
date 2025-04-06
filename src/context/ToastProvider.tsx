// src/components/ToastProvider.js
import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </>
  );
};

export default ToastProvider;
