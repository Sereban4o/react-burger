import AppHeader from "../AppHeader/AppHeader";
import style from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  MainPage,
  Profile,
  Register,
  ResetPassword,
} from "../../pages";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/usemodal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const { view } = useSelector((state) => state.modal);
  const { isModalOpen, closeModal } = useModal();

  return (
    <div className={style.app}>
      <AppHeader />
      <main className="center">
        <Routes>
          <Route path="/" exact element={<MainPage />} />

          <Route
            path="/login/"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register/"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password/"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password/"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/"
            exact
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders/"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {view ? (
            <Route
              path="/ingredient/:id/"
              element={
                <Modal onClick={closeModal} isModalOpen={isModalOpen}>
                  <IngredientDetails />
                </Modal>
              }
            />
          ) : (
            <Route path="/ingredient/:id/" element={<IngredientDetails />} />
          )}
          <Route render={() => <h1>Страница не найдена</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
