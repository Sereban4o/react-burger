import style from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../hooks/usemodal";
import { ingredientType } from "../../services/utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../../services/actions/ingredient";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";

function Ingredient({ item }) {
  const { openModal } = useModal();

  const { buns, ingredients } = useSelector((state) => state.bugrerIngredients);
  const location = useLocation();

  const arrauBunsFilter = buns.filter((el) => el._id === item._id);
  const arrauIngredientsFilter = ingredients.filter(
    (el) => el._id === item._id
  );

  const count = arrauBunsFilter.length * 2 + arrauIngredientsFilter.length;

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div onClick={openModal}>
      <Link
        key={item._id}
        to={{
          pathname: `/ingredient/${item._id}/`,
          state: { background: location },
        }}
        className={style.ingredient_link}
      >
        <div ref={dragRef} style={{ opacity }}>
          <div className={style.ingredient_info}>
            {!count == 0 && (
              <Counter count={count} size="default" extraClass="m-1" />
            )}
            <img src={item.image} alt={item.name}></img>
            <p className="text text_type_main-medium">
              {item.price}
              <CurrencyIcon type="primary" />
            </p>
            <p
              className={`${style.ingredient_name} text text_type_main-default`}
            >
              {item.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

Ingredient.propTypes = {
  item: ingredientType.isRequired,
};
export default Ingredient;
