export interface TetrisElement {
  tetrisElement: string;
}

export interface Coordinates {
  row: number;
  block: number;
}

export interface Neighbor {
  down?: number;
  right?: number;
  left?: number;
  position?: number;
}

export class Block {
  coordinates: Coordinates = { row: 2, block: 6 };
  lockCounter = 0;
  position = 1;

  constructor(public type: string) {}

  action(direction: string) {
    switch (direction) {
      case 'left':
        this.coordinates.block--;
        break;

      case 'right':
        this.coordinates.block++;
        break;

      case 'down':
        this.coordinates.row++;
        break;

      case 'up':
        this.coordinates.row--;
        break;

      case 'clockwise':
        this.position === 4 ? (this.position = 1) : this.position++;
        break;

      case 'counterclockwise':
        this.position === 1 ? (this.position = 4) : this.position--;
        break;

      default:
        this.coordinates.row++;
        break;
    }
  }

  getTiles(
    { down = 0, left = 0, right = 0, position }: Neighbor = {
      down: 0,
      left: 0,
      right: 0,
    }
  ): Coordinates[] {
    if (this.type === '_L') {
      /**
       * Position 1:
       *  _
       *  _  $  _
       *
       *
       * Position 2:
       *     _ _
       *     $
       *     |
       *
       *  Position 3:
       *    _  $  _
       *          |
       *
       *
       * Position 4:
       *      |
       *      $
       *    _ _
       *
       */

      switch (position || this.position) {
        /**  Position 1:
         *  _
         *  _  $  _
         *
         */
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
              block: this.coordinates.block + 1 - left + right,
            },
            {
              row: this.coordinates.row + down,
              block: this.coordinates.block - left + right,
            },
          ];

        case 2:
          /**  Position 2:
           *     _ _
           *     $
           *     |
           *
           */
          return [
            {
              row: this.coordinates.row - 1 + down,
              block: this.coordinates.block + 1 - left + right,
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

        /**  Position 3:
         *  _  $  _
         *        |
         *
         * */
        case 3:
          return [
            {
              row: this.coordinates.row + 1 + down,
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

        /** Position 4:
         *      |
         *      $
         *    _ _
         *
         */
        case 4:
          return [
            {
              row: this.coordinates.row + 1 + down,
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
    } else if (this.type === 'L') {
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
    } else if (this.type === 'N') {
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
    } else if (this.type === 'P') {
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
    } else if (this.type === 'S') {
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
    } else if (this.type === 'T') {
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
    } else {
      /**
       * Position 1:
       *    _ $
       *      _ _
       *
       * Position 2:
       *      _
       *    _ $
       *    _
       *
       * Position 3:
       * Position 4:
       */

      switch (position || this.position) {
        /**
         * Position 1:
         *    _ $
         *      _ _
         */
        case 1:
        case 3:
          return [
            {
              row: this.coordinates.row + 1 + down,
              block: this.coordinates.block + 1 - left + right,
            },
            {
              row: this.coordinates.row + 1 + down,
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

        case 2:
        case 4:
          /**
           * Position 2:
           *      _
           *    _ $
           *    _
           */
          return [
            {
              row: this.coordinates.row + 1 + down,
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

        default:
          return [];
      }
    }
  }
}
