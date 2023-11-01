import "./OrderDetails.css";
import ImageDone from "../../img/done.png";

function OrderDetails({}) {
  return (
    <div className="order_details">
      <p className="text text_type_main-large pt-30">034536</p>
      <p className="text text_type_main-small pt-8 pb-15">
        идентификатор заказа
      </p>
      <img src={ImageDone} alt="done"></img>
      <p className="text text_type_main-small pt-15 pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small pb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
