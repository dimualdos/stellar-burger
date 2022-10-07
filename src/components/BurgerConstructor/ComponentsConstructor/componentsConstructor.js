import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import img from'../../../images/burgerComponent/bun-02.png';

const ComponentsContructor = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
    )
}

export default ComponentsContructor;