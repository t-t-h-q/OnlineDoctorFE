import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Layout, message } from 'antd'
import {
  VideoCameraOutlined,
  AudioOutlined,
  AudioMutedOutlined,
  CloseCircleOutlined,
  SendOutlined,
} from '@ant-design/icons'

const { Content, Sider } = Layout

// Define interfaces for better type safety
interface ChatMessage {
  sender: string
  message: string
  timestamp: Date
}

const consultationData = {
  patientId: 'default-patient',
  doctorName: 'Dr. Default',
  patientName: 'Patient Default',
}

const Consultation: React.FC = () => {
  // State management with proper types
  const [isCallActive, setIsCallActive] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>('')

  // Video refs with proper types
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  // Handle starting the video call
  const handleStartCall = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      localStreamRef.current = stream

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      setIsCallActive(true)
      message.success('Call started successfully')
    } catch (error) {
      message.error('Failed to start video call')
      // eslint-disable-next-line no-console
      console.error('Error accessing media devices:', error)
    }
  }

  // Handle ending the video call
  const handleEndCall = (): void => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null
    }

    setIsCallActive(false)
    message.info('Call ended')
  }

  // Handle audio muting
  const handleToggleMute = (): void => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsMuted(!isMuted)
    }
  }

  // Handle sending chat messages
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

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <Layout className='min-h-screen bg-gray-100'>
      <Content className='p-6'>
        <div className='text-2xl font-bold mb-6'>Video Call/Chat</div>

        <div className='flex gap-6'>
          {/* Video Section */}
          <div className='flex-grow'>
            <div className='grid grid-cols-2 gap-4'>
              {/* Doctor's Video */}
              <div className='relative'>
                <video ref={remoteVideoRef} autoPlay playsInline className='w-full bg-black rounded-lg' />
                <div className='absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded'>
                  {consultationData.doctorName}
                </div>
              </div>

              {/* Patient's Video */}
              <div className='relative'>
                <video ref={localVideoRef} autoPlay playsInline muted className='w-full bg-black rounded-lg' />
                <div className='absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded'>
                  {consultationData.patientName}
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className='flex justify-center gap-4 mt-4'>
              {!isCallActive ? (
                <Button type='primary' icon={<VideoCameraOutlined />} onClick={handleStartCall} className='bg-blue-500'>
                  Start Call
                </Button>
              ) : (
                <>
                  <Button
                    icon={isMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
                    onClick={handleToggleMute}
                    className={isMuted ? 'bg-red-500 text-white' : ''}
                  >
                    {isMuted ? 'Unmute' : 'Mute'}
                  </Button>
                  <Button danger icon={<CloseCircleOutlined />} onClick={handleEndCall}>
                    End Call
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <Sider width={300} className='bg-white rounded-lg p-4'>
            <div className='flex flex-col h-full'>
              {/* Chat Messages */}
              <div className='flex-grow overflow-y-auto mb-4'>
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${msg.sender === consultationData.patientId ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg max-w-[80%] ${
                        msg.sender === consultationData.patientId ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {msg.message}
                    </div>
                    <div className='text-xs text-gray-500 mt-1'>{msg.timestamp.toLocaleTimeString()}</div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className='flex gap-2'>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  placeholder='Type a message...'
                />
                <Button type='primary' icon={<SendOutlined />} onClick={handleSendMessage} className='bg-blue-500'>
                  Send
                </Button>
              </div>
            </div>
          </Sider>
        </div>
      </Content>
    </Layout>
  )
}

export default Consultation
