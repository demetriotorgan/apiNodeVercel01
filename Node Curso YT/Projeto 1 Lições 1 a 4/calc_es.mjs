//Aula 3
//Neste exemplo devemos usar a extençao .mjs para module

import * as readline from 'readline';
import {stdin as input, stdout as output} from 'process';


const rl = readline.createInterface({input, output});

function question(query){
    return new Promise(resolve =>{
        rl.question(query,resolve);
    })
}

let resp = await question('Digite sua equação: ');
while(resp != 'quit'){
    try{
        const value = eval(resp);
        console.log(`${value}`);
    }catch(exception){
        console.log('Não entendi');
    }
resp = await question('Digite sua equação: ');
};

rl.close();