//Standard Input and Output 
//Aula 1
process.stdin.on('data', (chunk)=>{
    const input = chunk.toString().trim();    

        if(input === 'quit'){
            process.exit(0);
        }
            try{
                const value = eval(input);
                console.log(`${value}`);
            }catch(exception){
                console.log('Não entendi');
            }
    process.stdout.write('Digite sua equação: ');
});

process.stdout.write('Digite sua equação: ');