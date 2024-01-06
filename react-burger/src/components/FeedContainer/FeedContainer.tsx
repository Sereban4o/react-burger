import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";
import FeedElement from "../FeedElement/FeedElement";
import style from "./FeedContainer.module.css"
import { connect, disconnect } from "../../services/actions/orders";


function FeedContainer() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(connect(`wss://norma.nomoreparties.space/orders/all`));
        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);

    const { ordersInfo } = useAppSelector(
        (state) => state.orders
    );
    if (!ordersInfo) {
        return (<></>)
    };
    const orders = ordersInfo.orders;
    return (<>
        {orders && (<section className={style.content_box} id="scrollbar">
            {orders.map((el) => (
                <FeedElement item={el} key={el._id} />
            ))}
        </section>)}</>
    );
}


export default FeedContainer;
