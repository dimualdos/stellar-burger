import { useState, useEffect } from 'react';
import BurgerService from '../../../Utils/burgerService';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './columnBurger.module.css';




const BurgerColumn = () => {
    const [burgerItem, setBurgerItem] = useState([]);

    useEffect(() => {
        onrequest()
    }, [])




    const burgerservise = new BurgerService();

    //onCharLoading();
    const onrequest = () => {
        burgerservise.getMenu('http://localhost:3000/menu')
            .then(data => onBurgerLoading(data))
            .catch(data => console.log(data))
    }


    const onBurgerLoading = (arr) => {
        setBurgerItem([...arr])
    }

    const burger = (arr) => {
        //console.log(arr)
        const itemsBurger = arr.filter((item) => item.type !== 'sauce' && item.type !== 'main').map((item, i) => {

            return (
                <div className={styles.column1} key={i}>
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
                </div>

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

        </section>

    )
}
export default BurgerColumn;