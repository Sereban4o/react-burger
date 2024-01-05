import AppHeader from "../AppHeader/AppHeader";
import style from "./App.module.css";
import { useEffect } from "react";
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
import { useAppDispatch } from "../../services/utils/hooks";
import { getIngredients } from "../../services/utils/api";
import { Feed } from "../../pages/feed";
import { connect, connectUser, disconnect, disconnectUser } from "../../services/actions/orders";
import OrderInfo from "../OrderInfo/OrderInfo";
import { OrdersHistory } from "../../pages/ordersHistory";
import { getCookie } from "../../services/utils/utils";
import OrderInfoUser from "../OrderInfoUser/OrderInfoUser";


function App() {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const location = useLocation();
    const background = location.state && location.state.background;
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getIngredients());
        auth.getUser();
    }, [dispatch]);

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        dispatch(connectUser(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
        return () => {
            dispatch(disconnectUser());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(connect(`wss://norma.nomoreparties.space/orders/all`));
        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);


    return (
        <div className={style.app}>
            <AppHeader />
            <main className="center">
                <Routes location={background || location}>
                    <Route path="/" element={<MainPage />}></Route>
                    <Route path="/ingredient/:id/" element={<IngredientDetails />} />
                    <Route path="/feed/" element={<Feed />} />
                    <Route path="/feed/:id/" element={<OrderInfo />} />
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
                                <OrdersHistory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile/orders/:id"
                        element={
                            <ProtectedRoute>
                                <OrderInfoUser />
                            </ProtectedRoute>
                        }
                    />

                    <Route element={<Error404 />} />
                </Routes>
                {background && (
                    <Routes>
                        <Route
                            path="/ingredient/:id/"
                            element={
                                <Modal onClick={closeModal}>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                        <Route
                            path="/feed/:id/"
                            element={
                                <Modal onClick={closeModal}>
                                    <OrderInfo />
                                </Modal>
                            }
                        />
                        <Route
                            path="/profile/orders/:id"
                            element={
                                <ProtectedRoute>
                                    <Modal onClick={closeModal}>
                                        <OrderInfoUser />
                                    </Modal>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                )}
            </main>
        </div>
    );
}

export default App;
