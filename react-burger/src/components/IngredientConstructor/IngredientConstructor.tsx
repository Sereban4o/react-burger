import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./IngredientConstructor.module.css";
import { DragEvent, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { TIngredients } from "../../services/utils/data";
import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";
import { removeIngredientsAction } from "../../services/actions/bugrerIngredients";

type TIngredientConstructorProps = {
  item: TIngredients;
  index: number;
  moveItem: Function;
};

function IngredientConstructor({
  item,
  index,
  moveItem,
}: TIngredientConstructorProps) {
  const dispatch = useAppDispatch();

  const { ingredients } = useAppSelector((state) => state.bugrerIngredients);
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (!item) {
        return;
      }

      const dragIndex = (item as any).index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      (item as any).index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (item.type !== "bun") drag(drop(ref));

  const preventDefault = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const opacity = `opacity: ${isDragging ? 0 : 1}`;

  const handleClose = () => {
    const newCards = [...ingredients];
    newCards.splice(index, 1);

    dispatch(
      removeIngredientsAction(newCards) /* {
      type: REMOVE_INGREDIENTS,
      newCards: newCards,
    } */
    );
  };
  return (
    <div
      className={style.burger_item}
      ref={ref}
      onDrop={preventDefault}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
        /* idx={item.dragId} */
      />
    </div>
  );
}

export default IngredientConstructor;
