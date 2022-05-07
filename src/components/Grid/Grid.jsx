import React from 'react';
import { useState } from 'react';

import './grid.css';

function Grid({
    options,
    callbacks = {},
    checked = {},
    ships
}){

    const {
        rows,
        cols
    } = options;

    const {
        cellClickCallback
    } = callbacks;

    const initialGrid = initGrid(rows,cols);
    const [ grid, updateGrid ] = useState(initialGrid);

    function initGrid(rows, cols){
       // 0 - uninitialized, 1 - checked with true, 2 - checked with false
       console.log('init grid called ... ', checked);
       let grid = [];
       for(let i = 0; i < rows; i++){
           grid[i] = [];
           for(let j = 0; j < cols; j++){
               if(checked[i] && checked[i][j] !== undefined && typeof checked[i][j].status === 'number'){
                    console.log('checked[i][j].status ', checked[i][j].status);
                    grid[i][j] = checked[i][j];
               } else {
                   grid[i][j] = 0;
               }
           }
       }
       return grid;
    }

    function getCellDetails(id){
        if(!id) return;

        const arr = id.split('-');
        console.log('arr ', arr);
        return {
            rows: Number(arr[0]),
            cols: Number(arr[1])
        }
    }

    function onCellClick(e){
        e.preventDefault();
        console.log(e.target, e.target.id);
        const cellDetails = getCellDetails(e.target.id);

        if(cellClickCallback && typeof cellClickCallback === 'function'){
            cellClickCallback(cellDetails);
        }
    }

    function renderGrid(grid){
        let gridArray = [];

        const rows = grid.length;
        const cols = grid[0].length;

        for(let i = 0 ; i < rows; i++){
            for(let j = 0; j < cols; j++){
                gridArray.push(<div id={`${i}-${j}`} key={`${i}-${j}`} className="grid-cell"></div>)
            }
        }
        return gridArray;
    }



    return (<section className="grid" onClick={onCellClick}>
       {renderGrid(grid)}    
    </section>)
}

export default Grid;