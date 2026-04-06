import axios from 'axios';
import User from '../../models/User.ts';
import Channel from '../../models/Channel.ts';
import type { Request, Response } from 'express';

interface StreamInfo {
  publisher?: Record<string, unknown> | null;
}

interface StreamsApiResponse {
  live?: Record<string, StreamInfo>;
}

export const getChannelDetails = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId);

    if (!channel || !channel.isActive) {
      return res.status(404).json('Channel not found');
    }

    const user = await User.findOne({ channel: channelId }, { username: 1 });

    const streamUrl = `http://localhost:8000/live/${channel.streamKey}.flv`;

    const requestData = await axios.get<StreamsApiResponse>(
      'http://localhost:8000/api/streams'
    );

    const activeStreams = requestData.data;

    const isOnline = Object.keys(activeStreams.live ?? {}).includes(
      channel.streamKey
    );

    return res.status(200).json({
      id: channel._id,
      title: channel.title,
      description: channel.description,
      username: user?.username,
      isOnline,
      streamUrl: streamUrl,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('Channel not found. Please check the channel URL');
  }
};
