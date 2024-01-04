import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/utils/hooks";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredients, TNewTableOrderIngredients, TOrderElement, TOrderIngredients } from "../../services/utils/data";
import style from "./OrderInfo.module.css";
import { tableLayout } from "../../services/utils/utils";

function OrderInfo() {
    const { id } = useParams();
    const { ordersInfo } = useAppSelector((state) => state.orders);
    const { dataApi } = useAppSelector(
        (state) => state.ingredients
    );
    if (!ordersInfo) {
        return (<></>)
    };
    const ordersAPI = ordersInfo.orders;
    if (!ordersAPI) {
        return <>Нет данных</>;
    }

    const orders = ordersAPI.filter((el: TOrderElement) => el._id === id);
    if (orders.length < 1) {
        return <>Нет данных</>;
    }
    const order = orders[0];

    const createDate = new Date(order.createdAt);

    const today = new Date;
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    );
    const days = Math.round((today.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24));
    let textDate = undefined;
    if (days === 0) {
        textDate = <FormattedDate
            date={
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    today.getHours(),
                    today.getMinutes() - 1,
                    0,
                )
            }
        />

    } else if (days === 1) {
        textDate = <FormattedDate date={yesterday} />;
    } else {

        textDate = <FormattedDate date={createDate} />;
    }


    let ingredients: Array<TOrderIngredients> = [];
    let summ = 0;
    const newT = tableLayout(order.ingredients);

    newT.forEach((el: TNewTableOrderIngredients) => {
        const ing = dataApi.filter((item: TIngredients) => item._id === el.id);
        if (ing) {
            ingredients.push({ item: ing[0], count: el.count });
            summ = summ + ing[0].price * el.count;

        }

    });

    let status = 'Не выполнен';

    if (order.status === 'done') {
        status = "Выполнен";
    }

    return (
        <><div className={style.box}>
            <p className={`${style.number} text text_type_digits-medium mb-10`}>#{order.number}</p>
            <p className="text text_type_main-medium mb-3">{order.name}</p>
            <p className={`${style.status} text text_type_main-small mb-15`}>{status}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={style.ingredients} id="scrollbar">
                {ingredients.map((el: TOrderIngredients, index: number) => {

                    return (
                        <div className={style.row} key={index}>
                            <div className={style.heading}><div className={style.border}>
                                <img className={style.image} src={el.item.image} alt={el.item.name} />

                            </div>
                                <p className="text text_type_main-medium">{el.item.name}</p></div>
                            <p className={`${style.summ} text text_type_digits-default`}>{el.count} x {el.item.price}  <CurrencyIcon type="primary" /></p>
                        </div>)
                })}</div>
            <div className={`${style.footer} mt-10`}><p>{textDate}</p>
                <p className={`${style.summ} text text_type_digits-default`}>{summ}  <CurrencyIcon type="primary" /></p></div>

        </div>
        </>
    );
}

export default OrderInfo;