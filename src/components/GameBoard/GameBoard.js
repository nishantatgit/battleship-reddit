import React from 'react';
import {useState } from 'react';

import Grid from '../Grid/Grid';

function GameBorad(){

    const grid = {
        rows : 10,
        cols: 10
    }

    const [ ships, updateShips ] = useState({
        carrier : {
            positions: [[2,9],[3,9],[4,9],[5,9],[6,9]],
            alive: 5 
        },
        battleship: {
            positions: [[5,2],[5,3],[5,4],[5,5]],
            alive: 4
        },
        cruiser: {
            positions:[[8,1],[8,2],[8,3]],
            alive: 3,
        },
        submarine: {
            positions: [[3,0],[3,1],[3,2]],
            alive: 3
        },
        destroyer: {
            positions: [[0,0],[1,0]],
            alive: 2
        },
        
    });

    function getCheckedInitial(){
        const keys = Object.keys(ships);
        console.log('keys ', keys);
        const checked = {};
        for(let i = 0; i < keys.length; i++){
            console.log('ships ', ships[keys[i]]);
            const pos = ships[keys[i]].positions;
            pos.forEach(p => {
                if(!checked[p[0]]){
                    checked[p[0]] = {};
                }
                // 1 - alive , 2 - dead
                checked[p[0]][p[1]] = {
                    type: keys[i],
                    status : 1
                }
            })
        }

        return checked;
    }

    const checkedInitial = getCheckedInitial();

    const [ checked, setChecked ] = useState(checkedInitial); 

    const callbacks = {
        cellClickCallback : function(e){
          
        }
    }

    return (<section className="gameBoard">
        <Grid options={{...grid}} callbacks={{...callbacks}} checked={{...checked}}></Grid>
    </section>)
}

export default GameBorad;