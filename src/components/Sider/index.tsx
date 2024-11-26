import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faFileAlt,
  faUser,
  faCalendarPlus,
  faListAlt,
  faVideo,
  faCreditCard,
  faHistory,
  faCog,
  faSignOutAlt,
  faSearch,
  faAngleLeft,
  faHospital,
  faBars,
} from '@fortawesome/free-solid-svg-icons'

const { Sider: AntdSider } = Layout

interface MenuItem {
  key: string
  icon: React.ReactNode
  label: string
  children?: MenuItem[]
}

const Sider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const menuItems: MenuItem[] = [
    {
      key: 'appointments',
      icon: <FontAwesomeIcon icon={faCalendarAlt} />,
      label: 'Appointments',
      children: [
        {
          key: 'appointment-booking',
          icon: <FontAwesomeIcon icon={faCalendarPlus} />,
          label: 'Book Appointment',
        },
        {
          key: 'manage-appointments',
          icon: <FontAwesomeIcon icon={faListAlt} />,
          label: 'Manage Appointments',
        },
        {
          key: 'appointment-history',
          icon: <FontAwesomeIcon icon={faHistory} />,
          label: 'Appointment History',
        },
      ],
    },
    {
      key: 'find-doctors',
      icon: <FontAwesomeIcon icon={faSearch} />,
      label: 'Find Doctors',
    },
    {
      key: 'consultation',
      icon: <FontAwesomeIcon icon={faVideo} />,
      label: 'Communicate with Doctor',
    },
    {
      key: 'online-payment',
      icon: <FontAwesomeIcon icon={faCreditCard} />,
      label: 'Online Payment',
    },
    {
      key: 'medical-records',
      icon: <FontAwesomeIcon icon={faFileAlt} />,
      label: 'Medical Records',
    },
    {
      key: 'profile',
      icon: <FontAwesomeIcon icon={faUser} />,
      label: 'Profile',
      children: [
        {
          key: 'settings',
          icon: <FontAwesomeIcon icon={faCog} />,
          label: 'Account Settings',
        },
        {
          key: 'logout',
          icon: <FontAwesomeIcon icon={faSignOutAlt} />,
          label: 'Logout',
        },
      ],
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/patients/${key}`)
  }
  return (
    <AntdSider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className='bg-white shadow-md'
      width={250}
      trigger={null}
    >
      <div className='h-16 flex items-center justify-center border-b border-gray-200 px-4'>
        <div className={`flex items-center ${collapsed ? '' : 'gap-2'}`}>
          <FontAwesomeIcon icon={faHospital} className='text-blue-600 text-xl' />
          <h1
            className={`text-xl font-bold text-blue-600 transition-all duration-200 
        ${collapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}
          >
            Dashboard
          </h1>
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className='w-full py-2 flex justify-center hover:bg-gray-100 transition-colors'
      >
        <FontAwesomeIcon icon={collapsed ? faBars : faAngleLeft} className='text-gray-500' />
      </button>

      <Menu
        mode='inline'
        defaultSelectedKeys={['appointment-booking']}
        defaultOpenKeys={['appointments']}
        className='border-r-0'
        items={menuItems}
        onClick={handleMenuClick}
      />
    </AntdSider>
  )
}

export default Sider
