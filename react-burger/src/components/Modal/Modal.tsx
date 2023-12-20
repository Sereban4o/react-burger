import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import { TModalProps } from "../../services/utils/data";

function Modal({ onClick, children }: TModalProps) {
  return (
    <>
      {createPortal(
        <ModalOverlay onClick={onClick}>{children}</ModalOverlay>,
        document.getElementById("react-modal")!
      )}
    </>
  );
}

export default Modal;
