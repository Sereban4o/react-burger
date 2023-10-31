import './AppHeader.css';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'



function AppHeader() {
    return (
      <header className='app__header'>
        <a href="#" className='app__header_button app__header_button_constructor'><BurgerIcon type="primary" />Конструктор</a>
        <a href='#' className='app__header_button app__header_button_feed'> <ListIcon type="secondary" />Лента заказов</a>  
        <a href='#' className='app__header_logo'><Logo/></a>
        <a href='#' className='app__header_button app__header_button_login'><ProfileIcon type="primary" />Личный кабинет</a>
      </header>
    );
  }

export default AppHeader;