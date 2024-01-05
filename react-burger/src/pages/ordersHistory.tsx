import { NavLink, useNavigate } from "react-router-dom";
import style from "./profile.module.css";
import { useCallback } from "react";
import { useAuth } from "../services/utils/auth";
import UserFeedContainer from "../components/UserFeedContainer/UserFeedContainer";
export function OrdersHistory() {

    const auth = useAuth();
    const navigate = useNavigate();
    const onExitButtonClick = useCallback(() => {

        auth.signOut();
    }, [auth, navigate]);
    return (
        <div className={style.profile_box}>
            <div>
                <div className={style.profile_menu}>
                    <NavLink
                        to="/profile/"
                        className={({ isActive }) =>
                            `${isActive ? "active" : "inactive"} ${style.profile_menu_item
                            } text text_type_main-medium`
                        }
                    >
                        Профиль
                    </NavLink>

                    <NavLink
                        to="/profile/orders/"
                        className={({ isActive }) =>
                            `${isActive ? "active" : "inactive"} ${style.profile_menu_item
                            } text text_type_main-medium`
                        }
                    >
                        История заказов
                    </NavLink>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${isActive ? "active" : "inactive"} ${style.profile_menu_item
                            } text text_type_main-medium`
                        }
                        onClick={onExitButtonClick}
                    >
                        Выход
                    </NavLink>
                </div>
                <p
                    className={`${style.profile_menu_footer} mt-20  text text_type_main-small`}
                >
                    В это разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div><UserFeedContainer /></div>
        </div>
    );
}
