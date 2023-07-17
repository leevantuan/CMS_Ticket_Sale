import './styles.scss';
import InputSearch from '../../shared/components/inputSearch/inputSearch';
import ListCheckTicket from '../../shared/components/table/listCheckTicket';

import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space } from 'antd';

import dayjs from 'dayjs';
import { DatePicker, DatePickerProps } from 'antd';
import { ConvertToTimestamp } from '../../handleLogic/handle';

export default function DoiSoatVe() {
  const [fromDate, setFromDate] = useState<string>('01/07/2023');
  const [toDate, setToDate] = useState<string>('01/08/2023');
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  const [radioState, setRadioState] = useState<number>(0);
  const [inputSearch, setInputSearch] = useState<string>('');

  const [filterFromDate, setFilterFromDate] = useState<Date>();
  const [filterToDate, setFilterToDate] = useState<Date>();

  const onChange = (e: RadioChangeEvent) => {
    setRadioState(e.target.value);
  };
  const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
    setFromDate(dateString);
  };
  const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
    setToDate(dateString);
  };

  const HandleClickFilter = () => {
    setFilterFromDate(ConvertToTimestamp(fromDate, '00:00:00'));
    setFilterToDate(ConvertToTimestamp(toDate, '00:00:00'));
  };
  return (
    <div className="container-main d-flex" style={{ marginTop: '80px', borderRadius: 18 }}>
      <div className="container-check-ticket">
        <p className="title-check-ticket ms-4 pt-3">Đối soát vé</p>
        <div className="m-4 d-flex justify-content-between">
          <InputSearch
            width={446}
            height={48}
            placeholder="Tìm bằng số vé ..."
            HandleInputSearch={e => setInputSearch(e.target.value)}
          />
          <button className="btn btn-outline-warning ps-4 pe-4">Xuất file (.csv)</button>
        </div>
        <div className="m-4">
          <ListCheckTicket
            inputSearch={inputSearch}
            filterFromDate={filterFromDate}
            filterToDate={filterToDate}
            radioState={radioState}
          />
        </div>
      </div>
      <div className="container-filter-check-ticket ms-4">
        <p className="title-filter ms-4 pt-3">Lọc vé</p>
        <select className="ms-4 p-2" disabled>
          <option>Hoi cho nguoi tieu dung 2021</option>
          <option>Hoi cho nguoi tieu dung 2022</option>
          <option>Hoi cho nguoi tieu dung 2023</option>
        </select>
        <div className="state-check-ticket m-4 d-flex">
          <h6>Tình trạng soát vé</h6>
          <Radio.Group onChange={onChange} value={radioState}>
            <Space direction="vertical">
              <Radio value={0}>Tất cả</Radio>
              <Radio value={1}>Đã đối soát</Radio>
              <Radio value={2}>Chưa đối soát</Radio>
            </Space>
          </Radio.Group>
        </div>
        <div className="state-check-ticket m-4 d-flex">
          <h6>Loại vé</h6>
          <h6>Vé cổng</h6>
        </div>
        <div className="state-check-ticket m-4 d-flex">
          <h6 className="mt-4">Từ ngày</h6>
          <DatePicker
            onChange={onChangeFromDate}
            value={dayjs(fromDate, dateFormatList[0])}
            format={dateFormatList}
          />
        </div>
        <div className="state-check-ticket m-4 d-flex">
          <h6 className="mt-4">Đến ngày</h6>
          <DatePicker
            onChange={onChangeToDate}
            value={dayjs(toDate, dateFormatList[0])}
            format={dateFormatList}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-warning btn-filter-check-ticket"
            onClick={HandleClickFilter}
          >
            Lọc
          </button>
        </div>
      </div>
    </div>
  );
}
