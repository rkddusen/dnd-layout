import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
}

const SortableItem = ({ id }: SortableItemProps) => {
  // useSortable 훅을 사용하여 정렬된 리스트에서 드래그 앤 드랍 가능한 영역을 설정
  // setNodeRef: 이 요소가 드래그 가능하도록 설정하는 ref
  // transform: 현재 드래그 중인 요소의 위치 변환 값 ({ x, y } 형태)
  // listeners: 마우스 또는 터치 이벤트를 감지하여 드래그를 활성화
  // attributes: ARIA 속성(접근성 지원) 자동 적용
  // id: 해당 요소의 고유 ID. 같은 ID를 가진 요소는 여러 개 있으면 안 됨.
  // 애니메이션을 부드럽게 적용하는 CSS transition 값
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    // 드래그한 요소의 변형(이동) 값을 CSS transform 속성으로 변환하는 역할
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    // 리스트 요소를 드래그 가능하게 설정
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="focus-visible:outline-none"
    >
      {id}
    </li>
  );
};

export default SortableItem;
