import { TOrderElement } from "../../services/utils/data";
import { useAppSelector } from "../../services/utils/hooks";
import style from "./FeedDesk.module.css"

function FeedDesk() {
    const { ordersInfo } = useAppSelector(
        (state) => state.orders
    );
    if (!ordersInfo) {
        return (<></>)
    };
    const orders = ordersInfo.orders;
    const total = ordersInfo.total;
    const totalToday = ordersInfo.totalToday;
    let done = 1;
    let work = 1;

    return (<><div className={style.box}>
        <div className={style.box_orders}>
            <div className={style.orders}><p className="text text_type_main-medium mb-6">Готовы:</p>
                {orders && <div>{orders.map((el: TOrderElement, index: number) => {
                    if (done < 6 && el.status === 'done') {
                        done = done + 1;
                        return (<p key={index} className={`${style.done} text text_type_digits-default mb-2`}>{el.number}</p>)
                    }

                })}</div>}</div>

            <div className={style.orders}><p className="text text_type_main-medium mb-6">В работе:</p>
                {orders && <div>{orders.map((el: TOrderElement, index: number) => {
                    if (work < 6 && el.status !== 'done') {
                        work = work + 1;
                        return (<p key={index} className={`text text_type_digits-default mb-2`}>{el.number}</p>)
                    }

                })}</div>}</div>
        </div>
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
        <p className="text text_type_digits-large mt-15">{total}</p>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
    </div>
    </>
    );
}


export default FeedDesk;
