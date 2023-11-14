import OrderDetails from "../OrderDetails/OrderDetails";
import style from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../hooks/usemodal";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENTS,
  UPDATE_INGREDIENTS,
} from "../../services/actions/bugrerIngredients";
import { useCallback, useEffect, useReducer } from "react";
import { getOrder } from "../../services/actions/order";
import { useDrop, useDrag } from "react-dnd";
import { v4 as uuid } from "uuid";
import IngredientConstructor from "../IngredientConstructor/IngredientConstructor";

function BurgerConstructor() {
  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useDispatch();

  const { buns, ingredients } = useSelector((state) => state.bugrerIngredients);

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({
        type: ADD_INGREDIENTS,
        item: { ...item, dragId: uuid() },
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = ingredients[dragIndex];
      const newCards = [...ingredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragItem);
      dispatch({
        type: UPDATE_INGREDIENTS,
        newCards: newCards,
      });
    },
    [ingredients, dispatch]
  );

  let summOrder = 0;
  let orderElementsID = { ingredients: [] };

  buns.map((el) => {
    summOrder = (summOrder + el.price) * 2;
    orderElementsID.ingredients = [...orderElementsID.ingredients, el._id];
  });
  ingredients.map((el) => {
    summOrder = summOrder + el.price;
    orderElementsID.ingredients = [...orderElementsID.ingredients, el._id];
  });

  useEffect(() => {
    if (isModalOpen) dispatch(getOrder(orderElementsID));
  }, [isModalOpen]);

  return (
    <section className={`${style.content_box} pt-25`}>
      <div className="pl-4" ref={dropRef}>
        <div className="pb-4 pl-5">
          {buns.map((el) => (
            <div key={el.dragId}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${el.name} (верх)`}
                price={el.price}
                thumbnail={el.image}
              />
            </div>
          ))}
        </div>
        <div
          className={`${style.burger_constructor} ${
            isHover ? style.onHover : ""
          }`}
          id="scrollbar"
        >
          {ingredients.map((el, index) => (
            <IngredientConstructor
              key={el.dragId}
              item={el}
              index={index}
              moveItem={moveItem}
            />
          ))}
        </div>
        <div className="pt-4 pl-5">
          {buns.map((el) => (
            <div key={el.dragId}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${el.name} (низ)`}
                price={el.price}
                thumbnail={el.image}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={style.order}>
        <p className={`${style.order_price} text text_type_main-medium`}>
          {summOrder} <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClick={closeModal} isModalOpen={isModalOpen}>
          <OrderDetails orderElementsID={orderElementsID} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
