import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import style from "./login.module.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { request } from "../services/utils/api";
import { useAuth } from "../services/utils/auth";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const auth = useAuth();

  if (auth.user) {
    return <Navigate to={"/profile/"} />;
  }

  const onButtonClick = async () => {
    const jsonPost = {
      email: email,
    };

    const post = {
      method: "POST",
      body: JSON.stringify(jsonPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      const result = await request("password-reset", post);
      if (result.success) {
        navigate("/reset-password/", { email: email });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={style.login_box}>
        <h2>Восстановление пароля</h2>
        <Input
          type={"email"}
          placeholder={"Укажите E-mail"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          error={false}
          ref={emailRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onButtonClick}
        >
          Восстановить
        </Button>
      </div>
      <div className={`${style.login_text} mt-20`}>
        <div>
          Вспомнили пароль? <Link to="/login/">Войти</Link>
        </div>
      </div>
    </div>
  );
}
