import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { collision } from './util/Collision';
import { Block, TetrisElement } from './model/Block';
import { keybindings } from './util/Keypresses';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  unsubscribe?: Function;
  currentBlock = new Block('S');
  tetronimoTypes = ['_L', 'L', 'N', 'P', 'S', 'T', 'Z'];

  allBlocks: TetrisElement[][] = new Array(22).fill('').map((_, i) => {
    return i === 0 || i === 21
      ? new Array(12).fill({ tetrisElement: 'wall' })
      : new Array(12)
          .fill({ tetrisElement: 'empty' })
          .fill({ tetrisElement: 'wall' }, 0, 1)
          .fill({ tetrisElement: 'wall' }, 11);
  });

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.unsubscribe = this.renderer.listen(
      'document',
      'keypress',
      ({ code }: KeyboardEvent) => {
        if (keybindings[code] === 'slam') {
          while (this.currentBlock.lockCounter < 3) {
            this.userAction('down');
          }
        }
        this.userAction(keybindings[code]);
      }
    );
  }

  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }

  userAction(direction: string) {
    this.currentBlock.lockCounter === 3
      ? this.generateTetronimo()
      : this.moveTetronimo(direction);
  }

  generateTetronimo() {
    this.clearFilledRows();
    this.currentBlock = new Block(
      this.tetronimoTypes[Math.floor(Math.random() * 7)]
    );
    this.draw();
  }

  moveTetronimo(direction: string) {
    this.removeTiles();
    if (collision(this.currentBlock, this.allBlocks, direction))
      this.currentBlock.action(direction);
    this.draw();
  }

  clearFilledRows() {
    const currentRow = this.currentBlock.coordinates.row;
    let currentRows = [];

    for (let i = -2; i <= 2; i++) {
      currentRows.push(currentRow + i);
    }

    currentRows.forEach((row) => {
      if (
        row >= 0 &&
        row <= 20 &&
        this.allBlocks[row].every(
          (element) => element.tetrisElement !== 'empty'
        )
      ) {
        this.allBlocks.splice(row, 1);
        this.allBlocks.splice(
          1,
          0,
          new Array(12)
            .fill({ tetrisElement: 'empty' })
            .fill({ tetrisElement: 'wall' }, 0, 1)
            .fill({ tetrisElement: 'wall' }, 11)
        );
      }
    });
  }

  draw() {
    const arr = this.currentBlock.getTiles();

    arr.forEach((block) => {
      this.allBlocks[block.row][block.block] = {
        tetrisElement: this.currentBlock.type,
      };
    });
  }

  removeTiles() {
    const currentTiles = this.currentBlock.getTiles();

    currentTiles.forEach((tile) => {
      this.allBlocks[tile.row][tile.block] = { tetrisElement: 'empty' };
    });
  }
}
