import {useState} from 'react';
import { PropTypes } from "prop-types";
import TemlateBurger from '../TemplateBurgers/template-burgers';
import IngidientDetails from '../../IngredientDetails/ingredient-details';
import styles from './ingridients.module.css';
import Modal from '../../Modal/modal';


const BurgerColumn = ({onIngridientSelected, headlineText, id, data }) => {
    const item = data.data.filter(value => value.type === 'bun');
    return (
        <>
            <TemlateBurger onIngridientSelected={ onIngridientSelected} headlineText={headlineText} id={id} data={item} />
        </>
    )
}
const SauceColumn = ({onIngridientSelected, headlineText, id, data }) => {
    const item = data.data.filter(value => value.type === 'sauce');
    return (
        <>
            <TemlateBurger onIngridientSelected={ onIngridientSelected} headlineText={headlineText} id={id} data={item} />
        </>
    )
}

const FillingColumn = ({onIngridientSelected,  headlineText, id, data }) => {
    const item = data.data.filter(value => value.type === 'main');
    return (
        <>
            <TemlateBurger onIngridientSelected={ onIngridientSelected} headlineText={headlineText} id={id} data={item} />
        </>
    )
}


const Ingridients = ({data}) => {
    const [ingridientInModal, setIngridientInModal] = useState(null);

    const onIngridientSelected = (id, image, name, proteins, fat, carbohydrates, calories) => {
        setIngridientInModal({ id, image, name, proteins, fat, carbohydrates, calories })
    }
    const closeModal = () => {
      setIngridientInModal(null)
    }
   
    return (
        <>
        <section className={styles.ingridients}>
            <BurgerColumn   onIngridientSelected={ onIngridientSelected} headlineText={'Булки'} id={'bun'} data={data} />
            <SauceColumn  onIngridientSelected={ onIngridientSelected} headlineText={'Соусы'} id={'sauce'} data={data} />
            <FillingColumn  onIngridientSelected={ onIngridientSelected} headlineText={'Начинки'} id={'main'} data={data} />
        </section>
             {ingridientInModal ?
                    (<Modal onClose={closeModal} title='Детали ингридиента'>
                        <IngidientDetails data={ingridientInModal} />
                    </Modal>) : null
                }
        </>
        
    )
}

Ingridients.propTypes = {
    data: PropTypes.object.isRequired
}

export default Ingridients;