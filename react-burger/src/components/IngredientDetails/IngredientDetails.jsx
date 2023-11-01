import "./IngredientDetails.css";
import PropTypes from "prop-types";

function IngredientDetails({ props }) {
  return (
    <>
      <p className="text text_type_main-large ml-10 mt-15">
        Детали ингредиента
      </p>
      <div className="IngredientDetails">
        <img src={props.image} className="pb-4" alt={props.name}></img>
        <p className="text text_type_main-small pb-8">{props.name}</p>
        <div>
          <div className="IngredientDetails_table">
            <div className="IngredientDetails_table_item">
              <p className="text text_type_main-default">Калории,ккал</p>
              <p className="text text_type_main-default">{props.calories}</p>
            </div>
            <div className="IngredientDetails_table_item">
              <p className="text text_type_main-default">Белки, г </p>
              <p className="text text_type_main-default">{props.proteins}</p>
            </div>
            <div className="IngredientDetails_table_item">
              <p className="text text_type_main-default">Жиры, г</p>
              <p className="text text_type_main-default">{props.fat}</p>
            </div>
            <div className="IngredientDetails_table_item">
              <p className="text text_type_main-default">Углеводы, г</p>
              <p className="text text_type_main-default">
                {props.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  carbohydrates: PropTypes.string,
  fat: PropTypes.string,
  proteins: PropTypes.string,
  calories: PropTypes.string,
};

export default IngredientDetails;
