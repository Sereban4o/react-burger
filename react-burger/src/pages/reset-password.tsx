import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState, useEffect, FormEvent } from "react";
import style from "./login.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../services/utils/auth";
import { useVisible } from "../hooks/visible";

import { getCookie } from "../services/utils/utils";

export function ResetPassword({}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const { visible, onVisible } = useVisible();

  const auth = useAuth();
  useEffect(() => {
    if (!token || token !== getCookie("tokenPassword")) {
      navigate("/");
    }
  }, [token]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const json = {
        password: password,
        token: "",
      };
      auth.resetPassword(json);
    },
    [confirmPassword, navigate]
  );

  return (
    <div>
      <div className={style.login_box}>
        <h2>Восстановление пароля</h2>
        <form onSubmit={onSubmit} className={style.form}>
          {!visible ? (
            <Input
              type={"password"}
              placeholder={"Введите новый пароль"}
              onChange={(e) => setPassword(e.target.value)}
              icon={"ShowIcon"}
              value={password}
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
              placeholder={"Введите новый пароль"}
              onChange={(e) => setPassword(e.target.value)}
              icon={"HideIcon"}
              value={password}
              name={"password"}
              error={false}
              onIconClick={onVisible}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
          )}
          {!visible ? (
            <Input
              type={"password"}
              placeholder={"Введите код из письма"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={"ShowIcon"}
              value={confirmPassword}
              name={"confirmPassword"}
              error={false}
              onIconClick={onVisible}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
          ) : (
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={"HideIcon"}
              value={confirmPassword}
              name={"confirmPassword"}
              error={false}
              onIconClick={onVisible}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
          )}

          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </form>
      </div>
      <div className={`${style.login_text} mt-20`}>
        <div>
          Вспомнили пароль? <Link to="/login/">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
