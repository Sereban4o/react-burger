import { useState, useCallback } from "react";
import style from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../services/utils/auth";
import { useVisible } from "../hooks/visible";

interface IUser {
  name: string;
  email: string;
  password: string;
}

export function Profile() {
  const auth = useAuth();

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const { visible, onVisible } = useVisible();
  const [visiableButton, setVisiableButton] = useState(false);

  const navigate = useNavigate();

  const onExitButtonClick = useCallback(() => {
    auth.signOut();
  }, [auth, navigate]);

  const onChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    setVisiableButton(true);
  };

  const undo = () => {
    if (auth.user) {
      setUser({
        name: auth.user?.name,
        email: auth.user?.email,
        password: "",
      });
      setVisiableButton(false);
    }
  };

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (user.email) {
        auth.saveUser({ email: user.email, name: user.name });
        setVisiableButton(false);
      }
    },
    [user, navigate]
  );

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
      <div>
        <form onSubmit={onSubmit} className={style.profile_info_box}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={user.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={onChange}
            icon={"EditIcon"}
            value={user.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          {!visible ? (
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={onChange}
              icon={"ShowIcon"}
              value={user.password}
              name={"password"}
              error={false}
              onIconClick={onVisible}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
              required={false}
            />
          ) : (
            <Input
              type={"text"}
              placeholder={"Пароль"}
              onChange={onChange}
              icon={"HideIcon"}
              value={user.password}
              name={"password"}
              error={false}
              onIconClick={onVisible}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
              required={false}
            />
          )}

          {visiableButton && (
            <div className={style.profile_button_box}>
              <Button htmlType="submit" type="primary" size="large">
                Сохранить
              </Button>
              <Button
                htmlType="button"
                type="secondary"
                size="large"
                onClick={undo}
              >
                Отмена
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
