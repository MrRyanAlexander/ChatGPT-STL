
import { useState } from 'react';
import { StatusStreamService } from '@/services/super-agent/statusStreamService';

export const useStatusStream = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const startStatusStream = async (statusUpdates: Generator<string, void, unknown>) => {
    setShowStatus(true);
    await StatusStreamService.streamWithDelay(statusUpdates, (message) => {
      setStatusMessage(message);
    });
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
