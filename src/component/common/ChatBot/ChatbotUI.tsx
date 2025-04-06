import React, { useMemo } from 'react';
import Messages from './messages/Messages';
import Notes from './notes/Notes';

const ChatbotUI = ({ type }: { type: string }) => {
  const renderUI = useMemo(() => {
    switch (type) {
      case 'Messages':
        return <Messages />;
      case 'Notes':
        return <Notes />;
      default:
        break;
    }
  }, [type]);

  return <div>{renderUI}</div>;
};

export default ChatbotUI;
