import {getLinks, saveLinks} from './feed-manager.mjs';
import {rl, close} from './rl.mjs';
// import https from 'https';
import axios from 'axios';
import Parser from 'rss-parser'
import {EventEmitter} from 'events';


const feeds = await getLinks();
const parser = new Parser();
const emiiter = new EventEmitter();

function prompt(){
    rl.setPrompt('Digite o comando(list,add,del,read,quit): ');
    rl.prompt();
}

rl.on('line', (input)=>{
    let cmdParts = input.trim().split(' ');
    emiiter.emit(cmdParts[0], cmdParts[1]);    
});

emiiter.on('quit', async ()=>{
    await saveLinks(feeds);
    close();
});

emiiter.on('list', async ()=>{
    feeds.forEach((url, index)=> console.log(`${index}\t${url}`));
    prompt();
});

emiiter.on('add', async (url)=>{
    if(url === undefined){
        console.log('Por favor inclua a URL com o comando add');
    } else {
        feeds.push(url);
    }

    prompt();
});

emiiter.on('del', async (index)=>{
    if(index === undefined){
        console.log('Por favor inclua o index da URL para deletar');
    } else {
        index = parseInt(index,10);
            if(index > -1 && index < feeds.length){
                feeds.splice(index,1);
                }else{
                console.log('O index fornecido está fora do intervalo');
                }
    }
    prompt();
});

emiiter.on('read', async (index)=>{
    if(index === undefined){
        console.log('Por favor inclua o index da URL para leitura');
    } else {
        index = parseInt(index,10);
            if(index > -1 && index < feeds.length){
                if(index > -1 && index < feeds.length){
                    let {data} = await axios.get(feeds[index]);
                    let feed = await parser.parseString(data);
                    feed.items.forEach(item =>console.log(item.title));        
                    }else{
                        console.log('O index fornecido está fora do intervalo');
                    }

                }else{
                console.log('O index fornecido está fora do intervalo');
                }
    }
    prompt();
});

prompt();

// while(input != 'quit'){
   
//     let cmd = cmdParts[0];
//         //list
//         if(cmd === 'list'){
//             feeds.forEach((url, index)=> console.log(`${index}\t${url}`));                
//             }
//     //add url
//         if(cmd === 'add'){
//             if(cmdParts.length < 2){
//                 console.log('Por favor inclua a URL com o comando add');
//             }else{
//                 feeds.push(cmdParts[1]);
//             }
//         }        
//     //del index
//         if(cmd === 'del'){
//             if(cmdParts.length < 2){
//                 console.log('Por favor inclua o index da URL para deletar');
//             }else{
//                 let index = parseInt(cmdParts[1],10);
//                 if(index > -1 && index < feeds.length){
//                     feeds.splice(index,1);
//                 }else{
//                     console.log('O index fornecido está fora do intervalo');
//                 }
//             }
//         }
//     //read index
//         if(cmd === 'read'){
//             // https.get('https://www.reddit.com/r/node.rss', (response)=>{
//             //     let content = '';
//             //     response.on('data', (chunk)=>{
//             //         content += chunk;
//             //     });
//             //     response.on('end', ()=>{
//             //         console.log(content);
//             //     })
//             // });
            
//             if(cmdParts.length < 2){
//                 console.log('Por favor inclua o index da URL para leitura');
//             }else{
//                 let index = parseInt(cmdParts[1],10);
//                 if(index > -1 && index < feeds.length){
//                     let {data} = await axios.get('https://www.reddit.com/r/node.rss');
//                     // console.log(data);
//                     let feed = await parser.parseString(data);
//                     feed.items.forEach(item =>console.log(item.title));        
//                 }else{
//                     console.log('O index fornecido está fora do intervalo');
//                 }
//             }
//         }

//     input = await question('Digite o comando(list,add,del,read,quit): ');
// }

