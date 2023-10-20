import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
// import io from 'socket.io';
import { Server, Socket } from 'socket.io';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/test', (req: express.Request, res: express.Response) => {
	res.send('Hii');
});
io.on('connection', (socket: Socket) => {
	console.log(socket);
	console.log('A user Connected');
	socket.on('chat', (payload: string) => {
		console.log(payload);
		io.emit('chat', payload);
	});
});
server.listen(8080, () => {
	console.log(`Server Running at Port 8080`);
});
