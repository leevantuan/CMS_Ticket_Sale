import './styles.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/hook';
import { addDataTickets, fetchDataEvents, fetchDataServices } from '../../core/redux';
import { DatePicker, DatePickerProps } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import { ConvertToTimestamp, SoSanhDateTicket } from '../../../handleLogic/handle';
import { addTicketsInterface } from '../../@types/types';

export default function AddTicket() {
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  const dateNow: string = moment().format('DD/MM/YYYY');
  const dispatch = useAppDispatch();
  const listServiceStore = useAppSelector(state => state.tickets.services);
  const listEventStore = useAppSelector(state => state.tickets.events);
  useEffect(() => {
    dispatch(fetchDataServices());
    dispatch(fetchDataEvents());
  }, [dispatch]);

  const [eventName, setEventName] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');

  useEffect(() => {
    const listEvent = listEventStore.map(event => event.eventName);
    const listService = listServiceStore.map(service => service.serviceName);
    setEventName(listEvent[0]);
    setServiceName(listService[0]);
  }, [listEventStore, listServiceStore]);

  const [useDate, setUseDate] = useState<string>(dateNow);
  const [chooseGate, setChooseGate] = useState<string>('Cổng 1');
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const state: boolean = false;

  useEffect(() => {
    const findService = listServiceStore.find(service => service.serviceName === serviceName);
    if (findService) {
      if (findService.combo === 0) {
        setPrice(findService.price);
      } else {
        setPrice(findService.combo);
      }
      setCode(findService.serviceId);
    }
  }, [listServiceStore, serviceName]);

  const onChangeDateUse: DatePickerProps['onChange'] = (date, dateString) => {
    setUseDate(dateString);
  };

  const HandleClickServiceName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServiceName(e.target.value);
  };
  const HandleSubmit = () => {
    const checkDate = SoSanhDateTicket(useDate, dateNow);
    if (checkDate === true) {
      const ngaySuDung = ConvertToTimestamp(useDate, '00:00:00');
      const ngayXuat = ConvertToTimestamp(dateNow, '00:00:00');

      const newDataAdd: addTicketsInterface = {
        bookingCode: code,
        tenSuKien: eventName,
        tinhTrang: state,
        ngaySuDung: ngaySuDung,
        ngayXuat: ngayXuat,
        congCheckIn: chooseGate,
        type: serviceName,
      };
      const findService = listServiceStore.find(service => service.serviceName === serviceName);
      if (findService) {
        if (findService.combo === 0) {
          for (var i = 0; i < quantity; i++) {
            dispatch(addDataTickets(newDataAdd));
          }
        } else {
          for (var j = 0; j < quantity * 4; j++) {
            dispatch(addDataTickets(newDataAdd));
          }
        }
      }
      alert(`Thanh toán ... ${price * quantity} ... xuất vé!`);
    } else {
      alert('Vui lòng kiểm tra lại ngày sử dụng!');
    }
  };
  return (
    <div className="container col-8 d-flex">
      <div className="col-md-5">
        <h1 className="p-4 fw-bold">Mua vé</h1>
        <div className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Sự kiện</label>
            <select className="form-select" onChange={e => setEventName(e.target.value)}>
              {listEventStore.map(event => {
                return (
                  <option key={event.id} value={event.eventName}>
                    {event.eventName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Ngày sử dụng</label>
            <br />
            <DatePicker
              onChange={onChangeDateUse}
              format={dateFormatList}
              value={dayjs(useDate, dateFormatList[0])}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Cổng</label>
            <select className="form-select" onChange={e => setChooseGate(e.target.value)}>
              <option value="Cổng 1">Cổng 1</option>
              <option value="Cổng 2">Cổng 2</option>
              <option value="Cổng 3">Cổng 3</option>
              <option value="Cổng 4">Cổng 4</option>
              <option value="Cổng 5">Cổng 5</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Gói sự kiện</label>
            <select className="form-select" onChange={HandleClickServiceName}>
              {listServiceStore.map(service => {
                return (
                  <option key={service.id} value={service.serviceName}>
                    {service.serviceName} - Gói gồm{' '}
                    {service.quantity === 0 ? '1' : service.quantity} vé - Giá{' '}
                    {service.combo === 0 ? service.price : service.combo}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-3">
            <label className="form-label">Số lượng</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={e => setQuantity(e.target.valueAsNumber)}
            />
          </div>
        </div>
      </div>
      <div className="col-md-7 fw-bold p-4 ms-4">
        <h1>Kiểm tra thông tin</h1>
        <div className="d-flex mt-3">
          <h5 className="fw-bold me-4">Tên sự kiện:</h5>
          <h5>{eventName}</h5>
        </div>
        <div className="d-flex mt-3">
          <h5 className="fw-bold me-4">Ngày sử dụng:</h5>
          <h5>{useDate}</h5>
        </div>
        <div className="d-flex mt-3">
          <h5 className="fw-bold me-4">Cổng vào:</h5>
          <h5>{chooseGate}</h5>
        </div>
        <div className="d-flex mt-3">
          <h5 className="fw-bold me-4">Gói sự kiện:</h5>
          <h5>{serviceName}</h5>
        </div>
        <div className="d-flex">
          <div className="d-flex mt-3">
            <h5 className="fw-bold me-4">Giá gói:</h5>
            <h5>{price}.000 đồng</h5>
          </div>
          <div className="d-flex mt-3 ms-4 ps-4">
            <h5 className="fw-bold me-4">Số lượng:</h5>
            <h5>{quantity}</h5>
          </div>
        </div>
        <div className="d-flex mt-3">
          <h5 className="fw-bold me-4">Tổng tiền:</h5>
          <h5>{price * quantity}.000 đồng</h5>
        </div>
        <div className="d-flex mt-3">
          <h5 className="fw-bold me-4">Mã code:</h5>
          <h5>{code}</h5>
        </div>
        <div className="d-flex mt-3">
          <h5 className="fw-bold me-4">Ngày xuất:</h5>
          <h5>{dateNow}</h5>
        </div>
        <div className="col-12 mt-4">
          <button type="submit" className="btn btn-primary pe-4 ps-4" onClick={HandleSubmit}>
            Xuất hóa đơn
          </button>
        </div>
      </div>
    </div>
  );
}
