import User from '../../models/User.ts';
import Channel from '../../models/Channel.ts';
import type { AuthRequest } from '../../middlewares/auth.ts';
import type { Response } from 'express';

export const putChannelSettings = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;

    const { title, description, username, avatarUrl } = req.body;

    const userData = await User.findById(userId, { username: 1, channel: 1 });

    if (!userData) {
      return res.status(404).send('User not found.');
    }

    if (userData.username !== username) {
      await User.updateOne({ _id: userId }, { username });
    }

    const channelData = await Channel.findByIdAndUpdate(
      userData.channel,
      {
        title,
        description,
        avatarUrl,
        isActive: true,
      },
      { new: true }
    );

    return res.status(200).json({
      channelId: channelData?._id,
      username,
      title: channelData?.title,
      description: channelData?.description,
      avatarUrl: channelData?.avatarUrl,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send('Something went wrong');
  }
};
