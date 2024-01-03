import OrderDetails from "../OrderDetails/OrderDetails";
import style from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../hooks/usemodal";
import Modal from "../Modal/Modal";
import { useCallback, useEffect, useMemo } from "react";

import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import IngredientConstructor from "../IngredientConstructor/IngredientConstructor";
import { useAuth } from "../../services/utils/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";
import {
  addIngredientsAction,
  updateIngredientsAction,
} from "../../services/actions/bugrerIngredients";
import { TIngredients } from "../../services/utils/data";
import { getOrder } from "../../services/utils/api";

function BurgerConstructor() {
  const { openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const { buns, ingredients } = useAppSelector(
    (state) => state.bugrerIngredients
  );
  const { view } = useAppSelector((state) => state.modal);

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: TIngredients) {
      const dropItem: TIngredients = { ...item, dragId: uuid() };
      dispatch(
        addIngredientsAction(dropItem) /* {
        type: ADD_INGREDIENTS,
        item: { ...(typeof item === "object" ? item : {}), dragId: uuid() },
      } */
      );
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = ingredients[dragIndex];
      const newCards = [...ingredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragItem);
      dispatch(
        updateIngredientsAction(newCards) /* {
        type: UPDATE_INGREDIENTS,
        newCards: newCards,
      } */
      );
    },
    [ingredients, dispatch]
  );

  const handleOrderButtonClick = () => {
    if (!auth.user) {
      return navigate("/login/");
    }
    if (!orderBun) {
      return alert(`Нужно выбрать булки!`);
    }
    openModal();
  };

  const orderBun = buns[0] || {};

  const summOrder = useMemo(
    () =>
      ingredients.reduce(
        (acc, el) => (acc += el.price),
        orderBun?.price * 2 || 0
      ),
    [orderBun?.price, ingredients]
  );

  const orderElementsID = {
    ingredients: [
      orderBun?._id,
      ...ingredients.map((el) => el._id),
      orderBun?._id,
    ],
  };

  useEffect(() => {
    if (view) {
      dispatch(getOrder(orderElementsID));
    }
  }, [view]);

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
          onClick={handleOrderButtonClick}
        >
          Оформить заказ
        </Button>
      </div>
      {view && (
        <Modal onClick={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
