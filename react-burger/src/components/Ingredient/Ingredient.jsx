import "./Ingredient.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/usemodal";

function Ingredient(props) {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div onClick={openModal}>
        <div className="ingredient-info">
          <img src={props.image} alt={props.name}></img>
          <p className="text text_type_main-medium">
            {props.price}
            <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-default">{props.name}</p>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClick={closeModal} isModalOpen={isModalOpen}>
          <IngredientDetails props={props} />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default Ingredient;
