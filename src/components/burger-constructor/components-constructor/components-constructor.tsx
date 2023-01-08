import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useDrop, useDrag, XYCoord } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER } from '../../../services/constants/constructor-constant';
import styles from './components-constructor.module.css';


type TCardProps = {
  item: any;
  index: number;
}

const ComponentsContructor: FC<TCardProps> = ({ item, index }) => {

  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ['sort_ingredient'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(dragItem: any, monitor) {
      if (!ref.current) {
        return;
      }
      console.log(dragItem)
      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: CONSTRUCTOR_REORDER,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      });
      dragItem.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'sort_ingredient',
    item: () => ({ item, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e: { preventDefault: () => void; }) => e.preventDefault();

  return (
    <div className={styles.constructorCenterElem}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
      onDrop={preventDefault}
    >
      <div className={styles.constructorIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() =>
          dispatch({
            type: CONSTRUCTOR_DELETE,
            payload: index,
          })
        }
      />
    </div>
  )
}

export default ComponentsContructor;
