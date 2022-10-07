
import Headline from './HeadLine1/headLine';
import BurgerColumn from './ColumnsBurger/columnBurger';
import Headline2 from './HeadLine2/headLine2';
import ColumnSauses from './ColumnSauses/columnSauses';
import styles from './ingridients.module.css';


const Ingridients = () => {

    return (
        <section className={styles.ingridients}> 
        <Headline/>
        <BurgerColumn/>
        <Headline2/>
        <ColumnSauses/>
        </section>
    )
}

export default Ingridients;