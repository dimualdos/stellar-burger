import { useState, useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerService from '../../../Utils/burgerService';
import styles from './columnSauses.module.css';

const ColumnSauses = () => {

    const [sauseItem, setSauseItem] = useState([]);

    useEffect(() => {
        onrequest()
    }, [])


    const sauceServise = new BurgerService();
    const onrequest = () => {
        sauceServise.getMenu('http://localhost:3000/menu')
            .then(data => onSauceLoading(data))
            .catch(data => console.log(data))
    }

    const onSauceLoading = (arr) => {
        setSauseItem([...arr])
    }

    const sause = (arr) => {
        //console.log(arr)
        const itemsSause = arr.filter((item) => item.type !== 'bun' && item.type !== 'main').map((item, i) => {

            return (
                
                    <div className={styles.sausesItem}key={i}>
                        <div className={styles.sauseCounter}>
                            <div className={styles.sauseText}>
                                <div className={styles.SauseRoundedText}>1</div>
                            </div>
                        </div>
                        <div className={styles.sauseContent}>
                            <div className={styles.sauseImage}>
                                <img src={item.image} alt="" />
                            </div>
                            <div className={styles.sausePriceBox}>
                                <div className={styles.sausePriceText}>{item.price}</div>
                                <div className={styles.sauseIcon}><CurrencyIcon type="primary" /></div>
                            </div>
                            <div className={styles.sauseNamePriceText}><span className={styles.sauseInnerText}>{item.name}</span> </div>

                        </div>
                    </div>
               

            )

        })
        return (
            <div className={styles.columnSauses}>
                {itemsSause}
            </div>
        )

    }
    const items = sause(sauseItem)

    return (
        <section className={styles.mainColumnSauses}>
                {items}
        </section>
    )
}

export default ColumnSauses;