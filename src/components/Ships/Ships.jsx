import React from "react";
import "./Ships.css";
function Ships({ shipsData }) {
  const { ships, aliveCount } = shipsData;

  const imgs = {
    carrier: "Carrier Shape.png",
    battleship: "Battleship Shape.png",
    cruiser: "Cruiser Shape.png",
    submarine: "Submarine Shape.png",
    destroyer: "Aircraft Shape.png",
  };

  function Indicators({ alive, total }) {
    const indicators = [];
    const imgs = {
      hit: "Hit small.png",
      miss: "Miss small.png",
    };
    for (let i = 0; i < total; i++, alive--) {
      indicators.push(
        <li className="dot">
          <div className="img-container">
            <img src={alive > 0 ? imgs.miss : imgs.hit}></img>
          </div>
        </li>
      );
    }

    return <ul className="indicator">{indicators}</ul>;
  }

  function Ship({ ships, shipType, aliveCount }) {
    const { positions: { length: total } } = ships[shipType];
    return (
      <div className="ship-details">
        <div className="img-container">
          <img src={imgs[shipType]}></img>
        </div>
        <div>
          {!!total && (
            <Indicators
              alive={aliveCount[shipType]}
              total={total}
            ></Indicators>
          )}
        </div>
      </div>
    );
  }

  const shipNames = Object.keys(ships);

  return (
    <div className="ship-container">
      {!!shipNames.length &&
        shipNames.map((shipName) => (
          <Ship
            ships={ships}
            shipType={shipName}
            key={shipName}
            aliveCount={aliveCount}
          ></Ship>
        ))}
    </div>
  );
}

export default Ships;
