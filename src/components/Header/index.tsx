import React from 'react'
import { Button, Menu, Layout } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHospital, faNewspaper, faCalendarPlus, faHome } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useNavigate } from 'react-router-dom'

const { Header: AntHeader } = Layout

interface MenuItem {
  key: string
  icon: IconDefinition
  label: string
}

const menuItems: MenuItem[] = [
  { key: 'home', icon: faHome, label: 'Trang chủ' },
  { key: 'services', icon: faCalendarPlus, label: 'Dịch vụ' },
  { key: 'doctors', icon: faUser, label: 'Bác sĩ' },
  { key: 'news', icon: faNewspaper, label: 'Tin tức' },
]

const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <AntHeader className='bg-white shadow-md fixed w-full z-10'>
      <div className='container mx-auto flex justify-between items-center h-full'>
        {/* Logo section */}
        <div className='flex items-center flex-1'>
          <div className='text-2xl font-bold text-blue-600 flex items-center whitespace-nowrap'>
            <FontAwesomeIcon icon={faHospital} className='mr-2' />
            <span>TeleMed</span>
          </div>

          {/* Navigation Menu */}
          <Menu
            mode='horizontal'
            className='ml-8 border-none flex-1'
            style={{ minWidth: 'auto' }}
            items={menuItems.map((item) => ({
              key: item.key,
              label: (
                <div className='flex items-center whitespace-nowrap'>
                  <FontAwesomeIcon icon={item.icon} className='mr-2' />
                  {item.label}
                </div>
              ),
            }))}
          />
        </div>

        {/* Auth buttons */}
        <div className='flex items-center space-x-4 ml-4'>
          <Button
            type='text'
            icon={<FontAwesomeIcon icon={faUser} />}
            className='flex items-center whitespace-nowrap'
            onClick={() => navigate('/login')}
          >
            <span className='ml-2'>Đăng nhập</span>
          </Button>
          <Button
            type='primary'
            className='bg-blue-600 hover:bg-blue-700 whitespace-nowrap'
            onClick={() => navigate('/register')}
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </AntHeader>
  )
}

export default Header
