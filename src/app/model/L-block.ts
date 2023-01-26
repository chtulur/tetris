import { Block, Coordinates, Neighbor } from './block';

export class LBlock extends Block {
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
     *        _
     *  _  $  _
     *
     * Position 2:
     *    |
     *    $
     *    | _
     *
     *
     * Position 3:
     *    _  $  _
     *    |
     *
     *
     * Position 4:
     *   _ _
     *     $
     *     _
     *
     */

    switch (position || this.position) {
      /**  Position 1:
       *        _
       *  _  $  _
       *
       */
      case 1:
        return [
          {
            row: this.coordinates.row - 1 + down,
            block: this.coordinates.block + 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block + 1 - left + right,
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

      // Position 2:
      //    |
      //    $
      //    | _
      case 2:
        return [
          {
            row: this.coordinates.row - 1 + down,
            block: this.coordinates.block - left + right,
          },
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block - left + right,
          },
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block + 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - left + right,
          },
        ];

      /** Position 3:
       *  _  $  _
       * |
       *
       *
       */
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
            block: this.coordinates.block + 1 - left + right,
          },
          {
            row: this.coordinates.row + down,
            block: this.coordinates.block - left + right,
          },
        ];

      /**  Position 4:
       *   _ _
       *     $
       *     \
       *
       */
      case 4:
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
            row: this.coordinates.row + 1 + down,
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
