import style from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../utils/types";

function IngredientDetails({ item }) {
  return (
    <div className={style.IngredientDetails_form}>
      <p className="text text_type_main-large ml-10 mt-4">Детали ингредиента</p>
      <div className={style.IngredientDetails}>
        <img src={item.image} className="mb-4" alt={item.name}></img>
        <p className="text text_type_main-medium mb-8">{item.name}</p>
        <div>
          <div className={style.IngredientDetails_table}>
            <div className={style.IngredientDetails_table_item}>
              <p className="text text_type_main-default">Калории,ккал</p>
              <p className="text text_type_main-default">{item.calories}</p>
            </div>
            <div className={style.IngredientDetails_table_item}>
              <p className="text text_type_main-default">Белки, г </p>
              <p className="text text_type_main-default">{item.proteins}</p>
            </div>
            <div className={style.IngredientDetails_table_item}>
              <p className="text text_type_main-default">Жиры, г</p>
              <p className="text text_type_main-default">{item.fat}</p>
            </div>
            <div className={style.IngredientDetails_table_item}>
              <p className="text text_type_main-default">Углеводы, г</p>
              <p className="text text_type_main-default">
                {item.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  item: ingredientType.isRequired,
};

export default IngredientDetails;
