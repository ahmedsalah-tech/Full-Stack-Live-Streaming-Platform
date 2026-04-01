import User from '../../models/User.ts';

export const getFollowedChannels = async (req: any, res: any) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId, { followedChannels: 1 });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    return res.status(200).json({
      followedChannels: user.followedChannels,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error fetching followed channels.');
  }
};
