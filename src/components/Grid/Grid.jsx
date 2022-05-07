import React from 'react';
import { useState } from 'react';

function Grid({
    options,
    callbacks
}){

    const {
        rows,
        cols
    } = options;

    const {
        cellClickHandler
    } = callbacks;

    function initGrid(rows, cols){
        const grid = new Array(rows).fill(new Array(cols).fill(0));
        return grid;
    }

    function onCellClick(e){
        e.preventDefault();
        console.log(e.target, e.target.id);
        if(cellClickHandler && typeof cellClickHandler === 'function'){
            cellClickHandler();
        }
    }

    function renderGrid(rows,cols){
        if(rows <= 0 && cols <= 0){
            return null;
        }
        let grid = [];
        for(let i = 0 ; i < rows; i++){
            for(let j = 0; j < cols; j++){
                grid.push(<div id={`${i}-${j}`} key={`${i}-${j}`} className="grid-cell"></div>)
            }
        }
    }



    return (<section className="grid">
       {renderGrid(rows,cols)}    
    </section>)
}