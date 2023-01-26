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
}
