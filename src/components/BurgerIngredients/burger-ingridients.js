
import { PropTypes } from "prop-types";
import { useState, useContext, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TemlateBurger from './TemplateBurgers/template-burgers';
import IngidientDetails from '../IngredientDetails/ingredient-details';
import Modal from '../Modal/modal';
import { BurgerContext } from '../../services/burger-context';

import styles from './burger-ingridients.module.css';


const BurgerTabs = () => {
    const [current, setCurrent] = useState('bun');

    const onTabClick = (tab) => {
        setCurrent(tab);
        const elem = document.getElementById(tab);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" })
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

const IngredientList = ({ onIngridientSelected, headlineText, id, data }) => {
    return (
        <TemlateBurger onIngridientSelected={onIngridientSelected} headlineText={headlineText} id={id} data={data} />
    )
}

const Ingridients = () => {
    const [ingridientInModal, setIngridientInModal] = useState(null);

    const onIngridientSelected = (id, image, name, proteins, fat, carbohydrates, calories) => {
        setIngridientInModal({ id, image, name, proteins, fat, carbohydrates, calories })
    };
    const closeModal = () => {
        setIngridientInModal(null)
    };

    const burgerSelect = useContext(BurgerContext);
    const itemBurger = useMemo(
        () => burgerSelect.data.filter(value => value.type === 'bun'), [burgerSelect]);
    const itemSauce = useMemo(
        () => burgerSelect.data.filter(value => value.type === 'sauce'), [burgerSelect]);
    const itemMain = useMemo(
        () => burgerSelect.data.filter(value => value.type === 'main'), [burgerSelect]);
    return (
        <>
            <BurgerTabs />
            <section className={styles.ingridients}>
                <IngredientList onIngridientSelected={onIngridientSelected} headlineText={'Булки'} id={'bun'} data={itemBurger} />
                <IngredientList onIngridientSelected={onIngridientSelected} headlineText={'Соусы'} id={'sauce'} data={itemSauce} />
                <IngredientList onIngridientSelected={onIngridientSelected} headlineText={'Начинки'} id={'main'} data={itemMain} />
            </section>
            {ingridientInModal ?
                (<Modal onClose={closeModal} itemBurger={ingridientInModal} title='Детали ингридиента'>
                    <IngidientDetails itemBurger={ingridientInModal} />
                </Modal>) : null
            }
        </>

    )
}

const BurgerIngredients = () => {
    return (
        <main className={styles.mainBurger}>
            <section className={styles.titleBurger}>
                <p className={styles.titleText}>Соберите бургер</p>
            </section>
            <Ingridients />
        </main>
    )
}

IngredientList.propTypes = {
    onIngridientSelected: PropTypes.func.isRequired,
    headlineText: PropTypes.string,
    id: PropTypes.string,
    data: PropTypes.array.isRequired
}

export default BurgerIngredients;