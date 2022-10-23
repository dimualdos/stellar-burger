import {useState, useContext} from 'react';
import TemlateBurger from '../TemplateBurgers/template-burgers';
import IngidientDetails from '../../IngredientDetails/ingredient-details';
import styles from './ingridients.module.css';
import Modal from '../../Modal/modal';
import { BurgerContext } from '../../Services/burger-context';



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


const Ingridients = () => {
    const [ingridientInModal, setIngridientInModal] = useState(null);

    const onIngridientSelected = (id, image, name, proteins, fat, carbohydrates, calories) => {
        setIngridientInModal({ id, image, name, proteins, fat, carbohydrates, calories })
    }
    const closeModal = () => {
      setIngridientInModal(null)
    }

    const burgerSelect = useContext(BurgerContext);
   
    return (
        <>
        <section className={styles.ingridients}>
            <BurgerColumn   onIngridientSelected={ onIngridientSelected} headlineText={'Булки'} id={'bun'} data={burgerSelect} />
            <SauceColumn  onIngridientSelected={ onIngridientSelected} headlineText={'Соусы'} id={'sauce'} data={burgerSelect} />
            <FillingColumn  onIngridientSelected={ onIngridientSelected} headlineText={'Начинки'} id={'main'} data={burgerSelect} />
        </section>
             {ingridientInModal ?
                    (<Modal onClose={closeModal} itemBurger={ingridientInModal} title='Детали ингридиента'>
                        <IngidientDetails itemBurger={ingridientInModal} />
                    </Modal>) : null
                }
        </>
        
    )
}



export default Ingridients;