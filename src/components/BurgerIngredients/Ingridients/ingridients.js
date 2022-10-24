import { PropTypes } from "prop-types";
import { useState, useContext } from 'react';
import TemlateBurger from '../TemplateBurgers/template-burgers';
import IngidientDetails from '../../IngredientDetails/ingredient-details';
import styles from './ingridients.module.css';
import Modal from '../../Modal/modal';
import { BurgerContext } from '../../Services/burger-context';


const IngredientList = ({ onIngridientSelected, headlineText, id, data }) => {

    return (
        <TemlateBurger onIngridientSelected={onIngridientSelected} headlineText={headlineText} id={id} data={data} />
    )
}

const Ingridients = () => {
    const [ingridientInModal, setIngridientInModal] = useState(null);

    const onIngridientSelected = (id, image, name, proteins, fat, carbohydrates, calories) => {
        setIngridientInModal({ id, image, name, proteins, fat, carbohydrates, calories })
    }
    const closeModal = () => {
        setIngridientInModal(null)
    }

    const burgerSelect = useContext(BurgerContext);
    const itemBurger = burgerSelect.data.filter(value => value.type === 'bun');
    const itemSauce = burgerSelect.data.filter(value => value.type === 'sauce');
    const itemMain = burgerSelect.data.filter(value => value.type === 'main');
    return (
        <>
            <section className={styles.ingridients}>
                <IngredientList onIngridientSelected={onIngridientSelected} headlineText={'Булки'} id={'bun'} data={itemBurger} />
                <IngredientList onIngridientSelected={onIngridientSelected} headlineText={'Соусы'} id={'bun'} data={itemSauce} />
                <IngredientList onIngridientSelected={onIngridientSelected} headlineText={'Начинки'} id={'bun'} data={itemMain} />
            </section>
            {ingridientInModal ?
                (<Modal onClose={closeModal} itemBurger={ingridientInModal} title='Детали ингридиента'>
                    <IngidientDetails itemBurger={ingridientInModal} />
                </Modal>) : null
            }
        </>

    )
}
IngredientList.propTypes = {
    onIngridientSelected: PropTypes.func.isRequired,
    headlineText: PropTypes.string,
    id: PropTypes.string,
    data: PropTypes.array.isRequired
}




export default Ingridients;