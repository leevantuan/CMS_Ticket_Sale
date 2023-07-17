import '../../../view/styles/managerTicket.scss';
import { modalFilter } from '../../../@types/types';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';

import { DatePicker, DatePickerProps, Modal } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

export default function ModalFilter(props: modalFilter) {
  const dateNow: string = moment().format('DD/MM/YYYY');
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  const CheckboxGroup = Checkbox.Group;

  const [value, setValue] = useState(0);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  useEffect(() => {
    setFromDate('01/07/2023');
    setToDate('01/08/2023');
  }, [dateNow]);

  const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
    setFromDate(dateString);
  };

  const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
    setToDate(dateString);
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onChangeCheckIn = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find(check => check === '0')) {
      setCheckedList(['0']);
    } else {
      if (checkedValues.length === 5) {
        setCheckedList(['0']);
      } else {
        setCheckedList(checkedValues);
      }
    }
  };
  return (
    <Modal
      open={props.open}
      onCancel={props.HandleClickModalOpen}
      title="Lọc vé"
      footer={
        <button
          onClick={() => props.HandleClickFilter(fromDate, toDate, value, checkedList)}
          className="btn btn-outline-warning pe-5 ps-5 custom-modal-filter mt-3"
        >
          Lọc
        </button>
      }
    >
      <div className="filter-datetime d-flex justify-content-between">
        <div className="from-datetime">
          <h6 className="fw-bold">Từ ngày</h6>
          <DatePicker
            onChange={onChangeFromDate}
            value={dayjs(fromDate, dateFormatList[0])}
            format={dateFormatList}
          />
        </div>
        <div className="to-datetime">
          <h6 className="fw-bold">Đến ngày</h6>
          <DatePicker
            onChange={onChangeToDate}
            value={dayjs(toDate, dateFormatList[0])}
            format={dateFormatList}
          />
        </div>
      </div>

      <div className="filter-useState">
        <h6 className="mt-3 fw-bold">Tình trạng sử dụng</h6>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={0}>Tất cả</Radio>
          <Radio value={1}>Đã sử dụng</Radio>
          <Radio value={2}>Chưa sử dụng</Radio>
          <Radio value={3}>Hết hạn</Radio>
        </Radio.Group>
      </div>

      <div className="filter-CheckIn">
        <h6 className="mt-3 fw-bold">Cổng Check - in</h6>
        <CheckboxGroup value={checkedList} onChange={onChangeCheckIn}>
          <Row>
            <Col span={8}>
              <Checkbox value="0">Tất cả</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="1">Cổng 1</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="2">Cổng 2</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="3">Cổng 3</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="4">Cổng 4</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="5">Cổng 5</Checkbox>
            </Col>
          </Row>
        </CheckboxGroup>
      </div>
    </Modal>
  );
}
