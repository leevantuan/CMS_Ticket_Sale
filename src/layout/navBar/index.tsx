import { MailOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import '../../view/styles/navBar.scss';
import InputSearch from '../../shared/components/inputSearch/inputSearch';

export default function NavBar() {
  return (
    <div className="container-navBar d-flex justify-content-between">
      <InputSearch width={470} height={48} placeholder="Search ..." />
      <ul className="d-flex align-items-center list-style-none">
        <li className="ms-4">
          <MailOutlined />
        </li>
        <li className="ms-4">
          <BellOutlined />
        </li>
        <li className="ms-4">
          <Space size={16} wrap>
            <Avatar
              style={{ backgroundColor: '#87d068', width: 40, height: 40 }}
              icon={<UserOutlined />}
            />
          </Space>
        </li>
      </ul>
    </div>
  );
}
