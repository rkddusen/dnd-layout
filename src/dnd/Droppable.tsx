import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableProps {
  children: ReactNode;
}

const Droppable = ({ children }: DroppableProps) => {
  // useDroppable 훅을 사용하여 드랍 가능한 영역을 설정
  // isOver: 사용자가 드래그한 요소가 드랍 가능한 영역 위에 있을 때 true로 변경
  // setNodeRef: 이 요소가 드랍 가능하도록 설정하는 ref
  // id: 드랍 영역의 고유 ID (드래그된 요소가 이 ID를 가진 곳으로 드랍 가능)
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  // 드랍 영역 위에 드래그된 요소가 올라와 있을 때 색상을 변경
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    // 드랍 가능한 영역을 설정하는 div
    <div ref={setNodeRef} style={style} className="absolute top-2 left-2">
      {children}
    </div>
  );
};

export default Droppable;
