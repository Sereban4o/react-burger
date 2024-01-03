import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredients } from "../../services/utils/data";
import { useAppSelector } from "../../services/utils/hooks";
import style from "./FeedElement.module.css"
import { Link, useLocation } from "react-router-dom";

function FeedElement({ item }: any) {
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
    let ingredients: any = [];
    let summ = 0;

    item.ingredients.forEach((el: string) => {
        const ing = dataApi.filter((item: TIngredients) => item._id === el);
        if (ing) {
            ingredients.push(ing[0]);
            summ = summ + ing[0].price;
            if (ing[0].type === 'bun') {
                summ = summ + ing[0].price;
            }
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
            pathname: `/orders/${item._id}/`,
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
                    {ingredients.map((el: TIngredients, index: number) => {
                        if (index < 5) {
                            return (<div className={style.border} key={index}>
                                < img className={style.image} src={el.image} alt={el.name} />
                            </div>)
                        }
                    })}

                </div>
                <div className={`${style.summ} text text_type_digits-default`}>{summ}  <CurrencyIcon type="primary" /></div>
            </div>
        </div></Link>
    );

}

export default FeedElement;
