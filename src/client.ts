import WebSocket from 'ws';
import readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = (message: string) => {
  return rl.question(message);
};

const main = async () => {
  const username = await input('type you username: ')
  const ws = new WebSocket(`ws://localhost:3000/?username=${username}`);
  
  ws.on('error', console.error);
  
  ws.on('message', function message(rawData) {
    const data = JSON.parse(rawData.toString()) as { username: string, message: string };
  
    if (data.username === username) return;
  
    process.stdout.write(`\n${data.username}: ${data.message}\n>> `)
  });
  
  ws.on('open', async () => {
    while (true) {
      const data = await input('>> ');
    
      ws.send(data);
    }
  });  
};

main();
