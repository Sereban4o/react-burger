import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import "./App.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((response) => response.json())
      .then((dataJson) => setData(dataJson));
  }, []);

  return (
    <div className="center app">
      <AppHeader />
      <div className="content">
        {data && <BurgerIngredients data={data} />}
        {data && <BurgerConstructor data={data} />}
      </div>
    </div>
  );
}

export default App;
