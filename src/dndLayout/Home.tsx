import { useState } from 'react';
import { DndContext, DragOverEvent } from '@dnd-kit/core';

import Droppable from './Droppable';
import Draggable from './Draggable';
import { Item } from './model/Item';

const InitialItems: Item[][] = [
  [
    { id: 0, type: 1, location: 0 },
    { id: 3, type: 1, location: 0 },
    { id: 4, type: 3, location: 0 },
  ],
  [
    { id: 1, type: 4, location: 0 },
    { id: 1, type: 4, location: 2 },
    { id: 4, type: 3, location: 1 },
  ],
  [
    { id: 1, type: 4, location: 1 },
    { id: 1, type: 4, location: 3 },
    { id: 5, type: 1, location: 0 },
  ],
  [
    { id: 2, type: 1, location: 0 },
    { id: 6, type: 2, location: 0 },
    { id: 6, type: 2, location: 2 },
  ],
];

const Home = () => {
  const [itemsArr, setItemsArr] = useState<(Item | null)[][]>(InitialItems);
  const handleDragOver = (event: DragOverEvent): void => {
    const { active, over } = event;

    if (!over) return;
    let r1 = -1,
      c1 = -1;
    for (let i = 0; i < itemsArr.length; i++) {
      for (let j = 0; j < itemsArr[i].length; j++) {
        if (
          itemsArr[i][j]?.id === active.id.toString().split('-').map(Number)[0]
        ) {
          [c1, r1] = [i, j]; // r1, c1은 항상 동일 블록 내 왼쪽 상단
          break;
        }
      }
      if (r1 !== -1 && c1 !== -1) break;
    }
    if (r1 === -1 || c1 === -1) return;

    let [c2, r2] = over.id.toString().split('-').map(Number);
    if (
      itemsArr[c2 - 1] &&
      itemsArr[c2 - 1][r2 - 1] &&
      itemsArr[c2 - 1][r2 - 1]?.id === itemsArr[c2][r2]?.id
    ) {
      [c2, r2] = [c2 - 1, r2 - 1];
    } else if (
      itemsArr[c2][r2 - 1] &&
      itemsArr[c2][r2 - 1]?.id === itemsArr[c2][r2]?.id
    ) {
      r2 = r2 - 1;
    } else if (
      itemsArr[c2 - 1] &&
      itemsArr[c2 - 1][r2] &&
      itemsArr[c2 - 1][r2]?.id === itemsArr[c2][r2]?.id
    ) {
      c2 = c2 - 1;
    }
    console.log(r1, c1, r2, c2);

    setItemsArr((prev) => {
      const newArr = prev.map((row) => [...row]); // 깊은 복사

      const itemToMove = newArr[c1][r1]; // 이동할 아이템
      if (!itemToMove) return newArr;
      newArr[c1].splice(r1, 1, null); // 기존 위치에서 제거
      // 1*1
      if (itemToMove.type === 1) {
        // over된 row의 모든 column에 null 삽입
        for (let i = 0; i < itemsArr.length; i++) {
          if (Math.floor(itemsArr[i][r1]?.location ?? -1) / 2 === 0)
            newArr[i].splice(r1, 0, null);
          else newArr[i].splice(r1 + 1, 0, null);
        }
        // 새 위치에 삽입
        newArr[c2].splice(r2, 1, itemToMove);
      }
      // 1*2
      else if (itemToMove.type === 2) {
        // 같이 이동하는 블록 제거
        newArr[c1].splice(r1 + 1, 1, null);

        // over된 row의 모든 column에 null 삽입
        for (let i = 0; i < itemsArr.length; i++) {
          newArr[i].splice(r1, 0, null);
          newArr[i].splice(r1, 0, null);
        }
        // 새 위치에 삽입
        newArr[c2].splice(r2, 1, itemToMove);
        newArr[c2].splice(r2 + 1, 1, { ...itemToMove, location: 2 });
      }
      // 2*1
      else if (itemToMove.type === 3) {
        // 마지막 column은 이동 못함
        if (c2 === itemsArr.length - 1) return newArr;

        // 같이 이동하는 블록 제거
        newArr[c1 + 1].splice(r1, 1, null);

        // over된 row의 모든 column에 null 삽입
        for (let i = 0; i < itemsArr.length; i++) {
          newArr[i].splice(r1, 0, null);
        }
        // 새 위치에 삽입
        newArr[c2].splice(r2, 1, itemToMove);
        newArr[c2 + 1].splice(r2, 1, { ...itemToMove, location: 1 });
      }
      // 2*2
      else {
        // 마지막 column은 이동 못함
        if (c2 === itemsArr.length - 1) return newArr;

        // 같이 이동하는 블록 제거
        newArr[c1 + 1].splice(r1, 1, null);
        newArr[c1].splice(r1 + 1, 1, null);
        newArr[c1 + 1].splice(r1 + 1, 1, null);

        // over된 row의 모든 column에 null 삽입
        for (let i = 0; i < itemsArr.length; i++) {
          newArr[i].splice(r1, 0, null);
          newArr[i].splice(r1, 0, null);
        }
        // 새 위치에 삽입
        newArr[c2].splice(r2, 1, itemToMove);
        newArr[c2 + 1].splice(r2, 1, { ...itemToMove, location: 1 });
        newArr[c2].splice(r2 + 1, 1, { ...itemToMove, location: 2 });
        newArr[c2 + 1].splice(r2 + 1, 1, { ...itemToMove, location: 3 });
      }

      return newArr;
    });
  };
  return (
    <DndContext onDragOver={handleDragOver}>
      <div className="flex gap-10">
        {itemsArr.map((items, i) => (
          <div key={i} className="flex flex-col gap-10">
            {items.map((v, i2) => (
              <div key={i2} className="w-200 h-200 relative">
                <Droppable id={`${i}-${i2}`} item={v} />
                {v && <Draggable item={v}></Draggable>}
              </div>
            ))}
            <div className="w-200 h-200 relative">
              <Droppable id={`${i}-${items.length}`} item={null} />
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default Home;
