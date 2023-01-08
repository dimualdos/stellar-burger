import { FunctionComponent } from "react";
import { ScrollCopmponent } from "../components/scroll-component/scroll-component";
import styles from './css/order-id.module.css';

export const OrderID: FunctionComponent = () => {

    return (
        <section>
            <header>
                <div className={styles.orderID}></div>
                <div className={styles.orderTitle}></div>
                <div className={styles.orderStatus}></div>
            </header>
            <main>
                <div className={styles.headerMain}>
                    Состав:
                </div>
                <ScrollCopmponent >

                </ScrollCopmponent>
            </main>
        </section>
    )
}