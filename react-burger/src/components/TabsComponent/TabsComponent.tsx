import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import style from "./TabsComponent.module.css";

function TabsComponent() {
  const [current, setCurrent] = useState("buns");

  const onClick = (tab: string) => {
    setCurrent(tab);
  };
  return (
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
  );
}
export default TabsComponent;
