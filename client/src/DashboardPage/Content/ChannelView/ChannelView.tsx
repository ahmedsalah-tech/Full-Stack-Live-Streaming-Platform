import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Chat } from './Chat';
import { ReactFlvPlayer } from 'react-flv-player';

import { ChannelDescription } from './ChannelDescription';
import { useChannelDetails } from '../../../shared/hooks';
import { LoadingSpinner } from '../../../shared/components';

interface ChannelViewProps {
  getChannels?: () => void;
}

interface StreamProps {
  streamUrl: string;
}

export const Stream = ({ streamUrl }: StreamProps) => {
  return (
    <div className="channel-video-container">
      <ReactFlvPlayer width="100%" height="100%" url={streamUrl} />
    </div>
  );
};

export const ChannelView = ({ getChannels }: ChannelViewProps) => {
  const { isFetching, getChannelDetails, channelDetails } = useChannelDetails();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getChannelDetails(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isFetching || !channelDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div className="channel-container">
      <div className="channel-video-description-section">
        {channelDetails.isOnline ? (
          <Stream streamUrl={channelDetails.streamUrl} />
        ) : (
          <div className="channel-offline-placeholder">
            <span>Channel is offline</span>
          </div>
        )}
        <ChannelDescription
          channelId={channelDetails.id}
          title={channelDetails.title}
          description={channelDetails.description}
          username={channelDetails.username}
          getChannels={getChannels}
        />
      </div>
      <Chat />
    </div>
  );
};
