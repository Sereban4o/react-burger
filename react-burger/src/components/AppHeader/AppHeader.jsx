import "./AppHeader.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className="app__header mt-10">
      <a
        href="#"
        className="app__header_button app__header_button_constructor mt-4 mb-4"
      >
        <BurgerIcon type="primary" />
        Конструктор
      </a>
      <a
        href="#"
        className="app__header_button app__header_button_feed mt-4 mb-4"
      >
        <ListIcon type="secondary" />
        Лента заказов
      </a>
      <a href="#" className="app__header_logo">
        <Logo />
      </a>
      <a
        href="#"
        className="app__header_button app__header_button_login mt-4 mb-4"
      >
        <ProfileIcon type="primary" />
        Личный кабинет
      </a>
    </header>
  );
}

export default AppHeader;
