import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function Modal({ onClick, children }) {
  return (
    <>
      {createPortal(
        <ModalOverlay onClick={onClick}>{children}</ModalOverlay>,
        document.getElementById("react-modal")
      )}
    </>
  );
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
