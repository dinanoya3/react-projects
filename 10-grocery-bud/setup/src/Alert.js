import React, { useEffect } from "react";

// type is either danger or success
const Alert = ({ message, type, removeAlert, list }) => {
  useEffect(() => {
    // will set the alert to default values in showAlert params (false, '', '')
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    // we clear the timeout when list re-renders
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
