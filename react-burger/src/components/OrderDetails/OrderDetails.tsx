import style from "./OrderDetails.module.css";
import ImageDone from "../../img/done.png";
import { useAppSelector } from "../../services/utils/hooks";

function OrderDetails() {
  const { order } = useAppSelector((state) => state.order);

  return (
    <div className={style.order_details}>
      {<p className="text text_type_digits-large">{order}</p>}
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

export default OrderDetails;
