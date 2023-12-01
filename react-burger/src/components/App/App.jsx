import AppHeader from "./AppHeader/AppHeader";
import style from "./App.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  MainPage,
  Profile,
  Register,
  ResetPassword,
} from "../../pages";
import { ProvideAuth } from "../../services/utils/auth";
import IngredientDetails from "./BurgerIngredients/Ingredient/IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/usemodal";

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (!ingredients.length) dispatch(getIngredients());
  }, [dispatch]);

  const { view } = useSelector((state) => state.modal);
  const { closeModal } = useModal();

  return (
    <ProvideAuth>
      <div className={style.app}>
        <AppHeader />
        <main className="center">
          <Routes>
            <Route path="/" exact element={<MainPage />} />

            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/forgot-password/" element={<ForgotPassword />} />
            <Route path="/reset-password/" element={<ResetPassword />} />

            <Route path="/profile/" exact element={<Profile />} />
            <Route path="/profile/orders/" element={<Profile />} />
            <Route path="/profile/orders/:number" element={<Profile />} />
            {!view && (
              <Route path="/ingredient/:id/" element={<IngredientDetails />} />
            )}
            {view && (
              <Route
                path="/ingredient/:id/"
                element={
                  <Modal onClick={closeModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            )}
            <Route render={() => <h1>Страница не найдена</h1>} />
          </Routes>
        </main>
      </div>
    </ProvideAuth>
  );
}

export default App;
