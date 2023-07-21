import '../../../view/styles/managerTicket.scss';
import { modalUpdate, updateTicketsInterface } from '../../../@types/types';
import './styles.scss';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker, DatePickerProps, Modal } from 'antd';
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { fetchData, updateDataTickets } from '../../../core/redux';
import { ConvertToTimestamp } from '../../../../handleLogic/handle';

export default function ModalUpdate(props: modalUpdate) {
  const dispatch = useAppDispatch();
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  const [newDate, setNewDate] = useState<string>('');
  const listTickets = useAppSelector(state => state.tickets.tickets);

  const findTicket = listTickets.find((ticket: any) => ticket.id === props.ticketId);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (findTicket) {
      setNewDate(findTicket.ngaySuDung);
    }
  }, [findTicket]);

  const onChangeNewDate: DatePickerProps['onChange'] = (date, dateString) => {
    setNewDate(dateString);
  };
  // const HandleClickUpdate = () => {
  //   const ngaySuDung: Date = ConvertToTimestamp(newDate, '00:00:00');
  //   const newData: updateTicketsInterface = {
  //     id: props.ticketId,
  //     ngaySuDung: ngaySuDung,
  //   };
  //   dispatch(updateDataTickets(newData));
  // };
  return (
    <Modal
      open={props.openUpdate}
      onCancel={props.HandleClickModalUpdate}
      title="Đổi ngày sử dụng vé"
      footer={
        <div style={{ position: 'relative', right: '20%' }}>
          <button
            onClick={props.HandleClickModalUpdate}
            className="btn btn-outline-warning pe-5 ps-5 mt-3"
          >
            Hủy
          </button>
          <button
            onClick={() => props.HandleClickUpdate(newDate)}
            className="btn btn-warning pe-5 ps-5 mt-3 ms-4"
          >
            Lưu
          </button>
        </div>
      }
    >
      {findTicket ? (
        <>
          <div className="d-flex mt-3">
            <h6 style={{ width: 150, fontWeight: 'bold' }}>Số vé</h6>
            <h6>{findTicket.id}</h6>
          </div>
          <div className="d-flex mt-3">
            <h6 style={{ width: 150, fontWeight: 'bold' }}>Loại vé</h6>
            <h6>{findTicket.type}</h6>
          </div>
          <div className="d-flex mt-3">
            <h6 style={{ width: 150, fontWeight: 'bold' }}>Tên sự kiện</h6>
            <h6>{findTicket.tenSuKien}</h6>
          </div>
          <div className="d-flex mt-3">
            <h6 style={{ width: 150, fontWeight: 'bold', marginTop: 8 }}>Hạn sử dụng</h6>
            <DatePicker
              onChange={onChangeNewDate}
              value={dayjs(newDate, dateFormatList[0])}
              format={dateFormatList}
            />
          </div>
        </>
      ) : (
        ''
      )}
    </Modal>
  );
}
