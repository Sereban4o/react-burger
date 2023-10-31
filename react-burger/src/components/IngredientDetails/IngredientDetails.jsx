import "./IngredientDetails.css";
import PropTypes from "prop-types";

function IngredientDetails({ item }) {
  return (
    <div className="IngredientDetails">
      <p className="text text_type_main-large">Детали ингредиента</p>
      <img src={item.image} className="pb-4"></img>
      <p className="text text_type_main-small pb-8">{item.name}</p>
      <div>
        <div className="IngredientDetails_table">
          <div className="IngredientDetails_table_item">
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_main-default">{item.calories}</p>
          </div>
          <div className="IngredientDetails_table_item">
            <p className="text text_type_main-default">Белки, г </p>
            <p className="text text_type_main-default">{item.proteins}</p>
          </div>
          <div className="IngredientDetails_table_item">
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_main-default">{item.fat}</p>
          </div>
          <div className="IngredientDetails_table_item">
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_main-default">{item.carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  props: PropTypes.object,
};

export default IngredientDetails;
