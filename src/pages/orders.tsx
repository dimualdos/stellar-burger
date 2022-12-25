import { FunctionComponent } from 'react';
import { LeftSectionInProfile } from './profile';
import styles from './css/profile.module.css';



export const Orders: FunctionComponent = () => {

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <LeftSectionInProfile />
            </div>
        </section>

    )
}
