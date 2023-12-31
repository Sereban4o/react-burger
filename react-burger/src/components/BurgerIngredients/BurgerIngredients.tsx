import style from "./BurgerIngredients.module.css";
import Ingredient from "../Ingredient/Ingredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { UIEvent, useRef, useState } from "react";
import { useAppSelector } from "../../services/utils/hooks";

function BurgerIngredients() {
    const { bun, main, sauce } = useAppSelector((state) => state.ingredients);

    const [current, setCurrent] = useState("buns");

    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);

    const onClick = (tab: string) => {
        setCurrent(tab);
    };

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const eventScrollTop = (e.target as HTMLElement).scrollTop;
        switch (true) {
            case mainsRef &&
                mainsRef.current &&
                saucesRef &&
                saucesRef.current &&
                eventScrollTop >= saucesRef.current.scrollHeight - 84 &&
                eventScrollTop < mainsRef.current?.scrollHeight - 200:
                return setCurrent("sauces");
            case mainsRef &&
                mainsRef.current &&
                eventScrollTop >= mainsRef.current.scrollHeight - 200:
                return setCurrent("mains");
            default:
                return setCurrent("buns");
        }
    };

    return (
        <section className={style.content_box}>
            <p
                className={`${style.content_box_header} text text_type_main-large mt-10 mb-5`}
            >
                Соберите бургер
            </p>
            <div className={style.tabs_component}>
                <Tab value="buns" active={current === "buns"} onClick={onClick}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === "sauces"} onClick={onClick}>
                    Соусы
                </Tab>
                <Tab value="mains" active={current === "mains"} onClick={onClick}>
                    Начинки
                </Tab>
            </div>

            <div
                className={style.content_box_ingredients}
                id="scrollbar"
                onScroll={handleScroll}
            >
                <div ref={bunsRef}>
                    <p className="text text_type_main-medium mt-10">Булки</p>
                    <div className={style.content_box_box}>
                        {bun.map((el) => (
                            <Ingredient item={el} key={el._id} />
                        ))}
                    </div>
                </div>

                <div ref={saucesRef}>
                    <p className="text text_type_main-medium  mt-10" ref={saucesRef}>
                        Соусы
                    </p>
                    <div className={style.content_box_box}>
                        {sauce.map((el) => (
                            <Ingredient item={el} key={el._id} />
                        ))}
                    </div>
                </div>

                <div ref={mainsRef}>
                    <p className="text text_type_main-medium  mt-10">Начинки</p>
                    <div className={style.content_box_box}>
                        {main.map((el) => (
                            <Ingredient item={el} key={el._id} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BurgerIngredients;
