import { useDraggable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DraggableProps {
  children: ReactNode;
}

export const Draggable = ({ children }: DraggableProps) => {
  // useDraggable 훅을 사용하여 드래그 가능한 요소 생성
  // setNodeRef: 이 요소가 드래그 가능하도록 설정하는 ref
  // transform: 현재 드래그 중인 요소의 위치 변환 값 ({ x, y } 형태)
  // listeners: 마우스 또는 터치 이벤트를 감지하여 드래그를 활성화
  // attributes: ARIA 속성(접근성 지원) 자동 적용
  // id: 해당 요소의 고유 ID. 같은 ID를 가진 요소는 여러 개 있으면 안 됨.
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });

  // 드래그 중일 때 요소의 위치를 변환하는 스타일 설정
  // 드래그가 없으면 기본 스타일 유지
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    // 버튼 요소를 드래그 가능하게 설정
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};
