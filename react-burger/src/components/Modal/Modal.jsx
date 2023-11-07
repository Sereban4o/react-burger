import style from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function Modal({ onClick, isModalOpen, children }) {
  return (
    <>
      {createPortal(
        <ModalOverlay onClick={onClick} isModalOpen={isModalOpen}>
          {children}
        </ModalOverlay>,
        document.getElementById("react-modal")
      )}
    </>
  );
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
