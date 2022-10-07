import { useState, useEffect } from 'react';
import {dataMenu} from '../../../Utils/data';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import Column1 from './ColumnBurger/Column1/column1';
// import Column2 from './ColumnBurger/Column2/column2';
import  styles from './mainColumn.module.css';




const MainColumn = () =>  {
    const [burgerItem, setBurgerItem] = useState([]);

    useEffect(() => {
        onBuregerLoading()
    }, [])

    
    const onBuregerLoading = (arr) => {
        setBurgerItem([arr])
    }
    


    

    const burger = (arr) => {

        const itemsBurger = arr.filter(item => !item.type === 'sauce').map(item => {

            return(
                <section className={styles.column1} key={+item.id}>
                <div className={styles.ingridient}>
                    <div className={styles.counterColumn}>
                        <div className={styles.counterText}>
                            <div className={styles.roundedText}>1</div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.illustration}>
                            <img src={item.image} alt="" />
                        </div>
                        <div className={styles.price}>
                            <div className={styles.textPrice}>{item.price}</div>
                            <div className={styles.icon}><CurrencyIcon type="primary" /></div>
                        </div>
                        <div className={styles.namePrice}>{item.name}</div>
            
                    </div>
                </div>
            </section>
               
            )
            
        })
            return (
                <>
                {itemsBurger}
                </>
            )

    }  
    const items = burger(burgerItem)
    return (
        <section className={styles.mainColumn}>
            {items}
            {/* <Column1/>
            <Column2/> */}
        </section>

    )
}
 export default MainColumn;