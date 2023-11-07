import style from "./OrderDetails.module.css";
import ImageDone from "../../img/done.png";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function OrderDetails({ orderElementsID }) {
  const [orderNumber, setOrderNumber] = useState(null);

  const url = "https://norma.nomoreparties.space/api/orders";

  useEffect(() => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(orderElementsID),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderNumber(data.order.number);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className={style.order_details}>
      {orderNumber && (
        <p className="text text_type_digits-large">{orderNumber}</p>
      )}
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img src={ImageDone} className={style.order_image} alt="done"></img>
      <p className="text text_type_main-small mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`${style.order_grey} text text_type_main-small`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderElementsID: PropTypes.object.isRequired,
  orderElementsID: PropTypes.objectOf(PropTypes.array.isRequired).isRequired,
  orderElementsID: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
};

export default OrderDetails;
