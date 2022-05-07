import React from 'react';
import { useState , useCallback} from 'react';
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';

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
                   grid[i][j] = 0;
            }
           
       }
       return grid;
    }

    function setGrid(i,j){
        console.log(grid,i,j);
        console.log('--- ', grid[i][j])
        if(grid[i][j] === 0){
            grid[i][j] = checked[i] && checked[i][j] && checked[i][j].status === 1 ? 1 : 2;
            console.log('updating grid i j '); 
            updateGrid([...grid]);
        }
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
        setGrid(cellDetails.rows, cellDetails.cols);
        if(cellClickCallback && typeof cellClickCallback === 'function'){
            cellClickCallback(cellDetails);
        }
    }

    function renderImg(status){

        if(status === 0) return null;

        const imgs = {
            1: 'Hit.png',
            2: 'Miss.png'
        }

        return <div className="img-container"><img src={imgs[status]}></img></div>

       
    }

    function renderGrid(grid){
        console.log('render grid called ... ', grid);
        let gridArray = [];

        const rows = grid.length;
        const cols = grid[0].length;

        for(let i = 0 ; i < rows; i++){
            for(let j = 0; j < cols; j++){
                gridArray.push(<div id={`${i}-${j}`} key={`${i}-${j}`} className="grid-cell">{renderImg(grid[i][j])}</div>)
            }
        }
        return gridArray;
    }



    return (<section className="grid" onClick={onCellClick}>
       {renderGrid(grid)}    
    </section>)
}

export default Grid;