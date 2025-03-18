import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

export const App = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>{isDropped ? draggableMarkup : 'Drop here'}</Droppable>
    </DndContext>
  );
};
