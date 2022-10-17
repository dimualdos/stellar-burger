
import BurgerTabs from './BurgerTabs/burger-tabs';
import Ingridients from './Ingridients/ingridients';

import style from './burger-ingridients.module.css';

const BurgerIngredients = (props) => {

    return (
        <main className={style.mainBurger}>
            <section className={style.titleBurger}>
                <p className={style.titleText}>Соберите бургер</p>
            </section>
            <BurgerTabs />
            <Ingridients data={props.data} />
        </main>
    )
}


export default BurgerIngredients;