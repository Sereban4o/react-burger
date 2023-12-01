import style from "./ModalOverlay.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function ModalOverlay({ onClick, isModalOpen, children }) {
  const modal = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!isModalOpen) return;

      if (e.target.children[0] === modal.current) {
        onClick();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isModalOpen) return;

      if (e.key == "Escape") {
        onClick();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className={style.modal_bg}>
      <div className={style.modal} ref={modal}>
        <button className={`${style.modal_button} mr-10 mt-15`}>
          <CloseIcon type="primary" onClick={onClick} />
        </button>
        {children}
      </div>
    </div>
  );
}

ModalOverlay.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default ModalOverlay;
