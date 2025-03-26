import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './model/Item';

interface DraggableProps {
  item: Item;
}

const Draggable = ({ item }: DraggableProps) => {
  // useDraggable 훅을 사용하여 드래그 가능한 요소 생성
  // setNodeRef: 이 요소가 드래그 가능하도록 설정하는 ref
  // transform: 현재 드래그 중인 요소의 위치 변환 값 ({ x, y } 형태)
  // listeners: 마우스 또는 터치 이벤트를 감지하여 드래그를 활성화
  // attributes: ARIA 속성(접근성 지원) 자동 적용
  // id: 해당 요소의 고유 ID. 같은 ID를 가진 요소는 여러 개 있으면 안 됨.
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${item.id}-${item.location}`,
  });

  // 드래그 중일 때 요소의 위치를 변환하는 스타일 설정
  // 드래그가 없으면 기본 스타일 유지
  const style = {
    transform: CSS.Transform.toString(transform),
    width: item.type / 2 <= 1 ? '100%' : 'calc(200% + 10px)',
    height: item.type % 2 === 0 ? 'calc(200% + 10px)' : '100%',
  };

  return (
    <>
      {item.location === 0 && (
        <div
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          className="bg-white rounded-20 absolute z-10 top-0 left-0"
        >
          {item.id}
        </div>
      )}
    </>
  );
};

export default Draggable;
