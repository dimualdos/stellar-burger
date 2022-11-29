import ErrorBoundary from '../error-boundary/ErrorBoundary';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from '../app-header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


import styles from './app.module.css';

function App() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <ErrorBoundary>
        <main className={styles.mainApp1}>
          <DndProvider backend={HTML5Backend} >
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </ErrorBoundary>
    </div>
  );
}


// function App() {

//   const [ingridients, setIngridients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalPrice, setTotalPrice] = useState(0);
//   useEffect(() => {
//     getResourse()
//       .then(setIngridients)
//       .catch(error => console.error(error))
//       .finally(() => setLoading(false))
//   }, [])

//   return (
//     <div className={styles.page}>
//       <AppHeader />
//       {loading ? (<Spinner />) : (
//         <ErrorBoundary>
//           <main className={styles.mainApp1}>
//             <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
//               <BurgerContext.Provider value={ingridients}>
//                 <BurgerIngredients />
//                 <BurgerConstructor />
//               </BurgerContext.Provider>
//             </TotalPriceContext.Provider>
//           </main>
//         </ErrorBoundary>
//       )
//       }
//     </div>


//   );
// }

export default App;
