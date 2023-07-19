import './styles.scss';
import { useState } from 'react';

import InputSearch from '../../shared/components/inputSearch/inputSearch';
import ModalAddService from '../../shared/components/modal/modalServices/modalAddService';
import ListServices from '../../shared/components/table/listServices';
import ModalUpdateService from '../../shared/components/modal/modalServices/modalUpdateService';
import { useAppDispatch } from '../../shared/hooks/hook';
import moment from 'moment';
import { ConvertToTimestamp, SoSanhDate } from '../../handleLogic/handle';
import { addServicesInterface, updateServicesInterface } from '../../@types/types';
import { addDataServices, updateDataServices } from '../../core/redux';

export default function Setting() {
  const dispatch = useAppDispatch();
  const dateNow: string = moment().format('DD/MM/YYYY');
  const timeNow: string = moment().format('HH:MM:SS');
  const [openAddService, setOpenAddService] = useState<boolean>(false);
  const [openUpdateService, setOpenUpdateService] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [inputSearch, setInputSearch] = useState<string>('');
  const HandleClickModalAddService = () => {
    setOpenAddService(false);
  };
  const HandleClickModalUpdateService = () => {
    setOpenUpdateService(false);
  };
  const HandleClickUpdateService = (id: string) => {
    setOpenUpdateService(true);
    setId(id);
  };
  const HandleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };
  //btn update
  const HandleClickUpdate = (
    fromDate: string,
    fromTime: string,
    toDate: string,
    toTime: string,
    priceCombo: number,
    serviceId: string,
    serviceName: string,
    state: string,
    price: number,
    quantity: number,
  ) => {
    const checkNgaySuDung = SoSanhDate(fromDate, dateNow, fromTime, timeNow);
    const checkNgayHetHan = SoSanhDate(toDate, fromDate, toTime, fromTime);

    if (checkNgaySuDung === false) {
      alert('Vui lòng kiểm tra lại thời gian sử dụng!');
    } else if (checkNgayHetHan === false) {
      alert('Vui lòng kiểm tra lại thời gian hết hạn!');
    } else {
      const ngaySuDung: Date = ConvertToTimestamp(fromDate, fromTime);
      const ngayHetHan: Date = ConvertToTimestamp(toDate, toTime);

      const updateData: updateServicesInterface = {
        id: id,
        combo: priceCombo,
        serviceId: serviceId,
        serviceName: serviceName,
        state: state === '1' ? true : false,
        ngaySuDung: ngaySuDung,
        ngayHetHan: ngayHetHan,
        price: price,
        quantity: quantity,
      };
      dispatch(updateDataServices(updateData));
      setOpenUpdateService(false);
    }
  };

  //btn add
  const HandleClickAdd = (
    fromDate: string,
    fromTime: string,
    toDate: string,
    toTime: string,
    priceCombo: number,
    serviceId: string,
    serviceName: string,
    state: string,
    price: number,
    quantity: number,
  ) => {
    const checkNgaySuDung = SoSanhDate(fromDate, dateNow, fromTime, timeNow);
    const checkNgayHetHan = SoSanhDate(toDate, fromDate, toTime, fromTime);
    if (
      fromDate === '' ||
      fromTime === '' ||
      toDate === '' ||
      toTime === '' ||
      serviceId === '' ||
      serviceName === ''
    ) {
      alert('Vui lòng nhập đầy đủ thông tin!');
    } else if (checkNgaySuDung === false) {
      alert('Vui lòng kiểm tra lại thời gian sử dụng!');
    } else if (checkNgayHetHan === false) {
      alert('Vui lòng kiểm tra lại thời gian hết hạn!');
    } else {
      const ngaySuDung: Date = ConvertToTimestamp(fromDate, fromTime);
      const ngayHetHan: Date = ConvertToTimestamp(toDate, toTime);

      const updateData: addServicesInterface = {
        combo: priceCombo,
        serviceId: serviceId,
        serviceName: serviceName,
        state: state === '1' ? true : false,
        ngaySuDung: ngaySuDung,
        ngayHetHan: ngayHetHan,
        price: price,
        quantity: quantity,
      };

      dispatch(addDataServices(updateData));
      setOpenAddService(false);
    }
  };

  return (
    <div className="container-setting" style={{ marginTop: '80px', borderRadius: 18 }}>
      <p className="title-setting m-4 pt-3">Danh sách gói vé</p>
      <div className="m-4 d-flex justify-content-between">
        <InputSearch
          width={446}
          height={48}
          placeholder="Tìm bằng mã gói ..."
          HandleInputSearch={HandleInputSearch}
        />
        <div>
          <button className="btn btn-outline-warning ps-4 pe-4">Xuất file (.csv)</button>
          <button
            className="btn btn-warning ps-4 pe-4 ms-3"
            onClick={() => setOpenAddService(true)}
          >
            Thêm gói vé
          </button>
        </div>
      </div>
      <div className="m-4">
        <ListServices
          HandleClickUpdateService={HandleClickUpdateService}
          inputSearch={inputSearch}
        />
      </div>
      <ModalAddService
        openAddService={openAddService}
        HandleClickModalAddService={HandleClickModalAddService}
        HandleClickAdd={HandleClickAdd}
      />
      <ModalUpdateService
        openUpdateService={openUpdateService}
        HandleClickModalUpdateService={HandleClickModalUpdateService}
        id={id}
        HandleClickUpdate={HandleClickUpdate}
      />
    </div>
  );
}
