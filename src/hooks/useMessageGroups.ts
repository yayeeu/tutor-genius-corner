
import { useMemo } from 'react';
import { Message } from '@/types/chat';

export const useMessageGroups = (messages: Message[]) => {
  return useMemo(() => {
    return messages.reduce((acc: Message[][], current) => {
      if (acc.length === 0 || acc[acc.length - 1][0].sender !== current.sender) {
        acc.push([current]);
      } else {
        acc[acc.length - 1].push(current);
      }
      return acc;
    }, []);
  }, [messages]);
};
