import style from "./BurgerIngredients.module.css";
import Ingredient from "../Ingredient/Ingredient";
import TabsComponent from "../TabsComponent/TabsComponent";
import PropTypes from "prop-types";
import { ingredientType } from "../utils/types";

function BurgerIngredients({ buns, sauce, main }) {
  return (
    <section className="content_box">
      <p className="content_box_header text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </p>
      <TabsComponent />

      <div className={style.content_box_ingredients} id="scrollbar">
        <p className="text text_type_main-medium mt-10">Булки</p>
        <div className={style.content_box_box}>
          {buns.map((el, index) => {
            return <Ingredient item={el} index={index} key={el._id} />;
          })}
        </div>
        <p className="text text_type_main-medium  mt-10">Соусы</p>
        <div className={style.content_box_box}>
          {sauce.map((el, index) => (
            <Ingredient item={el} index={index} key={el._id} />
          ))}
        </div>
        <p className="text text_type_main-medium  mt-10">Начинки</p>
        <div className={style.content_box_box}>
          {main.map((el, index) => (
            <Ingredient item={el} index={index} key={el._id} />
          ))}
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  buns: PropTypes.array.isRequired,
  sauce: PropTypes.array.isRequired,
  main: PropTypes.array.isRequired,
  buns: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  sauce: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  main: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};

export default BurgerIngredients;
