import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={`${style.app__header} mt-10 center`}>
      <a
        href="#"
        className={`${style.app__header_button} ${style.app__header_button_constructor} mt-4 mb-4 mr-7 text text_type_main-default`}
      >
        <BurgerIcon type="primary" />
        Конструктор
      </a>
      <a
        href="#"
        className={`${style.app__header_button} ${style.app__header_button_grey} mt-4 mb-4 ml-5 mr-5 text text_type_main-default`}
      >
        <ListIcon type="secondary" />
        Лента заказов
      </a>
      <a href="#" className={style.app__header_logo}>
        <Logo />
      </a>
      <a
        href="#"
        className={`${style.app__header_button} ${style.app__header_button_grey} ${style.app__header_right} mt-4 mb-4 text text_type_main-default`}
      >
        <ProfileIcon type="primary" />
        Личный кабинет
      </a>
    </header>
  );
}

export default AppHeader;
