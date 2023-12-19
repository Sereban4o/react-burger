import AppHeader from "../AppHeader/AppHeader";
import style from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { useAuth } from "../../services/utils/auth";
import Error404 from "../Error404/Error404";
import { RootState } from "../../services/types";

function App() {
  const dispatch: any = useDispatch();
  const auth: any = useAuth();
  const location: any = useLocation;

  useEffect(() => {
    dispatch(getIngredients());
    auth.getUser();
  }, [dispatch]);
  const { view } = useSelector((state: RootState) => state.modal);
  const { closeModal } = useModal();

  return (
    <div className={style.app}>
      <AppHeader />
      <main className="center">
        <Routes>
          <Route path="/" element={<MainPage />} />

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
                <Modal onClick={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          ) : (
            <Route path="/ingredient/:id/" element={<IngredientDetails />} />
          )}
          <Route element={<Error404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
