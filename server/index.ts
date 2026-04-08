import dns from 'dns';
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '8.8.4.4']); // Fix for ISP DNS blocking MongoDB SRV lookups
}

import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from './src/models/User.ts';
import Channel from './src/models/Channel.ts';
import Message from './src/models/Message.ts';

import authRoutes from './src/routes/authRoutes.ts';
import channelsRoutes from './src/routes/channelsRoutes.ts';
import settingsRoutes from './src/routes/settingsRoutes.ts';
import { registerSocketServer } from './src/io/io.ts';

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  return res.send('Hello, here is your server');
});

app.use('/api/auth', authRoutes);
app.use('/api/channels', channelsRoutes);
app.use('/api/settings', settingsRoutes);

const server = http.createServer(app);

registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database Connection Failed, Server is not started!');
    console.log(err);
  });
