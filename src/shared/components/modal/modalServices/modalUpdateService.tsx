import '../styles.scss';
import { openModalUpdateService } from '../../../../@types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { fetchData, fetchDataServices, fetchDataEvents } from '../../../../core/redux';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { DatePicker, DatePickerProps, Modal, TimePicker, TimePickerProps } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Checkbox } from 'antd';
import { HandleCheckUpdateService, HandleStateService } from '../../../../handleLogic/handle';

export default function ModalUpdateService(props: openModalUpdateService) {
  const dispatch = useAppDispatch();
  //set data
  const listServiceStore = useAppSelector(state => state.tickets.services);
  //load data
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchDataServices());
    dispatch(fetchDataEvents());
  }, [dispatch]);

  const findService = listServiceStore.find(service => service.id === props.id);
  const [state, setState] = useState<string>('0');
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [fromTime, setFromTime] = useState<string>('');
  const [toTime, setToTime] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [priceCombo, setPriceCombo] = useState<number>(0);

  useEffect(() => {
    if (findService) {
      const handleCheck = HandleCheckUpdateService(findService?.price, findService?.combo);
      const stateUpdate = HandleStateService(findService.state);
      setCheckedList(handleCheck);
      setState(stateUpdate);
      setFromDate(findService.ngaySuDung);
      setToDate(findService.ngayHetHan);
      setFromTime(findService.gioSuDung);
      setToTime(findService.gioHetHan);
      setServiceId(findService.serviceId);
      setServiceName(findService.serviceName);
      setPrice(findService.price);
      setPriceCombo(findService.combo);
    }
  }, [findService]);

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

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
  return (
    <Modal
      open={props.openUpdateService}
      onCancel={props.HandleClickModalUpdateService}
      title="Cập nhập thông tin gói vé"
      footer={
        <>
          <button
            onClick={props.HandleClickModalUpdateService}
            className="btn btn-outline-warning pe-5 ps-5 custom-modal-filter mt-3"
          >
            Hủy
          </button>
          <button
            onClick={() =>
              props.HandleClickUpdate(
                fromDate,
                fromTime,
                toDate,
                toTime,
                priceCombo,
                serviceId,
                serviceName,
                state,
                price,
              )
            }
            className="btn btn-warning pe-5 ps-5 custom-modal-filter mt-3 ms-4"
          >
            Lưu
          </button>
        </>
      }
    >
      {findService ? (
        <>
          <div className="d-flex justify-content-between">
            <div>
              <label>Mã sự kiện*</label>
              <br />
              <input
                className="input-service-width"
                value={serviceId}
                onChange={e => setServiceId(e.target.value)}
              />
            </div>
            <div>
              <label>Tên gói vé*</label>
              <br />
              <input
                className="input-service"
                value={serviceName}
                onChange={e => setServiceName(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-datetime d-flex justify-content-between mt-3">
            <div className="from-datetime">
              <h6 className="fw-bold">Ngày áp dụng</h6>
              <DatePicker
                onChange={onChangeFromDate}
                value={dayjs(fromDate, dateFormatList[0])}
                format={dateFormatList}
              />
              <span className="ps-3">
                <TimePicker onChange={onChangFromTime} value={dayjs(fromTime, 'HH:mm:ss')} />
              </span>
            </div>
            <div className="to-datetime">
              <h6 className="fw-bold">Ngày hết hạn</h6>
              <DatePicker
                onChange={onChangeToDate}
                value={dayjs(toDate, dateFormatList[0])}
                format={dateFormatList}
              />
              <span className="ps-3">
                <TimePicker onChange={onChangToTime} value={dayjs(toTime, 'HH:mm:ss')} />
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
                  value={price}
                  onChange={e => setPrice(e.target.valueAsNumber)}
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
                  value={priceCombo}
                  onChange={e => setPriceCombo(e.target.valueAsNumber)}
                  // disabled={priceCombo === 0 ? true : false}
                />{' '}
                /{' '}
                <input
                  type="number"
                  className="input-quantity-ticket-combo ms-2 me-2"
                  value={priceCombo === 0 ? 0 : 4}
                  onChange={() => {}}
                  // disabled={priceCombo === 0 ? true : false}
                />
                vé
              </Checkbox>
            </Checkbox.Group>
          </div>

          <div className="filter-CheckIn">
            <h6 className="mt-3 fw-bold">Tình trạng</h6>
            <select
              className="p-2 ps-4 pe-4"
              onChange={e => setState(e.target.value)}
              value={state}
            >
              <option value="1">Đang áp dụng</option>
              <option value="0">Không áp dụng</option>
            </select>
          </div>
          <p className="mt-4">* là thông tin bắt buộc</p>
        </>
      ) : (
        ''
      )}
    </Modal>
  );
}
