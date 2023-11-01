import OrderDetails from "../OrderDetails/OrderDetails";
import "./BurgerConstructor.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useModal } from "../../hooks/usemodal";
import Modal from "../Modal/Modal";

function BurgerConstructor(props) {
  const items = props.data;
  const contentItems = items.slice(1, items.length);
  const { isModalOpen, openModal, closeModal } = useModal();

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
            <div key={item._id}>
              <DragIcon type="primary" />

              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <div className="pt-4 pl-5">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={items[0].name}
            price={items[0].price}
            thumbnail={items[0].image}
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
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClick={closeModal} isModalOpen={isModalOpen}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BurgerConstructor;
