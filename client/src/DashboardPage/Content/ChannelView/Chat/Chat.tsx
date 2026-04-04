import { useChatHistory } from '../../../../shared/hooks';
import Messages from './Messages';
import { NewMessageInput } from './newMessageInput';

type ChatProps = {
  channelId: string;
};

export const Chat = ({ channelId }: ChatProps) => {
  const { messages, sendMessage } = useChatHistory(channelId);

  return (
    <div className="chat-section">
      <div className="chat-title-container">
        <span className="chat-title-text">Stream Chat</span>
      </div>
      <Messages messages={messages} />
      <NewMessageInput sendMessage={sendMessage} />
    </div>
  );
};
