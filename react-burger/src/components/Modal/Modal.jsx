import "./Modal.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function Modal(props) {
  return (
    <>
      {createPortal(
        <ModalOverlay onClick={props.onClick} isModalOpen={props.isModalOpen}>
          {props.children}
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
