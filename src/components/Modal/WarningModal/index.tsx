import React from 'react'
import { Modal } from 'antd'

interface WarningModalProps {
  isOpen: boolean
  title: string
  content: React.ReactNode
  onOk: () => void
  onCancel: () => void
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, title, content, onOk, onCancel }) => {
  return (
    <Modal title={title} open={isOpen} onOk={onOk} onCancel={onCancel}>
      {content}
    </Modal>
  )
}

export default WarningModal
