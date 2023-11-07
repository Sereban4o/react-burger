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
import { useContext, useReducer } from "react";
import { DataContext } from "../service/dataContext";

function BurgerConstructor() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { buns } = useContext(DataContext);
  const { main } = useContext(DataContext);
  const { sauce } = useContext(DataContext);

  const randomMain = main[Math.floor(Math.random() * main.length)];
  const randomSauce = sauce[Math.floor(Math.random() * sauce.length)];
  const randomBun = buns[Math.floor(Math.random() * buns.length)];

  const summOrder = randomBun.price + randomMain.price + randomSauce.price;

  const orderElementsID = {
    ingredients: [randomBun._id, randomMain._id, randomSauce._id],
  };

  return (
    <section className={`${style.content_box} pt-25`}>
      <div className="pl-4">
        <div className="pb-4 pl-5">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${randomBun.name} (верх)`}
            price={randomBun.price}
            thumbnail={randomBun.image}
          />
        </div>
        <div className={style.burger_constructor} id="scrollbar">
          <div>
            <DragIcon type="primary" />
            <ConstructorElement
              text={randomMain.name}
              price={randomMain.price}
              thumbnail={randomMain.image}
            />
          </div>
          <div>
            <DragIcon type="primary" />
            <ConstructorElement
              text={randomSauce.name}
              price={randomSauce.price}
              thumbnail={randomSauce.image}
            />
          </div>
        </div>
        <div className="pt-4 pl-5">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${randomBun.name} (низ)`}
            price={randomBun.price}
            thumbnail={randomBun.image}
          />
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
