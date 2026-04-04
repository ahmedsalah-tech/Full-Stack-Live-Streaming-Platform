import type { Message as MessageType } from '../../../../shared/types/chat';

const dummyMessages = [
  {
    author: 'Alex Mark',
    content: 'Hello World',
    id: 1,
  },
  {
    author: 'Nicole Robert',
    content: 'Hello World',
    id: 2,
  },
  {
    author: 'Jason Rodriguez',
    content: 'Hello World',
    id: 3,
  },
  {
    author: 'Douglas Chris',
    content: 'Hello World',
    id: 4,
  },
];

const Message = ({ author, content }: { author: string; content: string }) => {
  return (
    <span className="chat-messages-message">
      <span style={{ fontWeight: 'bold' }}>{author}: </span>
      {content}
    </span>
  );
};

type MessagesProps = {
  messages: MessageType[];
};

const Messages = ({ messages }: MessagesProps) => {
  const messagesToDisplay = messages.length > 0 ? messages : dummyMessages;
  return (
    <div className="chat-messages-container">
      {messagesToDisplay.map((message, index) => (
        <Message
          key={message.id || index}
          author={message.author}
          content={message.content}
        />
      ))}
    </div>
  );
};

export default Messages;
