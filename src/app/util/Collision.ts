import { Block } from './../model/Block';
import { TetrisElement } from '../model/Block';
import { Coordinates } from '../model/Block';

export const collision = (
  currentBlock: Block,
  allBlocks: TetrisElement[][],
  direction: string
): boolean => {
  let currentTiles: Coordinates[];

  switch (direction) {
    case 'down':
      currentTiles = currentBlock.getTiles({ down: 1 });
      break;

    case 'left':
      currentTiles = currentBlock.getTiles({ left: 1 });
      break;

    case 'right':
      currentTiles = currentBlock.getTiles({ right: 1 });
      break;

    case 'clockwise':
      currentTiles = currentBlock.getTiles({
        position: currentBlock.position === 4 ? 1 : currentBlock.position + 1,
      });
      break;

    case 'counterclockwise':
      currentTiles = currentBlock.getTiles({
        position: currentBlock.position === 1 ? 4 : currentBlock.position - 1,
      });
      break;

    default:
      currentTiles = currentBlock.getTiles({ down: 1 });
      break;
  }

  return isPathClear(allBlocks, currentBlock, currentTiles, direction);
};

const isPathClear = (
  allBlocks: TetrisElement[][],
  currentBlock: Block,
  currentTiles: Coordinates[],
  direction: string
) => {
  let isOccupied: boolean = false;

  currentTiles.forEach((tile) => {
    if (allBlocks[tile.row][tile.block].tetrisElement !== 'empty') {
      isOccupied = true;
    }
  });

  if (isOccupied && direction === 'down') {
    currentBlock.lockCounter++;
  }

  return !isOccupied;
};
