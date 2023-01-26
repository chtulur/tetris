import { Block, Coordinates, Neighbor } from './block';

export class PBlock extends Block {
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
    switch (position || this.position) {
      case 1:
      case 3:
        return [
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block + 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - 2 - left + right,
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

      case 2:
      case 4:
        return [
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block - left + right,
          },
          {
            row: this.coordinates.row - 2 + down,
            block: this.coordinates.block - left + right,
          },
          {
            row: this.coordinates.row - 1 + down,
            block: this.coordinates.block - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - left + right,
          },
        ];

      default:
        return [];
    }
  }
}
