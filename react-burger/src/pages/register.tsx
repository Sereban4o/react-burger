import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import style from "./login.module.css";
import { Link } from "react-router-dom";
import { useVisible } from "../hooks/visible";
import { useAuth } from "../services/utils/auth";

export function Register() {
  const [user, setUser] = useState({ email: "", password: "", name: "" });

  const { visible, onVisible } = useVisible();
  const auth = useAuth();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      auth.register(user);
    },
    [user]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
