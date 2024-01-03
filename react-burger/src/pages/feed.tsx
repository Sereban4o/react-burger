import FeedContainer from "../components/FeedContainer/FeedContainer";
import FeedDesk from "../components/FeedDesk/FeedDesk";
import style from "./main.module.css";

export function Feed() {
    return <>
        <div><h2>Лента заказов</h2>
            <div className={style.content}>
                <FeedContainer />
                <FeedDesk />
            </div></div></>
}
