import { Block, Coordinates, Neighbor } from './block';

export class SBlock extends Block {
  constructor(type: string) {
    super(type);
  }

  getTiles(
    { down = 0, left = 0, right = 0, position }: Neighbor = {
      down: 0,
      left: 0,
      right: 0,
    }
  ): Coordinates[] {
    return [
      {
        row: this.coordinates.row - 1 + down,
        block: this.coordinates.block - 1 - left + right,
      },
      {
        row: this.coordinates.row - 1 + down,
        block: this.coordinates.block - left + right,
      },
      {
        row: this.coordinates.row + down,
        block: this.coordinates.block - 1 - left + right,
      },
      {
        row: this.coordinates.row + down,
        block: this.coordinates.block - left + right,
      },
    ];
  }
}
