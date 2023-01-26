import { Block, Coordinates, Neighbor } from './block';

export class NBlock extends Block {
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
     *      $ _
     *    _ _
     *
     * Position 2:
     *    _
     *    _ $
     *      _
     *
     * Position 3:
     * Position 4:
     */

    switch (position || this.position) {
      /**
       * Position 1:
       *      $ _
       *    _ _
       */
      case 1:
      case 3:
        return [
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block - 1 - left + right,
          },
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block - left + right,
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

      case 2:
      case 4:
        /**  * Position 2:
         *    _
         *    _ $
         *      _
         */
        return [
          {
            row: this.coordinates.row + 1 + down,
            block: this.coordinates.block - left + right,
          },
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
            block: this.coordinates.block - left + right,
          },
        ];

      default:
        return [];
    }
  }
}
