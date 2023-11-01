import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import "./App.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  const [data, setData] = useState(null);

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
        setData(data.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  return (
    <div className="center app">
      <AppHeader />
      <main className="content">
        {data && <BurgerIngredients data={data} />}
        {data && <BurgerConstructor data={data} />}
      </main>
    </div>
  );
}

export default App;
