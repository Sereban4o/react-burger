import { useAppSelector } from "../../services/utils/hooks";
import FeedElement from "../FeedElement/FeedElement";
import style from "./FeedContainer.module.css"


function FeedContainer() {

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
