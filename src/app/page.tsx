'use client'

import { useLogOutMutation, useMessagesQuery } from "@/Api/globalApi";
import { useAppSelector } from "@/hooks/redux";
import { getUser, getUserName } from "@/redux/users/selectors";
import { ArrowButton, MessageList, SendMassageForm } from "@/shared/components";
import Container from "@/shared/components/Container/Container";
import Section from "@/shared/components/Section/Section";
import { Message } from "@/types";
import { nanoid } from 'nanoid'
import process from "process";
import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";




export default function Home() {
  const socket: Socket = io(`${process.env.NEXT_PUBLIC_BASE_API_URL}`);
  console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
  
  const { data, isSuccess } = useMessagesQuery({})
  const [ logOut, {} ] = useLogOutMutation()
  
  const { id, userName: login } = useAppSelector(getUser);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [lastMessage, setLastMessage] = useState<Message>();

  const addMessage = useCallback((message: string): void => {
    const newMessage: Message = {
        userId: id,
        messageId: nanoid(),
        login,
        message,
    }
    setMessageList((prevMessageList:Message[]) => {
      return [...prevMessageList, newMessage]
    })
    socket.emit('chat-message', JSON.stringify(newMessage))
  }, [id, login])

  useEffect(() => {
    if (!messageList.length && isSuccess) {
      if (data.length) {
        setMessageList(data)
      }     
    } 
  },[isSuccess])

  useEffect( () => {
    socket.on('show-message', (data) => {
      setLastMessage(JSON.parse(data))
    })
  },[lastMessage])

  useEffect(() => {
    if (lastMessage && !messageList.some(el => el?.messageId === lastMessage?.messageId)) {
      setMessageList((prevMessageList: Message[]) => {
        const newMessage: Message = {
          ...lastMessage,
        }
        return [...prevMessageList, newMessage]
      })
    }
    
  }, [lastMessage, messageList])
  
  return (
    <main>
      <Section className='py-8 md:py-8 h-screen min-h-fit'>
        <Container >
          {login && <>
            
            <div className='h-full flex flex-col justify-between  gap-3'>
              <div className="flex justify-between mb-2">
                <h2 className="font-mono text-2xl">
                  {login}
                </h2>
                <ArrowButton onClick={logOut } >ВИЙТИ</ArrowButton >
              </div>
              <MessageList messageList={messageList } />
              <SendMassageForm addMessage={addMessage} />
            </div>
          </>}
        </Container>
      </Section>
    </main>
  );
}
