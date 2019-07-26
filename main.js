/**
 *      00 01 02 03 04 05 06
 *   00 BOARD HERE           07
 *   01                      08
 *   02                      ...
 *   03
 *  ...                      13
 *      07 08 09 10 11 12 13
 *
 */

class PlayerPosition {
    constructor() {
        this.hPos = 0;
        this.yPos = -1;
    }
}

function play() {
    let playerPos = new PlayerPosition();
    let board = [
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
    ];
    printBoard(board, playerPos);
}

function move() {
    
}

function printBoard(board, playerPos) {
    // adjust player position to be in 9x9 grid
    let trueHPos = playerPos.hPos + 1;
    let trueYPos = playerPos.yPos + 1;

    let buff = ''

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (x === trueHPos && y === trueYPos) {
                buff += ' X ';
            } else if (x % 8 === 0 || y % 8 === 0) {
                buff += '   ';
            } else {
                // adjust indexes to be in 7x7 grid in order to access board
                let boardX = x - 1;
                let boardY = y - 1;
                if (board[boardY][boardX] > 0) {
                    buff += ' # ';
                } else {
                    buff += '[ ]';
                }
            }
        }
        if (y < 8) {
            buff += '\n';
        }
    }

    console.log(buff);
}

play();
