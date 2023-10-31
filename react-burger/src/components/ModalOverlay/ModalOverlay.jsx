import "./ModalOverlay.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function ModalOverlay({ onClose, children }) {
  return (
    <div className="modal-bg">
      <div className="modal pl-10 pt-10 pr-10 pb-15">
        <div className="modal_button">
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalOverlay;
