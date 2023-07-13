import { FileSyncOutlined, TagsOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import '../../view/styles/menu.scss';
import logo from '../../shared/assets/insight-05 1.png';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Trang chủ', '1', <HomeOutlined />),
  getItem('Quản lý vé', '2', <TagsOutlined />),
  getItem('Đổi soát vé', '3', <FileSyncOutlined />),
  getItem('Cài đặt', 'sub1', <SettingOutlined />, [getItem('Gói dịch vụ', '4')]),
];

export default function IMenu() {
  return (
    <div className="container-menu">
      <img src={logo} className="logo-menu" alt="logo" />
      <Menu
        style={{ width: 252, backgroundColor: '#F9F6F4', border: 'none' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  );
}
