import './customManager.scss';
import '../../../view/styles/managerTicket.scss';

import InputSearch from '../../../shared/components/inputSearch/inputSearch';
import ListTicket from '../../../shared/components/table/listTicket';
import ModalFilter from '../../../shared/components/modal/modalFilter';
import ModalUpdate from '../../../shared/components/modal/modalUpdate';

import { AiOutlineFilter } from 'react-icons/ai';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ConvertToTimestamp } from '../../../handleLogic/handle';
import { updateTicketsInterface } from '../../../@types/types';
import { updateDataTickets } from '../../../core/redux';

export default function ManagerTicket() {
  const dispatch = useAppDispatch();
  const listServiceStore = useAppSelector(state => state.tickets.services);

  const [typeTicket, setTypeTicket] = useState<string>('Gói gia đình');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');
  const [inputSearch, setInputSearch] = useState<string>('');

  const [value, setValue] = useState(0);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const HandleClickModalOpen = () => {
    setModalOpen(false);
  };
  const HandleClickModalUpdate = () => {
    setModalUpdate(false);
  };
  const HandleOpenModalUpdate = (id: any) => {
    setModalUpdate(true);
    setTicketId(id);
  };
  //   const ngaySuDung: Date = ConvertToTimestamp('20/07/2023', '00:00:00');
  //   const ngayXuat: Date = ConvertToTimestamp('20/07/2023', '00:00:00');

  //   const newData: addTicketsInterface = {
  //     bookingCode: 'ALT1999GD',
  //     tenSuKien: 'Hội chợ người tiêu dùng 2023',
  //     tinhTrang: false,
  //     ngaySuDung: ngaySuDung,
  //     ngayXuat: ngayXuat,
  //     congCheckIn: 'Cổng 4',
  //     type: 'Gói gia đình',
  //   };

  //   dispatch(addDataTickets(newData));
  // };

  const HandleClickFilter = (
    fromDate: string,
    toDate: string,
    value: number,
    checkedList: CheckboxValueType[],
  ) => {
    setCheckedList(checkedList);
    setFromDate(fromDate);
    setToDate(toDate);
    setValue(value);
    setModalOpen(false);
  };
  const HandleClickUpdate = (newDate: string) => {
    const ngaySuDung: Date = ConvertToTimestamp(newDate, '00:00:00');
    const newData: updateTicketsInterface = {
      id: ticketId,
      ngaySuDung: ngaySuDung,
    };
    dispatch(updateDataTickets(newData));
    setModalUpdate(false);
  };

  return (
    <div className="container-managerTicket" style={{ marginTop: '80px', borderRadius: 18 }}>
      <p className="title-managerTicket pt-4 ps-4">Danh sách vé</p>
      <div className="d-flex ms-4">
        {listServiceStore.map(service => {
          return (
            <h5
              key={service.id}
              className={
                typeTicket === service.serviceName
                  ? 'type-tickets type-tickets-active p-2 me-4'
                  : 'type-tickets p-2 me-4'
              }
              onClick={() => setTypeTicket(service.serviceName)}
            >
              {service.serviceName}
            </h5>
          );
        })}
      </div>
      <div className="navbar-managerTicket m-4 d-flex justify-content-between">
        <InputSearch
          width={446}
          height={48}
          placeholder="Tìm bằng số vé ..."
          HandleInputSearch={e => setInputSearch(e.target.value)}
        />
        <ul>
          <button
            type="button"
            className="btn btn-outline-warning me-4"
            onClick={() => setModalOpen(true)}
          >
            <AiOutlineFilter />
            Lọc vé
          </button>
          <button type="button" className="btn btn-outline-warning">
            Xuất file (.csv)
          </button>
        </ul>
      </div>
      <div className="content-managerTicket m-4">
        <ListTicket
          HandleOpenModalUpdate={HandleOpenModalUpdate}
          typeTicket={typeTicket}
          inputSearch={inputSearch}
          checkedList={checkedList}
          fromDate={fromDate}
          toDate={toDate}
          value={value}
        />
      </div>
      <ModalFilter
        open={modalOpen}
        HandleClickModalOpen={HandleClickModalOpen}
        HandleClickFilter={HandleClickFilter}
      />
      <ModalUpdate
        openUpdate={modalUpdate}
        HandleClickModalUpdate={HandleClickModalUpdate}
        ticketId={ticketId}
        HandleClickUpdate={HandleClickUpdate}
      />
    </div>
  );
}
