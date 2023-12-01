import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";

function Modal({ onClick, isModalOpen, id, children }) {
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
