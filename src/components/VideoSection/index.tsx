import React, { useState, useRef, useEffect } from 'react'
import { Button, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faMicrophone, faMicrophoneSlash, faPhoneSlash } from '@fortawesome/free-solid-svg-icons'

interface VideoSectionProps {
  consultationData: {
    doctorName: string
    patientName: string
  }
}

const VideoSection: React.FC<VideoSectionProps> = ({ consultationData }) => {
  const [isCallActive, setIsCallActive] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  const handleStartCall = async (): Promise<void> => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      message.error('Your browser does not support video calls')
      return
    }
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
      message.error('Unable to access camera or microphone')
      // eslint-disable-next-line no-console
      console.error('Error accessing media devices:', error)
    }
  }

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

  const handleToggleMute = (): void => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className='flex-grow'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='relative'>
          <video ref={remoteVideoRef} autoPlay playsInline className='w-full bg-black rounded-lg' />
          <div className='absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded'>
            {consultationData.doctorName}
          </div>
        </div>

        <div className='relative'>
          <video ref={localVideoRef} autoPlay playsInline muted className='w-full bg-black rounded-lg' />
          <div className='absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded'>
            {consultationData.patientName}
          </div>
        </div>
      </div>

      <div className='flex justify-center gap-4 mt-4'>
        {!isCallActive ? (
          <Button type='primary' onClick={handleStartCall} className='bg-blue-500'>
            <FontAwesomeIcon icon={faVideo} className='mr-2' />
            Start Call
          </Button>
        ) : (
          <>
            <Button onClick={handleToggleMute} className={isMuted ? 'bg-red-500 text-white' : ''}>
              <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} className='mr-2' />
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
            <Button danger onClick={handleEndCall}>
              <FontAwesomeIcon icon={faPhoneSlash} className='mr-2' />
              End Call
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
export default VideoSection
