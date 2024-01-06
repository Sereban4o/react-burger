import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";
import style from "./UserFeedContainer.module.css"
import FeedElementUser from "../FeedElementUser/FeedElementUser";
import { getCookie } from "../../services/utils/utils";
import { useEffect } from "react";
import { connectUser, disconnectUser } from "../../services/actions/orders";


function UserFeedContainer() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const accessToken = getCookie("accessToken");
        dispatch(connectUser(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
        return () => {
            dispatch(disconnectUser());
        };
    }, [dispatch]);

    const { ordersUser } = useAppSelector(
        (state) => state.ordersUser
    );
    if (!ordersUser) {
        return (<></>)
    };
    const orders = ordersUser.orders;


    return (<>
        {orders && (<section className={style.content_box} id="scrollbar">
            {orders.map((el) => (
                <FeedElementUser item={el} key={el._id} />
            ))}
        </section>)}</>
    );
}


export default UserFeedContainer;
