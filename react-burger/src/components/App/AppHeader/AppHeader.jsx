import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./AppHeader.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../services/utils/auth";
import { useState } from "react";

function AppHeader() {
  const auth = useAuth();
  return (
    <header className={`${style.app__header} mt-10 center`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${isActive ? "active" : "inactive"} ${style.app__header_button} ${
            style.app__header_button_constructor
          } mt-4 mb-4 mr-7 text text_type_main-default`
        }
      >
        <BurgerIcon type="primary" />
        Конструктор
      </NavLink>
      <a href="#"></a>
      <Link
        to="/"
        href="#"
        className={`${style.app__header_button} ${style.app__header_button_grey} mt-4 mb-4 ml-5 mr-5 text text_type_main-default`}
      >
        <ListIcon type="secondary" />
        Лента заказов
      </Link>
      <Link to="/" className={style.app__header_logo}>
        <Logo />
      </Link>
      {auth.user && (
        <NavLink
          to="/profile/"
          className={({ isActive }) =>
            `${isActive ? "active" : "inactive"} ${style.app__header_button} ${
              style.app__header_button
            } ${style.app__header_right} mt-4 mb-4 text text_type_main-default`
          }
        >
          <ProfileIcon type="primary" />
          Личный кабинет
        </NavLink>
      )}
      {!auth.user && (
        <NavLink
          to="/login/"
          className={({ isActive }) =>
            `${isActive ? "active" : "inactive"} ${style.app__header_button} ${
              style.app__header_button
            } ${style.app__header_right} mt-4 mb-4 text text_type_main-default`
          }
        >
          <ProfileIcon type="primary" />
          Личный кабинет
        </NavLink>
      )}
    </header>
  );
}

export default AppHeader;
