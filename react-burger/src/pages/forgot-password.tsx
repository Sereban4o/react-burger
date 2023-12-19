import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useRef, useState } from "react";
import style from "./login.module.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../services/utils/auth";
import { randomString } from "../services/utils/utils";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (email.length > 3) {
        const jsonPost = {
          email: email,
        };

        const random = randomString();
        auth.forgotPassword(jsonPost, random);
        navigate(`/reset-password/${random}`);
      } else {
        alert("Введите адрес почты!");
      }
    },
    [email, navigate]
  );

  return (
    <div>
      <div className={style.login_box}>
        <h2>Восстановление пароля</h2>
        <form onSubmit={onSubmit} className={style.form}>
          <Input
            type={"email"}
            placeholder={"Укажите E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />

          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </form>
      </div>
      <div className={`${style.login_text} mt-20`}>
        <div>
          Вспомнили пароль? <Link to="/login/">Войти</Link>
        </div>
      </div>
    </div>
  );
}
