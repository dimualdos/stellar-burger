

import BurgerColumn from './BurgerColumns/burger-column';
import ColumnSauses from './ColumnSauses/column-sauses';
import FillingsColumns from './FillingsColumns/fillings-columns';
import styles from './ingridients.module.css';


const Ingridients = () => {

    return (
        <section className={styles.ingridients}> 
        <BurgerColumn/>
        <ColumnSauses/>
        <FillingsColumns/>
        </section>
    )
}

export default Ingridients;