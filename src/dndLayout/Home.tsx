import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  verticalListSortingStrategy,
  SortableContext,
  arrayMove,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { useState } from 'react';

const initialItems = [
  'Item1',
  'Item2',
  'Item3',
  'Item4',
  'Item5',
  'Item6',
  'Item7',
  'Item8',
  'Item9',
];

const Home = () => {
  const sensors = useSensors(useSensor(MouseSensor)); // 마우스 드래그만 허용
  const [items, setItems] = useState<string[]>(initialItems);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return; // over이 null일 수 있음
    if (active.id !== over.id) {
      // 리스트 순서 변경
      setItems((prev) => {
        const oldIdx = prev.indexOf(active.id.toString());
        const newIdx = prev.indexOf(over.id.toString());
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-column gap-10">
          {items.map((v) => (
            <SortableItem key={v} id={v} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default Home;
