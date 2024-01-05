import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";
import style from "./UserFeedContainer.module.css"
import FeedElementUser from "../FeedElementUser/FeedElementUser";


function UserFeedContainer() {

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
