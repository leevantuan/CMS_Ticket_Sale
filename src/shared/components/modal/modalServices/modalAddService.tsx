import { openModalAddService } from '../../../../@types/types';
import '../styles.scss';

import { useEffect, useState } from 'react';
import { DatePicker, DatePickerProps, Modal, TimePicker, TimePickerProps } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

export default function ModalAddService(props: openModalAddService) {
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

  const [checkPrice, setCheckPrice] = useState<boolean>(false);
  const [checkCombo, setCheckCombo] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [state, setState] = useState<string>('0');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [fromTime, setFromTime] = useState<string>('');
  const [toTime, setToTime] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [priceCombo, setPriceCombo] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
    setFromDate(dateString);
  };
  const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
    setToDate(dateString);
  };
  const onChangFromTime: TimePickerProps['onChange'] = (time, timeString) => {
    setFromTime(timeString);
  };
  const onChangToTime: TimePickerProps['onChange'] = (time, timeString) => {
    setToTime(timeString);
  };
  const HandleClickCheck = (checkedValues: CheckboxValueType[]) => {
    setCheckedList(checkedValues);
  };

  useEffect(() => {
    const checkPriceList = checkedList.find(check => check === '1');
    const checkComboList = checkedList.find(check => check === '2');
    if (checkPriceList) {
      setCheckPrice(true);
    } else {
      setCheckPrice(false);
    }
    if (checkComboList) {
      setCheckCombo(true);
    } else {
      setCheckCombo(false);
    }
  }, [checkedList]);
  return (
    <Modal
      open={props.openAddService}
      onCancel={props.HandleClickModalAddService}
      title="Thêm gói vé"
      footer={
        <>
          <button
            onClick={props.HandleClickModalAddService}
            className="btn btn-outline-warning pe-5 ps-5 custom-modal-filter mt-3"
          >
            Hủy
          </button>
          <button
            onClick={() =>
              props.HandleClickAdd(
                fromDate,
                fromTime,
                toDate,
                toTime,
                priceCombo,
                serviceId,
                serviceName,
                state,
                price,
                quantity,
              )
            }
            className="btn btn-warning pe-5 ps-5 custom-modal-filter mt-3 ms-4"
          >
            Lưu
          </button>
        </>
      }
    >
      <div className="d-flex justify-content-between">
        <div>
          <label>Mã sự kiện*</label>
          <br />
          <input
            className="input-service-width"
            onChange={e => setServiceId(e.target.value)}
            placeholder="Mã sự kiện ..."
          />
        </div>
        <div>
          <label>Tên gói vé*</label>
          <br />
          <input
            className="input-service"
            onChange={e => setServiceName(e.target.value)}
            placeholder="Tên gói vé ..."
          />
        </div>
      </div>

      <div className="filter-datetime d-flex justify-content-between mt-3">
        <div className="from-datetime">
          <h6 className="fw-bold">Ngày áp dụng</h6>
          <DatePicker onChange={onChangeFromDate} format={dateFormatList} />
          <span className="ps-3">
            <TimePicker onChange={onChangFromTime} />
          </span>
        </div>
        <div className="to-datetime">
          <h6 className="fw-bold">Ngày hết hạn</h6>
          <DatePicker onChange={onChangeToDate} format={dateFormatList} />
          <span className="ps-3">
            <TimePicker onChange={onChangToTime} />
          </span>
        </div>
      </div>

      <div className="filter-useState">
        <h6 className="mt-3 fw-bold">Giá vé áp dụng</h6>
        <Checkbox.Group onChange={HandleClickCheck} value={checkedList}>
          <Checkbox value="1">
            Vé lẻ (vnd / vé) với giá{' '}
            <input
              type="number"
              className="input-price-ticket ms-2 me-2"
              placeholder="Giá vé ... "
              onChange={e => setPrice(e.target.valueAsNumber)}
              disabled={checkPrice ? false : true}
            />{' '}
            / vé
          </Checkbox>
          <br />
          <br />
          <Checkbox value="2">
            Combo vé với giá{' '}
            <input
              type="number"
              className="input-price-ticket-combo ms-2 me-2"
              placeholder="Giá combo ... "
              onChange={e => setPriceCombo(e.target.valueAsNumber)}
              disabled={checkCombo ? false : true}
            />{' '}
            /{' '}
            <input
              className="input-quantity-ticket-combo ms-2 me-2"
              placeholder="Số lượng ... "
              disabled={checkCombo ? false : true}
              onChange={e => setQuantity(e.target.valueAsNumber)}
            />
            vé
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div className="filter-CheckIn">
        <h6 className="mt-3 fw-bold">Tình trạng</h6>
        <select className="p-2 ps-4 pe-4" onChange={e => setState(e.target.value)}>
          <option value="1">Đang áp dụng</option>
          <option value="0">Không áp dụng</option>
        </select>
      </div>
      <p className="mt-4">* là thông tin bắt buộc</p>
    </Modal>
  );
}
