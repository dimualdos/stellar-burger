import { FunctionComponent } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './css/page.module.css';


export const NotFound404: FunctionComponent = () => {

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                <h1 className={styles.heading}>Страница не существует</h1>

                <Link to={{ pathname: `/` }}
                    className={styles.textLinkPerson}>
                    <Button htmlType="button" type="primary" size="medium">
                        Вернуться на главную
                    </Button>
                </Link>
            </div>
        </section>

    )
}