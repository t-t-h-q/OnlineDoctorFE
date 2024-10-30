import React from 'react'
import { Layout, Badge, Dropdown, Avatar, Space } from 'antd'
import type { MenuProps } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const { Header } = Layout

interface HeaderProps {
  username?: string
  avatarUrl?: string
}

const DashboardHeader: React.FC<HeaderProps> = ({
  username = 'Nguyễn Văn A',
  avatarUrl = 'https://via.placeholder.com/32',
}) => {
  const profileMenu: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Space>
          <FontAwesomeIcon icon={faUser} />
          Thông tin cá nhân
        </Space>
      ),
    },
    {
      key: 'settings',
      label: (
        <Space>
          <FontAwesomeIcon icon={faCog} />
          Cài đặt
        </Space>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <Space>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Đăng xuất
        </Space>
      ),
    },
  ]

  return (
    <Header className='bg-white px-6 flex items-center justify-end border-b border-gray-100'>
      {/* Actions Section */}
      <div className='flex items-center gap-6'>
        {/* Notifications */}
        <Badge count={5} className='cursor-pointer'>
          <FontAwesomeIcon icon={faBell} className='text-gray-600 text-lg hover:text-blue-600 transition-colors' />
        </Badge>

        {/* Messages */}
        <Badge count={3} className='cursor-pointer'>
          <FontAwesomeIcon icon={faEnvelope} className='text-gray-600 text-lg hover:text-blue-600 transition-colors' />
        </Badge>

        {/* Divider */}
        <div className='h-6 w-px bg-gray-200'></div>

        {/* User Profile */}
        <Dropdown menu={{ items: profileMenu }} trigger={['click']} placement='bottomRight'>
          <div className='flex items-center gap-3 cursor-pointer'>
            <Avatar src={avatarUrl} />
            <span className='text-gray-700 font-medium'>{username}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}

export default DashboardHeader
