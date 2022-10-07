

import BurgerTabs from './BurgerTabs/burgerTabs';
import Ingridients from './Ingridients/ingridients';

import style from './burger.module.css';

const Burger = () => {
    return (
        <main className={style.mainBurger}>
            <section className={style.titleBurger}>
                <p className={style.titleText}>Соберите бургер</p>
            </section>
            <BurgerTabs />
            <Ingridients />
         </main>
    )
}

export default Burger;