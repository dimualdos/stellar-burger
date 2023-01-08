
import { FC, ReactNode } from "react";
import styles from './scroll-component.module.css';

type TScroll = {

    children: ReactNode;
}

export const ScrollCopmponent: FC<TScroll> = ({ children }) => {
    return (
        <section className={styles.scrollDiv}>
            {children}
        </section>
    )
}
