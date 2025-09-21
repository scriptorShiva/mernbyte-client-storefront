"use client";

import { ToastContainer, toast, ToastOptions, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  transition: Bounce,
};

export const notify = {
  success: (msg: string, options?: ToastOptions) =>
    toast.success(msg, { ...defaultOptions, ...options }),
  error: (msg: string, options?: ToastOptions) =>
    toast.error(msg, { ...defaultOptions, ...options }),
  info: (msg: string, options?: ToastOptions) =>
    toast.info(msg, { ...defaultOptions, ...options }),
  warning: (msg: string, options?: ToastOptions) =>
    toast.warning(msg, { ...defaultOptions, ...options }),
};

export default function ToastProvider() {
  return <ToastContainer {...defaultOptions} />;
}
