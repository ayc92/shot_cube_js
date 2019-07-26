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
    console.log(board);
}

/**
 * takes a playerPos and the active board and outputs the state of
 * the board after the move occurs (if possible)
 */
function move(playerPos, initialBoard) {
    let isOnHorizontalRow = (playrPos.yPos == -1);
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
                let slice = Array.prototype.splice.apply(newColumn.slice(0, stopPoint), [0,0,...(new Array(numToMove)).fill(0)]).slice(0, stopPoint)
                Array.prototype.splice.apply(newColumn, [0, stopPoint, ...slice])
            }
            if (!isOnTopRow) { 
                newColumn = newColumn.reverse();
            }
            return initialBoard.map((row, i) => (row.slice(activeColumn, 1, newColumn[i])))
        }
        return initialBoard;
    }
}

play();
