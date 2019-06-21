import express, { Request, Response } from 'express';
import { readStatus } from './services/status';

const app = express();
const PORT = 8080;

app.use(express.static('public'));

app.get('/api/status', (req: Request, res: Response) => readStatus(res));

app.listen(PORT);

console.log(`HTTP server listening on port ${PORT}`);