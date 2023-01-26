import { Block, Coordinates, Neighbor } from './block';

export class TBlock extends Block {
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
    /**
     * Position 1:
     *      _
     *    _ _ _
     *
     *
     * Position 2:
     *    |
     *    | |
     *    |
     *
     * Position 3:
     *    _ _ _
     *      _
     *
     * Position 4:
     *      |
     *    | |
     *      |
     */

    switch (position || this.position) {
      // Position 1:
      //      _
      //    _ _ $
      //
      //$ is the selected tile
      case 1:
        return [
          {
            row: this.coordinates.row - 1 + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - 2 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - left + right,
          },
        ];

      case 2:
        // Position 2:
        //    |
        //    | $
        //    |
        return [
          {
            row: this.coordinates.row - 1 + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - left + right,
          },
        ];

      // Position 3:
      //    _ _ $
      //      _
      //
      case 3:
        return [
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - 2 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - left + right,
          },
        ];

      // Position 4:
      //      |
      //    | $
      //      |
      case 4:
        return [
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - 2 - left + right,
          },
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row - 1 + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - 1 - left + right,
          },
        ];

      default:
        return [];
    }
  }
}
