import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

function TabsComponent() {
  const [current, setCurrent] = React.useState("buns");

  const onClick = (tab) => {
    setCurrent(tab);
  };
  return (
    <div style={{ display: "flex" }}>
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
