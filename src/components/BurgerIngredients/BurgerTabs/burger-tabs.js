
import { useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-tabs.module.css'

const BurgerTabs = () => {
  const [current, setCurrent] = useState('bun');

  const onTabClick = (tab) => {
    setCurrent(tab);
    const elem = document.getElementById(tab);
    if (elem) {
      return elem.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (

    <div className={styles.burgerMain}>
      <Tab
        value="bun"
        active={current === 'bun'}
        onClick={onTabClick}>
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === 'sauce'}
        onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === 'main'}
        onClick={onTabClick}>
        Начинки
      </Tab>
    </div>

  )
}
export default BurgerTabs;