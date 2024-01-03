import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";
import FeedElement from "../FeedElement/FeedElement";
import { connect, wsClose } from "../../services/actions/orders";
import style from "./FeedContainer.module.css"

function FeedContainer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(connect(`wss://norma.nomoreparties.space/orders/all`));
    }, [dispatch]);


    const { ordersInfo } = useAppSelector(
        (state) => state.orders
    );

    const orders = ordersInfo.orders;



    return (<>
        {orders && (<section className={style.content_box} id="scrollbar">

            {orders.map((el: any) => (
                <FeedElement item={el} key={el._id} />
            ))}



        </section>)}</>
    );
}


export default FeedContainer;
