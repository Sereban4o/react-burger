import style from "./ModalOverlay.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useEffect } from "react";
import { TModalProps } from "../../services/utils/data";

function ModalOverlay({ onClick, children }: TModalProps) {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;

      if (target.children[0] === modal.current) {
        onClick();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
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

export default ModalOverlay;
