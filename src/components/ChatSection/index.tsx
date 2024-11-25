import React, { useState } from 'react'
import { Button, Input, Layout, Tooltip } from 'antd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const { Sider } = Layout

interface ChatMessage {
  sender: string
  message: string
  timestamp: Date
}

interface ChatSectionProps {
  consultationData: {
    patientId: string
  }
}

const ChatSection: React.FC<ChatSectionProps> = ({ consultationData }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>('')

  const handleSendMessage = (): void => {
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: consultationData.patientId,
          message: newMessage.trim(),
          timestamp: new Date(),
        },
      ])
      setNewMessage('')
    }
  }

  return (
    <Sider width={300} className='bg-white rounded-lg p-4'>
      <div className='flex flex-col h-full'>
        <div className='flex-grow overflow-y-auto mb-4'>
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 relative group ${msg.sender === consultationData.patientId ? 'text-right' : 'text-left'}`}
            >
              <Tooltip placement='left' title={msg.timestamp.toLocaleTimeString()}>
                <div
                  className={`inline-block p-2 rounded-lg max-w-[80%] ${
                    msg.sender === consultationData.patientId ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {msg.message}
                </div>
              </Tooltip>
            </div>
          ))}
        </div>

        <div className='flex gap-2'>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            placeholder='Type a message...'
          />
          <Button type='primary' onClick={handleSendMessage} className='bg-blue-500'>
            <FontAwesomeIcon icon={faPaperPlane} className='mr-2' />
            Send
          </Button>
        </div>
      </div>
    </Sider>
  )
}

export default ChatSection
