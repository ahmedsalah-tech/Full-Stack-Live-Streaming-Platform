import User from '../../models/User.ts';
import Channel from '../../models/Channel.ts';

export const getChannelDetails = async (req: any, res: any) => {
	try {
		const { channelId } = req.params;

		const channel = await Channel.findById(channelId);

		if (!channel || !channel.isActive) {
			return res.status(404).json('Channel not found');
		}

		const user = await User.findOne({ channel: channelId }, { username: 1 });

		const streamUrl = 'http';

		const isOnline = false;

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
