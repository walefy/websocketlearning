import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });
const sockets: WebSocket[] = [];

wss.on('connection', (ws, req) => {
  const params = new URL(req.url as string, `http://${req.headers.host}`).searchParams;
  const username = params.get('username');
  sockets.push(ws);

  console.log(`${username} se conectou`);

  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log(`${username}: ${data}`);

    const sendMessage = Buffer.from(JSON.stringify({ username, message: data.toString() }));

    sockets.forEach(w => w.send(sendMessage));
  });
});
