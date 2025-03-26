import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import Droppable from './Droppable';
import Draggable from './Draggable';
import { Item } from './model/Item';

const InitialItems: Item[][] = [
  [
    { id: '0', type: 1 },
    { id: '3', type: 1 },
    { id: '4', type: 3 },
  ],
  [
    { id: '1', type: 4 },
    { id: '1', type: 4 },
    { id: '4', type: 3 },
  ],
  [
    { id: '1', type: 4 },
    { id: '1', type: 4 },
    { id: '5', type: 1 },
  ],
  [
    { id: '2', type: 2 },
    { id: '2', type: 2 },
    { id: '6', type: 1 },
  ],
];

const Home = () => {
  const [itemsArr, setItemsArr] = useState<(Item | null)[][]>(InitialItems);

  return (
    <DndContext>
      <div className="flex gap-10">
        {itemsArr.map((items, i) => (
          <div key={i} className="flex flex-col gap-10">
            {items.map((v, i2) => (
              <div key={i2} className="w-200 h-200 relative">
                <Droppable id={`${i}-${i2}`} />
                {v && <Draggable item={v}></Draggable>}
              </div>
            ))}
            <div className="w-200 h-200 relative">
              <Droppable id={`${i}-${items.length}`} />
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default Home;
