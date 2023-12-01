import { useRef, useState, useCallback } from "react";
import style from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../services/utils/auth";
import { useSelector } from "react-redux";

export function Profile() {
  const auth = useAuth();
  let userAuth = {};
  if (auth.user) {
    userAuth = auth.user;
    userAuth["password"] = "111";
  }

  const [formUser, setFormUser] = useState(userAuth);
  const [visiable, setVisiable] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const onExitButtonClick = useCallback(() => {
    auth.signOut();
  }, [auth, navigate]);

  const onSaveButtonClick = useCallback(() => {
    auth.saveUser(formUser);
  }, [auth, navigate]);

  if (!auth.user) {
    return <Navigate to={"/login/"} />;
  } else {
  }

  const onIconClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
  };

  const onChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
    setVisiable(true);
  };

  return (
    <div className={style.profile_box}>
      <div>
        <div className={style.profile_menu}>
          <NavLink
            to="/profile/"
            className={({ isActive }) =>
              `${isActive ? "active" : "inactive"} ${
                style.profile_menu_item
              } text text_type_main-medium`
            }
          >
            Профиль
          </NavLink>

          <NavLink
            to="/profile/orders/"
            className={({ isActive }) =>
              `${isActive ? "active" : "inactive"} ${
                style.profile_menu_item
              } text text_type_main-medium`
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "active" : "inactive"} ${
                style.profile_menu_item
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
      <div className={style.profile_info_box}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          icon={"EditIcon"}
          value={formUser.name}
          name={"name"}
          error={false}
          ref={nameRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={onChange}
          icon={"EditIcon"}
          value={formUser.email}
          name={"email"}
          error={false}
          ref={emailRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={onChange}
          icon={"EditIcon"}
          value={formUser.password}
          name={"password"}
          error={false}
          ref={passwordRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />

        {visiable && (
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={onSaveButtonClick}
          >
            Сохранить
          </Button>
        )}
      </div>
    </div>
  );
}
