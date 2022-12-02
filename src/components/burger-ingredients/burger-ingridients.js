
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TemlateBurger from './template-burgers/template-burgers';
import { Spinner } from '../spinner/spinner';
import { SET_INGREDIENT_MODAL } from "../../services/actions/ingredient-detail-modal";
import styles from './burger-ingridients.module.css';
import { getItems } from '../../services/actions/ingredients';

const NewsItems = () => {
    const { items, itemsRequest, itemsFailed } = useSelector(state => state.ingredients);

    const dispatch = useDispatch();

    const [current, setCurrent] = useState('buns');

    const onTabClick = (tab) => {
        setCurrent(tab);
        const elem = document.getElementById(tab);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" })
        }
    }

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0,
    });
    const [sausesRef, inViewSauses] = useInView({
        threshold: 0,
    });
    const [mainsRef, inViewMains] = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inViewBuns) {
            setCurrent('buns');
        } else if (inViewSauses) {
            setCurrent('sauces');
        } else if (inViewMains) {
            setCurrent('mains');
        }
    }, [inViewBuns, inViewMains, inViewSauses]);

    const onIngredientClick = (ingredientModal) => {
        dispatch({ type: SET_INGREDIENT_MODAL, payload: ingredientModal })
    }

    // const closeModal = () => {
    //     dispatch({ type: RESET_INGREDIENT_MODAL }
    //     )
    // };

    useEffect(() => {
        dispatch(getItems())
    }, []);

    const itemBurger = useMemo(() => items.filter(value => value.type === 'bun'), [items]);
    const itemSauce = useMemo(() => items.filter(value => value.type === 'sauce'), [items]);
    const itemMain = useMemo(() => items.filter(value => value.type === 'main'), [items]);

    if (itemsFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (itemsRequest) {
        return <p><Spinner /></p>
    } else {
        if (items) {

            return (
                <>
                    <div className={styles.burgerMain}>
                        <Tab
                            value="buns"
                            active={current === 'buns'}
                            onClick={onTabClick}>
                            Булки
                        </Tab>
                        <Tab
                            value="sauces"
                            active={current === 'sauces'}
                            onClick={onTabClick}>
                            Соусы
                        </Tab>
                        <Tab
                            value="mains"
                            active={current === 'mains'}
                            onClick={onTabClick}>
                            Начинки
                        </Tab>
                    </div>
                    <section className={styles.ingridients}>
                        <TemlateBurger
                            ref={bunsRef}
                            headlineText={'Булки'}
                            titleId={'buns'}
                            ingredientsItems={itemBurger}
                            onIngredientClick={onIngredientClick}
                        />
                        <TemlateBurger
                            ref={sausesRef}
                            headlineText={'Соусы'}
                            titleId={'sauces'}
                            ingredientsItems={itemSauce}
                            onIngredientClick={onIngredientClick}
                        />
                        <TemlateBurger
                            ref={mainsRef}
                            headlineText={'Начинки'}
                            titleId={'mains'}
                            ingredientsItems={itemMain}
                            onIngredientClick={onIngredientClick}
                        />
                    </section>
                </>)
        }


    }
}

const BurgerIngredients = () => {

    return (
        <main className={styles.mainBurger}>
            <section className={styles.titleBurger}>
                <p className={styles.titleText}>Соберите бургер</p>
            </section>
            <NewsItems />
        </main>
    )
}


export default BurgerIngredients;
