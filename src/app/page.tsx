'use client'

import { LogInForm, MessageList, SendMassageForm } from "@/shared/components";
import Container from "@/shared/components/Container/Container";
import Modal from "@/shared/components/Modal/Modal";
import Section from "@/shared/components/Section/Section";
import { Message } from "@/types";
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";


const socket: Socket  = io('http://localhost:5000');

export default function Home() {
  const [login, setLogin] = useState('')
  const [messageList, setMessageList] = useState<Message[]>([]);
  
  console.log(messageList);
  
  const createLogin = useCallback((text:string)=>setLogin(text),[])

  const addMessage = useCallback(( message: string ): void => {
    setMessageList((prevMessageList:Message[]) => {
      const newMessage: Message = {
        id: nanoid(),
        type: 'me',
        login,
        message,
      }
      return [...prevMessageList, newMessage]
    })
    socket.emit('chat-message', JSON.stringify({login, message}))
  }, [login])
  
  useEffect(() => {
    socket.on('chat-message', (data: string) => {
      const { message, login } = JSON.parse(data);
      setMessageList((prevMessageList: Message[]) => {
       
        const newMessage: Message = {
          id: nanoid(),
          type: 'user',
          login,
          message,
        }
        return [...prevMessageList, newMessage]
      })
    })
  }, [])
  
  return (
    <main>
      <Section className='py-10 md:py-10'>
        <Container >
          <h2 className="font-mono text-2xl">
            {login}
          </h2>
          <div className='h-full flex flex-col justify-between  gap-3'>
            <MessageList messageList={messageList } />
            <SendMassageForm addMessage={addMessage} />
          </div>
        </Container>
        <Modal isOpen={!login}>
          <LogInForm setLogin={createLogin } />
        </Modal>
      </Section>
    </main>
  );
}
