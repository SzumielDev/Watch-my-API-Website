import React, { useEffect, useState } from "react";

function AlertMessage(props) {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState(props.AlertMessage);
  const closeAlert = props.alert;
  const [color, setColor] = useState(props.alertColor);

  useEffect(() => {
    if (message != undefined) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [message]);

  useEffect(() => {
    if (props.AlertMessage != message) {
      setMessage(props.AlertMessage);
    }
  }, [props.AlertMessage]);

  useEffect(() => {
    if (props.alertColor != color) {
      setColor(props.alertColor);
    }
  },[props.alertColor]);

  const renderAlertMessage = () => {
    return (
      <div className={`container alert-message-container ${color}`}>
        <span onClick={closeAlert} className="material-symbols-outlined message-overlay-span pointer">cancel</span>
        <div className="row pt-3">
          <div className="col-12">
            <p className="text-white roboto text-size-small">{message}</p>
          </div>
        </div>
      </div>
    );
  };

  return <div className={isActive ? "" : "none"}>{renderAlertMessage()}</div>;
}

export default AlertMessage;
