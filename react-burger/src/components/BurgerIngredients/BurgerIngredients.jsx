import style from "./BurgerIngredients.module.css";
import Ingredient from "../Ingredient/Ingredient";
import TabsComponent from "../TabsComponent/TabsComponent";
import PropTypes from "prop-types";
import { ingredientType } from "../utils/types";

function BurgerIngredients(props) {
  const typeBun = props.data.filter((dataType) => dataType.type === "bun");

  const typeMain = props.data.filter((dataType) => dataType.type === "main");

  const typeSauce = props.data.filter((dataType) => dataType.type === "sauce");

  return (
    <section className={style.content_box}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <TabsComponent />
      <div className={style.content_box_ingredients} id="scrollbar">
        <p className="text text_type_main-medium mt-10">Булки</p>
        <div className={style.content_box_box}>
          {typeBun.map((el, index) => {
            return <Ingredient item={el} index={index} key={el._id} />;
          })}
        </div>
        <p className="text text_type_main-medium  mt-10">Соусы</p>
        <div className={style.content_box_box}>
          {typeSauce.map((el, index) => (
            <Ingredient item={el} index={index} key={el._id} />
          ))}
        </div>
        <p className="text text_type_main-medium  mt-10">Начинки</p>
        <div className={style.content_box_box}>
          {typeMain.map((el, index) => (
            <Ingredient item={el} index={index} key={el._id} />
          ))}
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};

export default BurgerIngredients;
