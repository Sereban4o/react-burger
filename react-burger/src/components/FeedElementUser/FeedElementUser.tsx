import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TNewTableOrderIngredients, TOrderIngredients, TOrderItem } from "../../services/utils/data";
import { useAppSelector } from "../../services/utils/hooks";
import style from "./FeedElementUser.module.css"
import { Link, useLocation } from "react-router-dom";
import { tableLayout } from "../../services/utils/utils";

function FeedElementUser({ item }: TOrderItem) {

    const location = useLocation();
    const createDate = new Date(item.createdAt);

    const today = new Date;
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    )



    const { dataApi } = useAppSelector(
        (state) => state.ingredients
    );
    let ingredients: Array<TOrderIngredients> = [];
    let summ = 0;

    const newT = tableLayout(item.ingredients);

    newT.forEach((el: TNewTableOrderIngredients) => {
        const ing = dataApi.filter((item) => item._id === el.id);
        if (ing) {
            let count = "";
            if (el.count !== 1) {
                count = '+' + el.count;
            }
            ingredients.push({ item: ing[0], count: count });
            summ = summ + ing[0].price * el.count;

        }

    });



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


    return (<Link
        key={item._id}
        to={{
            pathname: `/profile/orders/${item.number}/`,
        }}
        state={{ background: location }}
        className={style.link}
    >
        <div className={style.element}>
            <div className={`${style.header} ml-6 mt-6 mr-6 mb-6`}>
                <p className="text text_type_digits-default">#{item.number}</p>
                <p className={style.date}>{textDate}</p></div>

            <p className="text text_type_main-medium ml-6 mr-6 mb-6">{item.name}</p>
            <div className={`${style.box} ml-6 mr-6 pb-6`}>
                <div className={style.ingredients_box}>
                    {ingredients.map((el, index) => {

                        return (<div className={style.border} key={index}>
                            <span className={`${style.span} text text_type_digits-default`}>{el.count}</span>
                            < img className={style.image} src={el.item.image} alt={el.item.name} />

                        </div>)

                    })}

                </div>
                <div className={`${style.summ} text text_type_digits-default`}>{summ}  <CurrencyIcon type="primary" /></div>
            </div>
        </div></Link>
    );

}

export default FeedElementUser;
