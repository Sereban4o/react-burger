import { useParams } from "react-router-dom";
import style from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../services/types";

function IngredientDetails() {
  const { dataApi } = useSelector((state: RootState) => state.ingredients);

  const { id } = useParams();

  const ingredients = dataApi.filter((el) => el._id === id);

  if (ingredients.length < 1) {
    return <>Нет данных</>;
  }
  const ingredient = ingredients[0];

  return (
    <div className={style.IngredientDetails_form}>
      <p className="text text_type_main-large ml-10 mt-4">Детали ингредиента</p>
      <div className={style.IngredientDetails}>
        <img
          src={ingredient.image}
          className="mb-4"
          alt={ingredient.name}
        ></img>
        <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
        <div>
          <div className={style.IngredientDetails_table}>
            <div className={style.IngredientDetails_table_item}>
              <p className="text text_type_main-default">Калории,ккал</p>
              <p className="text text_type_main-default">
                {ingredient.calories}
              </p>
            </div>
            <div className={style.IngredientDetails_table_item}>
              <p className="text text_type_main-default">Белки, г </p>
              <p className="text text_type_main-default">
                {ingredient.proteins}
              </p>
            </div>
            <div className={style.IngredientDetails_table_item}>
              <p className="text text_type_main-default">Жиры, г</p>
              <p className="text text_type_main-default">{ingredient.fat}</p>
            </div>
            <div className={style.IngredientDetails_table_item}>
              <p className="text text_type_main-default">Углеводы, г</p>
              <p className="text text_type_main-default">
                {ingredient.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
