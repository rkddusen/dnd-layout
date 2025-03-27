import { useDroppable } from '@dnd-kit/core';
import { Item } from './model/Item';

interface DroppableProps {
  id: string;
  item: Item | null;
}

const Droppable = ({ id, item }: DroppableProps) => {
  // useDroppable 훅을 사용하여 드랍 가능한 영역을 설정
  // isOver: 사용자가 드래그한 요소가 드랍 가능한 영역 위에 있을 때 true로 변경
  // setNodeRef: 이 요소가 드랍 가능하도록 설정하는 ref
  // id: 드랍 영역의 고유 ID (드래그된 요소가 이 ID를 가진 곳으로 드랍 가능)
  const { setNodeRef } = useDroppable({
    id,
  });

  const style = {
    height: '100%',
    width:
      item && item.type / 2 > 1 && item.location === 0
        ? 'calc(200% + 10px)'
        : '100%',
    // height:
    //   item && item.type % 2 === 0 && item.location === 0
    //     ? 'calc(200% + 10px)'
    //     : '100%',
  };

  return (
    <>
      {(!item || item?.location === 0 || item?.location === 1) && (
        // 드랍 가능한 영역을 설정하는 div
        <div
          ref={setNodeRef}
          style={style}
          className="rounded-20 absolute z-0"
        ></div>
      )}
    </>
  );
};

export default Droppable;
