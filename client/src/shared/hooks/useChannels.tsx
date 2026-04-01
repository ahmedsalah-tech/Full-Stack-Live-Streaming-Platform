import { useState, useEffect } from 'react';
import {
  getFollowedChannels,
  getChannels as getChannelsRequest,
} from '../../api';
import toast from 'react-hot-toast';
import {
  type ChannelsState as OriginalChannelsState,
  type Channel,
} from '../../types/types';

type ChannelsState = OriginalChannelsState & {
  followedChannels?: Channel[];
};

export const useChannels = () => {
  const [channels, setChannels] = useState<ChannelsState | null>(null);

  const getChannels = async (isLogged = false) => {
    const channelsData = await getChannelsRequest();

    if ('error' in channelsData) {
      return toast.error(
        channelsData.exception?.response?.data?.message ||
          'Error occured when fetching channels'
      );
    }

    if (!isLogged) {
      return setChannels({
        channels: channelsData.data.channels,
      });
    }

    const followedChannelsData = await getFollowedChannels();

    if ('error' in followedChannelsData) {
      return toast.error(
        followedChannelsData.exception?.response?.data?.message ||
          'Error occured when fetching the followed channels'
      );
    }

    setChannels({
      channels: channelsData.data.channels,
      followedChannels: channelsData.data.channels.filter((channel: Channel) =>
        (
          followedChannelsData.data as { followedChannels: string[] }
        ).followedChannels.includes(channel.id)
      ),
    });
  };

  useEffect(() => {
    console.log(channels);
  }, [channels]);

  return {
    getChannels,
    isFetching: !channels,
    allChannels: channels?.channels,
    followedChannels: channels?.followedChannels,
  };
};
