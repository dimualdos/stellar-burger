import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/header';
import BurgerIngredients from '../BurgerIngredients/burger-ingridients';
import BurgerConstructor from '../BurgerConstructor/burger-constructor';
import { getResourse } from '../Utils/burger-api';
import Spinner from '../Spinner/Spinner';

import styles from './app.module.css';


function App() {

  const [ingridients, setIngridients] = useState([]);
  const [loading, setLoading] = useState(true)


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
            <BurgerIngredients data={ingridients} />
            <BurgerConstructor />
          </main>
        </ErrorBoundary>
      )
      }
    </div>


  );
}

export default App;
