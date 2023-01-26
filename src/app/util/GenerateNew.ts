import {
  LBlock,
  NBlock,
  PBlock,
  SBlock,
  TBlock,
  ZBlock,
  _LBlock,
} from '../model';

export const generateNew = () => {
  switch (Math.floor(Math.random() * 7 + 1)) {
    case 1:
      return new TBlock('T');

    case 2:
      return new SBlock('S');

    case 3:
      return new LBlock('L');

    case 4:
      return new _LBlock('_L');

    case 5:
      return new PBlock('P');

    case 6:
      return new NBlock('N');

    case 7:
      return new ZBlock('Z');

    default:
      return new TBlock('T');
  }
};
