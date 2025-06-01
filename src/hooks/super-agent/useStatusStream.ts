
import { useState } from 'react';
import { StatusUpdate } from '@/types/super-agent';

export const useStatusStream = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const startStatusStream = async (statusUpdates: StatusUpdate[]) => {
    setShowStatus(true);
    
    for (const update of statusUpdates) {
      setStatusMessage(update.message);
      await new Promise(resolve => setTimeout(resolve, update.delay));
    }
  };

  const stopStatusStream = () => {
    setShowStatus(false);
    setStatusMessage("");
  };

  return {
    statusMessage,
    showStatus,
    startStatusStream,
    stopStatusStream
  };
};
