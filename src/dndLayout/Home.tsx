import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
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
  const [activeId, setActiveId] = useState<string | null>(null); // 현재 드래그 중인 아이템 ID

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return; // over이 null일 수 있음
    setActiveId(null);
    if (active.id !== over.id) {
      // 리스트 순서 변경
      setItems((prev) => {
        const oldIdx = prev.indexOf(active.id.toString());
        const newIdx = prev.indexOf(over.id.toString());
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  };
  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-10">
          {items.map((v) => (
            <SortableItem key={v} id={v} isActive={v === activeId} />
          ))}
        </ul>
      </SortableContext>
      {/* 드래그 중일 때 보여줄 오버레이 */}
      <DragOverlay>
        {activeId ? <SortableItem id={activeId} isActive={false} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Home;
