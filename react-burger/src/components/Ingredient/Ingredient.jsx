import style from "./Ingredient.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/usemodal";
import { ingredientType } from "../utils/types";

function Ingredient({ item, index }) {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div onClick={openModal}>
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
          <IngredientDetails item={item} />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
};

export default Ingredient;
