import User from '../../models/User.ts';
import type { Response } from 'express';
import type { AuthRequest } from '../../middlewares/auth.ts';

interface ChannelDetails {
  _id: string;
  title: string;
  description: string;
  avatarUrl: string;
  streamKey: string;
}

interface UserDetails {
  username: string;
  channel: ChannelDetails;
}

export const getChannelSettings = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;

    const userData = await User.findById(userId, {
      channel: 1,
      username: 1,
    }).populate<'channel'>('channel');

    if (!userData || !userData.channel) {
      return res.status(404).send('User or channel not found');
    }

    const channelData = userData.channel as unknown as ChannelDetails;

    return res.status(200).json({
      id: channelData._id,
      username: userData.username,
      title: channelData.title,
      description: channelData.description,
      avatarUrl: channelData.avatarUrl,
      streamKey: channelData.streamKey,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong');
  }
};
