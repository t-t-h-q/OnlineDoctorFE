import { Layout, Typography, Space, Divider } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const { Footer: AntdFooter } = Layout
const { Title, Text } = Typography

interface ContactItem {
  icon: IconDefinition
  text: string
}

interface LinkItem {
  text: string
  href: string
}

interface SocialItem {
  icon: IconDefinition
  hoverColor: string
}

interface TextContent {
  type: 'text'
  value: string
}

interface ContactContent {
  type: 'contact'
  items: ContactItem[]
}

interface LinksContent {
  type: 'links'
  items: LinkItem[]
}

interface SocialContent {
  type: 'social'
  items: SocialItem[]
}

type SectionContent = TextContent | ContactContent | LinksContent | SocialContent

interface FooterSection {
  title: string
  content: SectionContent
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Về chúng tôi',
      content: {
        type: 'text',
        value: 'Nền tảng telemedicine hàng đầu Việt Nam, kết nối bạn với các bác sĩ chuyên nghiệp',
      },
    },
    {
      title: 'Liên hệ',
      content: {
        type: 'contact',
        items: [
          { icon: faPhone, text: '1900 xxxx' },
          { icon: faEnvelope, text: 'support@telemed.com' },
          { icon: faMapMarkerAlt, text: 'TP.HCM, Việt Nam' },
        ],
      },
    },
    {
      title: 'Links',
      content: {
        type: 'links',
        items: [
          { text: 'Về chúng tôi', href: '#' },
          { text: 'Chính sách bảo mật', href: '#' },
          { text: 'Điều khoản sử dụng', href: '#' },
          { text: 'FAQ', href: '#' },
        ],
      },
    },
    {
      title: 'Kết nối',
      content: {
        type: 'social',
        items: [
          { icon: faFacebookF, hoverColor: 'hover:text-blue-500' },
          { icon: faTwitter, hoverColor: 'hover:text-blue-400' },
          { icon: faLinkedinIn, hoverColor: 'hover:text-blue-600' },
        ],
      },
    },
  ]

  const renderSectionContent = (content: SectionContent) => {
    switch (content.type) {
      case 'text':
        return <Text className='text-gray-400'>{content.value}</Text>

      case 'contact':
        return (
          <Space direction='vertical' className='text-gray-400'>
            {content.items.map((item, index) => (
              <span key={index}>
                <FontAwesomeIcon icon={item.icon} className='mr-2' />
                {item.text}
              </span>
            ))}
          </Space>
        )

      case 'links':
        return (
          <Space direction='vertical' className='text-gray-400'>
            {content.items.map((item, index) => (
              <a key={index} href={item.href} className='text-gray-400'>
                {item.text}
              </a>
            ))}
          </Space>
        )

      case 'social':
        return (
          <Space size='large'>
            {content.items.map((item, index) => (
              <FontAwesomeIcon
                key={index}
                icon={item.icon}
                className={`text-2xl text-gray-400 ${item.hoverColor} cursor-pointer`}
              />
            ))}
          </Space>
        )
    }
  }

  return (
    <AntdFooter className='bg-gray-800 text-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-4 gap-8'>
          {footerSections.map((section, index) => (
            <div key={index}>
              <Title level={4} className='!text-white'>
                {section.title}
              </Title>
              {renderSectionContent(section.content)}
            </div>
          ))}
        </div>
        <Divider className='border-gray-700' />
        <div className='text-center text-gray-400'>© 2024 TeleMed. All rights reserved.</div>
      </div>
    </AntdFooter>
  )
}

export default Footer
