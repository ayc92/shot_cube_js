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
    constructor(h, v) {
        this.hPos = h;
        this.vPos = v;
    }
}

function play() {
    let playerPos = new PlayerPosition(4, -1);
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

function moveUser(playerPos, direction) {
    let newPos = playerPos;

    switch (direction) {
        case 'left':
            if (playerPos.hPos === 0) {
                newPos = new PlayerPosition(-1, 0);
            } else if (playerPos.hPos === 7) {
                newPos = new PlayerPosition(-1, 7);
            } else if (playerPos.hPos != -1) {
                newPos = new PlayerPosition(playerPos.hPos - 1, playerPos.vPos);
            }
            break;
        case 'right':
            if (playerPos.hPos === 6) {
                newPos = new PlayerPosition(-1, 7);
            } else if (playerPos.hPos === 13) {
                newPos = new PlayerPosition(-1, 13);
            } else if (playerPos.hPos != -1) {
                newPos = new PlayerPosition(playerPos.hPos + 1, playerPos.vPos);
            }
            break;
        case 'up':
            if (playerPos.vPos === 0) {
                newPos = new PlayerPosition(0, -1);
            } else if (playerPos.vPos === 7) {
                newPos = new PlayerPosition(6, -1);
            } else if (playerPos.vPos != -1) {
                newPos = new PlayerPosition(playerPos.hPos, playerPos.vPos - 1);
            }
            break;
        case 'down':
            if (playerPos.vPos === 6) {
                newPos = new PlayerPosition(7, -1);
            } else if (playerPos.vPos === 13) {
                newPos = new PlayerPosition(13, -1);
            } else if (playerPos.vPos != -1) {
                newPos = new PlayerPosition(playerPos.hPos, playerPos.vPos + 1);
            }
            break;
        default:
            break;
    }

    return newPos;
}

function printBoard(board, playerPos) {
    // convert player position to 9x9 grid
    let trueHPos;
    let trueVPos;
    if (playerPos.vPos === -1) {
        trueVPos = playerPos.hPos <= 6 ? 0 : 8;
        trueHPos = playerPos.hPos % 7 + 1;
    } else if (playerPos.hPos === -1) {
        trueHPos = playerPos.vPos <= 6 ? 0 : 8;
        trueVPos = playerPos.vPos % 7 + 1;
    }

    let buff = ''

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (x === trueHPos && y === trueVPos) {
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
