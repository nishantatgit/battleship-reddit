import React from "react";
import { useState } from "react";

import Grid from "../Grid/Grid";
import Ships from "../Ships/Ships";

import "./GameBoard.css";

function GameBorad() {
  const grid = {
    rows: 10,
    cols: 10,
  };

  const [shipsAliveCount, updateShipsAliveCount] = useState({
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  });

  const ships = {
    carrier: {
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    battleship: {
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    cruiser: {
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    submarine: {
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    destroyer: {
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  };

  function getCheckedInitial() {
    const keys = Object.keys(ships);
    const checked = {};
    for (let i = 0; i < keys.length; i++) {
      const pos = ships[keys[i]].positions;
      pos.forEach((p) => {
        if (!checked[p[0]]) {
          checked[p[0]] = {};
        }
        checked[p[0]][p[1]] = {
          type: keys[i],
          status: 1,
        };
      });
    }

    return checked;
  }

  const checked = getCheckedInitial();

  const callbacks = {
    cellClickCallback: function (cellDeatils) {
      const { rows: rowNum, cols: colNum } = cellDeatils;
      const shipType = checked[rowNum][colNum].type;
      updateShipsAliveCount({
        ...shipsAliveCount,
        [shipType]:
          shipsAliveCount[shipType] > 0 ? shipsAliveCount[shipType] - 1 : 0,
      });
    },
  };

  return (
    <section className="game-board">
      <Ships shipsData={{ ships: ships, aliveCount: shipsAliveCount }} />
      <Grid
        options={{ ...grid }}
        callbacks={{ ...callbacks }}
        checked={{ ...checked }}
      ></Grid>
    </section>
  );
}

export default GameBorad;
