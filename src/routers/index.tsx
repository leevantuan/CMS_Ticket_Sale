import { FileSyncOutlined, TagsOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import '../view/styles/menu.scss';
import logo from '../shared/assets/insight-05 1.png';
import { useState } from 'react';

import NavBar from '../layout/navBar';
import Home from '../view/Home';
import QuanLy from '../view/QuanLy';
import DoiSoatVe from '../view/DoiSoatVe';
import Setting from '../view/Setting';

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
export default function Main() {
  const [handlePage, setHandlePage] = useState<string>('1');
  const [handleActive, setHandleActive] = useState<string>('1');
  const HanldeClickMenu = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
    setHandlePage(key);
    setHandleActive(key);
  };
  const HanldeClickLogo = () => {
    setHandlePage('1');
    setHandleActive('1');
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <div className="container-menu">
            <img
              src={logo}
              className="logo-menu"
              alt="logo"
              onClick={HanldeClickLogo}
              style={{ cursor: 'pointer' }}
            />
            <Menu
              style={{ width: 252, backgroundColor: '#F9F6F4', border: 'none' }}
              selectedKeys={[handleActive]}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
              onSelect={HanldeClickMenu}
            />
          </div>
        </div>
        <div className="col-9">
          <NavBar />
          <div hidden={handlePage === '1' ? false : true}>
            <Home />
          </div>
          <div hidden={handlePage === '2' ? false : true}>
            <QuanLy />
          </div>
          <div hidden={handlePage === '3' ? false : true}>
            <DoiSoatVe />
          </div>
          <div hidden={handlePage === '4' ? false : true}>
            <Setting />
          </div>
        </div>
      </div>
    </div>
  );
}
