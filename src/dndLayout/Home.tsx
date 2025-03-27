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

    const [c2, r2] = over.id.toString().split('-').map(Number);

    setItemsArr((prev) => {
      const newArr = prev.map((row) =>
        row.map((item) => (item ? { ...item } : item)),
      );

      const itemToMove = newArr[c1][r1]; // 이동할 아이템
      if (!itemToMove) return newArr;
      newArr[c1].splice(r1, 1, null); // 기존 위치에서 제거
      // 1*1
      if (itemToMove.type === 1) {
        // over된 row의 모든 column에 null 삽입
        for (let i = 0; i < newArr.length; i++) {
          if (Math.floor((newArr[i][r1]?.location ?? -1) / 2) === 0) {
            newArr[i].splice(r1, 0, null);
          } else newArr[i].splice(r1 + 1, 0, null);
        }
        // 새 위치에 삽입
        newArr[c2].splice(r2, 1, itemToMove);
      }
      // 1*2
      else if (itemToMove.type === 2) {
        // 같이 이동하는 블록 제거
        newArr[c1].splice(r1 + 1, 1, null);

        // over된 row의 모든 column에 null 삽입
        for (let i = 0; i < newArr.length; i++) {
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
        if (c2 === newArr.length - 1) return newArr;

        // 같이 이동하는 블록 제거
        newArr[c1 + 1].splice(r1, 1, null);

        // over된 row의 모든 column에 null 삽입
        for (let i = 0; i < newArr.length; i++) {
          newArr[i].splice(r1, 0, null);
        }
        // 새 위치에 삽입
        newArr[c2].splice(r2, 1, itemToMove);
        newArr[c2 + 1].splice(r2, 1, { ...itemToMove, location: 1 });
      }
      // 2*2
      else {
        // 마지막 column은 이동 못함
        if (c2 === newArr.length - 1) return newArr;

        // 같이 이동하는 블록 제거
        newArr[c1 + 1].splice(r1, 1, null);
        newArr[c1].splice(r1 + 1, 1, null);
        newArr[c1 + 1].splice(r1 + 1, 1, null);

        // over된 row의 모든 column에 null 삽입
        for (let i = 0; i < newArr.length; i++) {
          newArr[i].splice(r1, 0, null);
          newArr[i].splice(r1, 0, null);
        }
        // 새 위치에 삽입
        newArr[c2].splice(r2, 1, itemToMove);
        newArr[c2 + 1].splice(r2, 1, { ...itemToMove, location: 1 });
        newArr[c2].splice(r2 + 1, 1, { ...itemToMove, location: 2 });
        newArr[c2 + 1].splice(r2 + 1, 1, { ...itemToMove, location: 3 });
      }

      // 채울 수 있는 null 채우기
      const moveUp = (): void => {
        let line = 1;
        while (line < 10) {
          let exist = false;
          for (let i = 0; i < newArr.length; i++) {
            if (line < newArr[i].length) {
              exist = true;
              const nowType = newArr[i][line]?.type;
              const nowLoction = newArr[i][line]?.location;
              // 1*1, 1*2
              if (nowType === 1 || (nowType === 2 && nowLoction === 0)) {
                let _line = line - 1;
                while (_line >= 0 && !newArr[i][_line]) {
                  _line--;
                }
                if (_line < line - 1) {
                  newArr[i][_line + 1] = newArr[i][line];
                  newArr[i][line] = null;
                  if (nowType === 2) {
                    newArr[i][_line + 2] = newArr[i][line + 1];
                    newArr[i][line + 1] = null;
                  }
                }
              }
              // 2*1, 2*2
              else if (
                (nowType === 3 && nowLoction === 0) ||
                (nowType === 4 && nowLoction === 0)
              ) {
                let _line = line - 1;
                while (
                  _line >= 0 &&
                  !newArr[i][_line] &&
                  !newArr[i + 1][_line]
                ) {
                  _line--;
                }

                if (_line < line - 1) {
                  newArr[i][_line + 1] = newArr[i][line];
                  newArr[i][line] = null;
                  newArr[i + 1][_line + 1] = newArr[i + 1][line];
                  newArr[i + 1][line] = null;
                  if (nowType === 4) {
                    newArr[i][_line + 2] = newArr[i][line + 1];
                    newArr[i][line + 1] = null;
                    newArr[i + 1][_line + 2] = newArr[i + 1][line + 1];
                    newArr[i + 1][line + 1] = null;
                  }
                }
              }
            }
          }
          if (!exist) break;
          line++;
        }

        for (let i = 0; i < newArr.length; i++) {
          for (let j = newArr[i].length - 1; j >= 0; j--) {
            if (newArr[i][j] !== null) {
              newArr[i] = newArr[i].slice(0, j + 1);
              break;
            }
          }
        }
      };
      moveUp();

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
