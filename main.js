const readline = require('readline');
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
        this.hPos = v;
        this.vPos = h;
    }
}

function play() {
    let playerPos = new PlayerPosition(3, -1);
    let board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];

    process.stdout.write("\u001B[2J\u001B[0;0f");


    printBoard(board, playerPos);
    console.log('arrow keys to move, space to shoot, r to reset, ctrl+c to exit :)');

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (['right', 'left', 'up', 'down'].includes(key.name)) {
            moveUser(playerPos, key.name);
        } else if (key.name == 'space'){
            board = move(playerPos, board);
        } else if (key.name == 'r') {
            board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ];
        } else if (key.ctrl && key.name === 'c') {
            process.exit();
        }
        process.stdout.write("\u001B[2J\u001B[0;0f");
        printBoard(board, playerPos);
        console.log(checkBoard(board));
    });
}

/**
 * takes a playerPos and the active board and outputs the state of
 * the board after the move occurs (if possible)
 */
function move(playerPos, initialBoard) {
    let isOnHorizontalRow = (playerPos.vPos == -1);
    if (isOnHorizontalRow) {
        let isOnTopRow = (Math.floor(playerPos.hPos / 7) == 0);
        let activeColumn = playerPos.hPos % 7;
        if (initialBoard[isOnTopRow?0:6][activeColumn]) {
            let columnArray = initialBoard.map((row) => (row[activeColumn]))
            if (!isOnTopRow) {
                columnArray = columnArray.reverse();
            }
            if (!columnArray[0]) {
                return initialBoard;
            }
            let numToMove = 1;
            while (true) {
                if (columnArray[numToMove]) {
                    numToMove += 1;
                } else {
                    break;
                }
            }
            let columnCleared = false;
            let stopPoint = numToMove;
            while (true) {
                if (columnArray[stopPoint] == 0) {
                    stopPoint += 1;
                } else {
                    break;
                }
                if (stopPoint < 0 || stopPoint > 6) {
                    columnCleared = true;
                    break;
                }
            }
            let newColumn = columnArray;
            if (columnCleared) {
                newColumn = [0,0,0,0,0,0,0];
            } else {
                let slice = newColumn.slice(0, stopPoint)
                Array.prototype.splice.apply(slice, [0,0,...(new Array(stopPoint-1)).fill(0)])
                slice = slice.slice(0, stopPoint)
                Array.prototype.splice.apply(newColumn, [0, stopPoint, ...slice])
            }
            if (!isOnTopRow) { 
                newColumn = newColumn.reverse();
            }
            return initialBoard.map((row, i) => {
                row.splice(activeColumn, 1, newColumn[i]);
                return row;
            });
        }
        return initialBoard;
    } else {
        let isOnLeftColumn = (Math.floor(playerPos.vPos / 7) == 0);
        let activeRow = playerPos.vPos % 7;
        if (initialBoard[activeRow][isOnLeftColumn?0:6]) {
            let rowArray = initialBoard[activeRow]
            if (!isOnLeftColumn) {
                rowArray = rowArray.reverse();
            }
            if (!rowArray[0]) {
                return initialBoard;
            }
            let numToMove = 1;
            while (true) {
                if (rowArray[numToMove]) {
                    numToMove += 1;
                } else {
                    break;
                }
            }
            let rowCleared = false;
            let stopPoint = numToMove;
            while (true) {
                if (rowArray[stopPoint] == 0) {
                    stopPoint += 1;
                } else {
                    break;
                }
                if (stopPoint < 0 || stopPoint > 6) {
                    rowCleared = true;
                    break;
                }
            }
            let newRow = rowArray;
            if (rowCleared) {
                newRow = [0,0,0,0,0,0,0];
            } else {
                let slice = newRow.slice(0, stopPoint)
                Array.prototype.splice.apply(slice, [0,0,...(new Array(stopPoint-1)).fill(0)])
                slice = slice.slice(0, stopPoint)
                Array.prototype.splice.apply(newRow, [0, stopPoint, ...slice])
            }
            if (!isOnLeftColumn) { 
                newRow = newRow.reverse();
            }
            initialBoard.splice(activeRow, 1, newRow);
            return initialBoard;
        }
        return initialBoard;
    }
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

function sumRow(row) { 
    return row.reduce((acc, val) => (acc + val), 0);
}

function sumMat(mat) { 
    return mat.reduce((acc, val) => (acc + sumRow(val)),0);
}

function checkBoard(board) { 
    // is the board still playable?
    if (sumMat(board) != 9) {
        return 'game-over';
    }
    let centerBoard = board.slice(2,5).map((row) => (row.slice(2,5)));
    if (sumMat(centerBoard) == 9) {
        return 'win';
    }
    return 'still playing';
}

play();

