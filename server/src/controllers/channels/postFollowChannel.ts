import User from '../../models/User.ts';
import type { Response } from 'express';
import type { AuthRequest } from '../../middlewares/auth.ts';

export const postFollowChannel = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;

    const { channelId } = req.body;

    const userData = await User.findById(userId, { followedChannels: 1 });

    if (!userData) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const alreadyFollowing = userData.followedChannels.some(
      (followedChannelId) => followedChannelId.toString() === channelId
    );

    if (alreadyFollowing) {
      return res
        .status(400)
        .json({ message: 'You are already following this channel.' });
    }

    userData.followedChannels.push(channelId);

    await userData.save();

    return res.status(200).json({ message: 'Channel followed successfully.' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again' });
  }
};
