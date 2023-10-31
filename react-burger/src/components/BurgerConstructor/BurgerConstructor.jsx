import OrderDetails from "../OrderDetails/OrderDetails";
import "./BurgerConstructor.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { useState } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

function BurgerConstructor(props) {
  const [visible, setVisible] = useState(false);
  const items = props.data.data;
  const contentItems = items.slice(1, items.length);

  return (
    <section className="content_box pt-25">
      <div className="pl-4">
        <div className="pb-4 pl-5">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={items[0].name}
            price={items[0].price}
            thumbnail={items[0].image}
          />
        </div>
        <div className="burger-constructor" id="scrollbar">
          {contentItems.map((item) => (
            <div>
              <DragIcon type="primary" />

              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                key={item._id}
              />
            </div>
          ))}
        </div>
        <div className="pt-4 pl-5">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={items[items.length - 1].name}
            price={items[items.length - 1].price}
            thumbnail={items[items.length - 1].image}
          />
        </div>
      </div>
      <div className="order">
        <p className="order_price text text_type_main-medium">
          610 <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            setVisible(true);
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {visible &&
        createPortal(
          <ModalOverlay
            onClose={() => {
              setVisible(false);
            }}
          >
            <OrderDetails />
          </ModalOverlay>,
          document.getElementById("react-modal")
        )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  props: PropTypes.object,
};

export default BurgerConstructor;
