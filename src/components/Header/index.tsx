import React from 'react'
import { Button, Menu, Layout } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faHospital,
  faCalendarPlus,
  faHome,
  faNewspaper,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const { Header: AntHeader } = Layout

export interface MenuItem {
  key: string
  icon: IconDefinition
  label: string
}

const menuItems: MenuItem[] = [
  { key: 'home', icon: faHome, label: 'Home' },
  { key: 'services', icon: faCalendarPlus, label: 'Services' },
  { key: 'doctors', icon: faUser, label: 'Doctors' },
  { key: 'news', icon: faNewspaper, label: 'News' },
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
            <span className='ml-2'>Login</span>
          </Button>
          <Button
            type='primary'
            className='bg-blue-600 hover:bg-blue-700 whitespace-nowrap'
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </div>
      </div>
    </AntHeader>
  )
}

export default Header
