import { useAppSelector } from '@/hooks/redux';
import { getUser } from '@/redux/users/selectors';
import { Message } from '@/types';
import React from 'react'


const MessageList = ({ messageList }: { messageList: Message[] }) => {
    const { id } = useAppSelector(getUser);
  return (
      <ul className="grow h-full p-4 bg-slate-200 overflow-auto rounded-default">
              {messageList.map(({ userId, messageId, login, message }) => {
                const styleMe = "justify-end after:content-['🢒']  after:text-4xl after:text-slate-300 ";
                const styleUser = "justify-start before:content-['🢐'] before:text-4xl before:text-slate-300 ";
                return (
                  <li key={messageId} className={`w-full flex mb-3 ${+userId === +id ? styleMe : styleUser}`}>
                    <div className="bg-slate-300 p-3 rounded-default">
                      <h5 className="text-neutral-500 text-xs">{login}</h5>
                      <p className="text-neutral-700 break-words">{message}</p>
                    </div>
                  </li>)})}
            </ul>
  )
}

export default MessageList