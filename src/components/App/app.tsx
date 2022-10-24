import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/header';
import BurgerIngredients from '../BurgerIngredients/burger-ingridients';
import BurgerConstructor from '../BurgerConstructor/burger-constructor';
import { getResourse } from '../Utils/burger-api';
import Spinner from '../Spinner/Spinner';
import { BurgerContext } from '../Services/burger-context';
import { TotalPriceContext } from '../Services/burger-context';
import styles from './app.module.css';

function App() {

  const [ingridients, setIngridients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getResourse()
      .then(setIngridients)
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.page}>
      <AppHeader />
      {loading ? (<Spinner />) : (
        <ErrorBoundary>
          <main className={styles.mainApp1}>
            <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
              <BurgerContext.Provider value={ingridients}>
                <BurgerIngredients />
                <BurgerConstructor />
              </BurgerContext.Provider>
            </TotalPriceContext.Provider>
          </main>
        </ErrorBoundary>
      )
      }
    </div>


  );
}

export default App;
