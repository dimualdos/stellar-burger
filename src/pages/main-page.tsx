import { FunctionComponent } from 'react';
import BurgerIngredients from '../components/burger-ingredients/burger-ingridients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './css/page.module.css';

export const MainPage: FunctionComponent = () => {
    return (
        <main className={styles.mainApp1}>
            <ErrorBoundary>
                <DndProvider backend={HTML5Backend} >
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </ErrorBoundary>
        </main>
    )
}