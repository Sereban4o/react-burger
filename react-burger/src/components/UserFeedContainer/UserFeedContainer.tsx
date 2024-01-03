import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";
import FeedElement from "../FeedElement/FeedElement";
import { connect, wsClose } from "../../services/actions/orders";
import style from "./UserFeedContainer.module.css"
import { getCookie } from "../../services/utils/utils";

function UserFeedContainer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        dispatch(connect(`wss://norma.nomoreparties.space/orders/?token=${accessToken}`));


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


export default UserFeedContainer;
