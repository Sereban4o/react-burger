import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/utils/hooks";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredients } from "../../services/utils/data";
import style from "./UserOrderInfo.module.css";

function UserOrderInfo() {
    const { id } = useParams();
    const { ordersInfo } = useAppSelector((state) => state.orders);
    const { dataApi } = useAppSelector(
        (state) => state.ingredients
    );
    const ordersAPI = ordersInfo.orders;
    if (!ordersAPI) {
        return <>Нет данных</>;
    }

    const orders = ordersAPI.filter((el: any) => el._id === id);
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


    let ingredients: any = [];
    let summ = 0;

    order.ingredients.forEach((el: string) => {
        const ing = dataApi.filter((item: TIngredients) => item._id === el);
        if (ing) {
            ingredients.push(ing[0]);
            summ = summ + ing[0].price;
            if (ing[0].type === 'bun') {
                summ = summ + ing[0].price;
            }
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
                {ingredients.map((el: TIngredients, index: number) => {
                    let count = 1;
                    if (el.type === 'bun') {
                        count = 2;
                    };
                    return (
                        <div className={style.row}>
                            <div className={style.heading}><div className={style.border}>
                                <img className={style.image} src={el.image} alt={el.name} />

                            </div>
                                <p className="text text_type_main-medium">{el.name}</p></div>
                            <p className={`${style.summ} text text_type_digits-default`}>{count} x {el.price}  <CurrencyIcon type="primary" /></p>
                        </div>)
                })}</div>
            <div className={`${style.footer} mt-10`}><p>{textDate}</p>
                <p className={`${style.summ} text text_type_digits-default`}>{summ}  <CurrencyIcon type="primary" /></p></div>

        </div>
        </>
    );
}

export default UserOrderInfo;