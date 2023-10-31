import "./Ingredient.css";
import { createPortal } from "react-dom";
import { useState } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Ingredient(props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        className="ingredient"
        key={props._id}
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className="ingredient-info">
          <img src={props.image}></img>
          <p className="text text_type_main-medium">
            {props.price}
            <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-default">{props.name}</p>
        </div>
      </div>
      {visible &&
        createPortal(
          <ModalOverlay
            onClose={() => {
              setVisible(false);
            }}
          >
            <IngredientDetails item={props} />
          </ModalOverlay>,
          document.getElementById("react-modal")
        )}
    </>
  );
}

Ingredient.propTypes = {
  props: PropTypes.object,
};

export default Ingredient;
