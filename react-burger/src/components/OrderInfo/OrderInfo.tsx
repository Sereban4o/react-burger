import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TNewTableOrderIngredients, TOrderIngredients } from "../../services/utils/data";
import style from "./OrderInfo.module.css";
import { tableLayout } from "../../services/utils/utils";
import { getOrderFeed } from "../../services/utils/api";
import { useEffect } from "react";

function OrderInfo() {


    const dispatch = useAppDispatch();

    const { number } = useParams();
    const { ordersInfo } = useAppSelector((state) => state.orders);
    const { orders } = useAppSelector((state) => state.orderFeed);
    const { dataApi } = useAppSelector(
        (state) => state.ingredients
    );

    useEffect(() => {
        if (!ordersInfo) {
            dispatch(getOrderFeed(number));
        }
    }, [dispatch]);

    let order = null;

    if (!ordersInfo) {
        order = orders[0];

    } else {
        const orders = ordersInfo.orders.filter((el) => el.number == number);
        if (orders.length < 1) {
            return <>Нет данных</>;
        }
        order = orders[0];
    };

    if (!order) {
        return <>Нет данных</>;
    }

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
        const ing = dataApi.filter((item) => item._id === el.id);
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
                {ingredients.map((el, index) => {

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