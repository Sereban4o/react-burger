import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState, useCallback } from "react";
import style from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchWithRefresh, saveTokens } from "../services/utils/api";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../services/actions/user";
import { useVisible } from "../hooks/visible";
import { useAuth } from "../services/utils/auth";

export function Register() {
  const [user, setUser] = useState({ email: "", password: "", name: "" });

  const { visible, onVisible } = useVisible();
  const auth = useAuth();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      auth.signIn(user, "auth/register");
    },
    [user]
  );

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className={style.login_box}>
        <h2>Регистрация</h2>
        <form onSubmit={onSubmit} className={style.form}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={user.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChange}
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
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
              onIconClick={onVisible}
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
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
              onIconClick={onVisible}
            />
          )}

          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>
        </form>
      </div>
      <div className={`${style.login_text} mt-20`}>
        <div>
          Вы уже зарегистрированы? <Link to="/login/">Войти</Link>
        </div>
      </div>
    </div>
  );
}
