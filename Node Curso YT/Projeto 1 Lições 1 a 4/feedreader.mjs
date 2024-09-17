import {getLinks, saveLinks} from './feed-manager.mjs';
import {question, close} from './rl.mjs';
// import https from 'https';
import axios from 'axios';
import Parser from 'rss-parser'

const feeds = await getLinks();
const parser = new Parser();

let input = await question('Digite o comando(list,add,del,read,quit): ');

while(input != 'quit'){
    let cmdParts = input.trim().split(' ');
    let cmd = cmdParts[0];
        //list
        if(cmd === 'list'){
            feeds.forEach((url, index)=> console.log(`${index}\t${url}`));                
            }
    //add url
        if(cmd === 'add'){
            if(cmdParts.length < 2){
                console.log('Por favor inclua a URL com o comando add');
            }else{
                feeds.push(cmdParts[1]);
            }
        }        
    //del index
        if(cmd === 'del'){
            if(cmdParts.length < 2){
                console.log('Por favor inclua o index da URL para deletar');
            }else{
                let index = parseInt(cmdParts[1],10);
                if(index > -1 && index < feeds.length){
                    feeds.splice(index,1);
                }else{
                    console.log('O index fornecido está fora do intervalo');
                }
            }
        }
    //read index
        if(cmd === 'read'){
            // https.get('https://www.reddit.com/r/node.rss', (response)=>{
            //     let content = '';
            //     response.on('data', (chunk)=>{
            //         content += chunk;
            //     });
            //     response.on('end', ()=>{
            //         console.log(content);
            //     })
            // });
            
            if(cmdParts.length < 2){
                console.log('Por favor inclua o index da URL para leitura');
            }else{
                let index = parseInt(cmdParts[1],10);
                if(index > -1 && index < feeds.length){
                    let {data} = await axios.get('https://www.reddit.com/r/node.rss');
                    // console.log(data);
                    let feed = await parser.parseString(data);
                    feed.items.forEach(item =>console.log(item.title));        
                }else{
                    console.log('O index fornecido está fora do intervalo');
                }
            }
        }

    input = await question('Digite o comando(list,add,del,read,quit): ');
}

await saveLinks(feeds);
close();