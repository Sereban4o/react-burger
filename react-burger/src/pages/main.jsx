import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/App/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/App/BurgerConstructor/BurgerConstructor";
import style from "./main.module.css";

export function MainPage() {
  return (
    <div className={style.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
}
