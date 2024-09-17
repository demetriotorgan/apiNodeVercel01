//Aula 2
//Usando common.js

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(){
    rl.question('Digite sua equação: ', (input)=>{
        if(input === 'quit'){
            rl.close();
        } else{
            try{
                const value = eval(input);
                console.log(`${value}`);
            }catch(exception){
                console.log('Não entendi');
            }
        question();
        }        
    });
}

question();