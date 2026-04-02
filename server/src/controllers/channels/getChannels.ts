import type { Request, Response } from 'express';
import axios from 'axios';
import User from '../../models/User.ts';

interface PopulatedChannel {
  _id: string;
  title: string;
  avatarUrl: string;
  isActive: boolean;
  streamKey: string;
}

interface StreamInfo {
  publisher?: Record<string, unknown> | null;
}

interface StreamsApiResponse {
  live?: Record<string, StreamInfo>;
}

interface PopulatedUser {
  username: string;
  channel: PopulatedChannel;
}

export const getChannels = async (req: Request, res: Response) => {
  try {
    const users = await User.find(
      {},
      {
        channel: 1,
        username: 1,
      }
    ).populate<{ channel: PopulatedChannel }>('channel');

    const requestData = await axios.get<StreamsApiResponse>(
      'http://localhost:8000/api/streams'
    );

    const activeStreams = requestData.data;

    const channels = users
      .filter((user) => user.channel && user.channel.isActive)
      .map((user) => {
        return {
          id: user.channel._id,
          title: user.channel.title,
          avatarUrl: user.channel.avatarUrl,
          username: user.username,
          isOnline: Object.keys(activeStreams.live ?? {}).includes(
            user.channel.streamKey
          ),
        };
      });

    return res.json({
      channels,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong');
  }
};
