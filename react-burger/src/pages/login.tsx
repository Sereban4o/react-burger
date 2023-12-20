import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import style from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/utils/auth";
import { useVisible } from "../hooks/visible";

export function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const { visible, onVisible } = useVisible();

  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const auth = useAuth();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      auth.signIn(user);
    },
    [user, navigate]
  );

  return (
    <div>
      <div className={style.login_box}>
        <h2>Вход</h2>
        <form onSubmit={onSubmit} className={style.form}>
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
              onIconClick={onVisible}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
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
            />
          )}
          <Button type="primary" size="large" htmlType="submit">
            Войти
          </Button>
        </form>
      </div>
      <div className={`${style.login_text} mt-20`}>
        <div>
          Вы - новый пользователь?{" "}
          <Link to="/register/">Зарегистрироваться</Link>
        </div>
        <div>
          Забыли пароль? <Link to="/forgot-password/">Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
}
