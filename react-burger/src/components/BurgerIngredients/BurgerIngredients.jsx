import "./BurgerIngredients.css";
import Ingredient from "../Ingredient/Ingredient";
import TabsComponent from "../TabsComponent/TabsComponent";
import PropTypes from "prop-types";

function BurgerIngredients(props) {
  const typeBun = props.data.data.filter((dataType) => dataType.type === "bun");

  const typeMain = props.data.data.filter(
    (dataType) => dataType.type === "main"
  );

  const typeSauce = props.data.data.filter(
    (dataType) => dataType.type === "sauce"
  );

  return (
    <section className="content_box">
      <p className="content_box_header text text_type_main-larg">
        Соберите бургер
      </p>
      <TabsComponent />
      <div className="content_box_ingredients" id="scrollbar">
        <p className="text text_type_main-medium">Булки</p>
        <div className="content_box_box">
          {typeBun.map((el) => (
            <Ingredient
              image={el.image}
              price={el.price}
              name={el.name}
              key={el._id}
              calories={el.calories}
              carbohydrates={el.carbohydrates}
              fat={el.fat}
              proteins={el.proteins}
            />
          ))}
        </div>
        <p className="text text_type_main-medium">Соусы</p>
        <div className="content_box_box">
          {typeSauce.map((el) => (
            <Ingredient
              image={el.image}
              price={el.price}
              name={el.name}
              key={el._id}
              calories={el.calories}
              carbohydrates={el.carbohydrates}
              fat={el.fat}
              proteins={el.proteins}
            />
          ))}
        </div>
        <p className="text text_type_main-medium">Начинки</p>
        <div className="content_box_box">
          {typeMain.map((el) => (
            <Ingredient
              image={el.image}
              price={el.price}
              name={el.name}
              key={el._id}
              calories={el.calories}
              carbohydrates={el.carbohydrates}
              fat={el.fat}
              proteins={el.proteins}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  props: PropTypes.object,
};

export default BurgerIngredients;
