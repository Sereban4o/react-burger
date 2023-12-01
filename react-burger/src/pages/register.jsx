import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import style from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchWithRefresh, saveTokens } from "../services/utils/api";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../services/actions/user";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onButtonClick = async () => {
    const jsonPost = {
      email: email,
      password: password,
      name: name,
    };

    const post = {
      method: "POST",
      body: JSON.stringify(jsonPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      const result = await fetchWithRefresh("auth/register", post);

      if (result.success) {
        navigate("/login");
      }
    } catch (error) {
      alert("Не получилось зарегистрироваться!");
      console.log(error);
    }
  };

  return (
    <div>
      <div className={style.login_box}>
        <h2>Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          ref={nameRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"name"}
          error={false}
          ref={emailRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
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

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onButtonClick}
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${style.login_text} mt-20`}>
        <div>
          Вы уже зарегистрированы? <Link to="/login/">Войти</Link>
        </div>
      </div>
    </div>
  );
}
