import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config()

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});