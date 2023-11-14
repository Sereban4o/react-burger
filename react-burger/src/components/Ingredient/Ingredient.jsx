import style from "./Ingredient.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/usemodal";
import { ingredientType } from "../../services/utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../../services/actions/ingredient";
import { useEffect } from "react";
import { useDrag } from "react-dnd";

function Ingredient({ item, index, id }) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  useEffect(() => {
    if (isModalOpen) {
      dispatch({
        type: ADD_INGREDIENT,
        item: item,
      });
    } else {
      dispatch({
        type: REMOVE_INGREDIENT,
        item: item,
      });
    }
  }, [isModalOpen]);

  return (
    <>
      <div onClick={openModal} ref={dragRef} style={{ opacity }}>
        <div className={style.ingredient_info}>
          {index == 0 && <Counter count={1} size="default" extraClass="m-1" />}
          <img src={item.image} alt={item.name}></img>

          <p className="text text_type_main-medium">
            {item.price}
            <CurrencyIcon type="primary" />
          </p>
          <p className={`${style.ingredient_name} text text_type_main-default`}>
            {item.name}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClick={closeModal} isModalOpen={isModalOpen}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default Ingredient;
