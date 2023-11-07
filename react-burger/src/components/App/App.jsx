import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import style from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { DataContext } from "../service/dataContext";

function App() {
  const [dataAPI, setDataAPI] = useState(null);
  const [buns, setBuns] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [main, setMain] = useState(null);

  const url = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Promise.reject(`Ошибка ${response.status}`);
        }
      })
      .then((data) => {
        setDataAPI(data.data);
        setBuns(data.data.filter((dataType) => dataType.type === "bun"));
        setSauce(data.data.filter((dataType) => dataType.type === "sauce"));
        setMain(data.data.filter((dataType) => dataType.type === "main"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.content}>
        {dataAPI && <BurgerIngredients buns={buns} sauce={sauce} main={main} />}
        {dataAPI && (
          <DataContext.Provider value={{ buns, main, sauce }}>
            <BurgerConstructor />
          </DataContext.Provider>
        )}
      </main>
    </div>
  );
}

export default App;
