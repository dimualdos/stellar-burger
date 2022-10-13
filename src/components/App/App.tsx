import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/header';
import BurgerIngredients from '../BurgerIngredients/burger-ingridients';
import BurgerConstructor from '../BurgerConstructor/burger-constructor';


import styles from './app.module.css';
let _url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [state, setState] = useState([]);

  useEffect(() => {
    fetch(_url)
      .then(res => res.json())
      .then(data => {
        //console.log(data.data)
        setState(data.data)
      })
      .catch(error => console.error(error))
  }, [])

  const data = [...state];

  return (
    <div className={styles.page}>
      <AppHeader />
      <ErrorBoundary>
        <section className={styles.mainApp1}>
          {data && <BurgerIngredients data={data} />}
          <BurgerConstructor />
        </section>
      </ErrorBoundary>

    </div>
  );
}

export default App;
