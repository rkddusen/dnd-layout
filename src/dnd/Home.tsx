import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Droppable from './Droppable';
import Draggable from './Draggable';

const Home = () => {
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const handleDragEnd = (event: DragEndEvent): void => {
    if (event.over?.id === 'droppable') {
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

export default Home;
