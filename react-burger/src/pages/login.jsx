import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState, useCallback } from "react";
import style from "./login.module.css";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { fetchWithRefresh } from "../services/utils/api";
import { useAuth } from "../services/utils/auth";

export function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
  };
  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const auth = useAuth();

  const onButtonClick = useCallback(() => {
    auth.signIn(user);
  }, [user, navigate]);

  if (auth.user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className={style.login_box}>
        <h2>Вход</h2>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={onChange}
          value={user.email}
          name={"email"}
          error={false}
          ref={emailRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={onChange}
          icon={"ShowIcon"}
          value={user.password}
          name={"password"}
          error={false}
          ref={passwordRef}
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
          Войти
        </Button>
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
