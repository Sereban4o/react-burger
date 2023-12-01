import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import style from "./login.module.css";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { request } from "../services/utils/api";
import { useAuth } from "../services/utils/auth";

export function ResetPassword({ route, navigation }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const codeRef = useRef(null);
  const passwordRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
  };
  console.log(navigation);
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to={"/profile/"} />;
  }

  const onButtonClick = async () => {
    const jsonPost = {
      password: password,
      token: "",
    };

    const post = {
      method: "POST",
      body: JSON.stringify(jsonPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      const result = await request("password-reset/reset", post);
      if (result.success) {
        navigate("/login/");
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
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={(e) => setPassword(e.target.value)}
          icon={"ShowIcon"}
          value={password}
          name={"name"}
          error={false}
          ref={passwordRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setCode(e.target.value)}
          icon={"ShowIcon"}
          value={code}
          name={"name"}
          error={false}
          ref={codeRef}
          onIconClick={onIconClick}
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
          Сохранить
        </Button>
      </div>
      <div className={`${style.login_text} mt-20`}>
        <div>
          Вспомнили пароль? <Link to="/login/">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
