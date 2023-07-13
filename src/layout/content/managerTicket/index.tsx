import './customManager.scss';
import '../../../view/styles/managerTicket.scss';

import InputSearch from '../../../shared/components/inputSearch/inputSearch';
import ListTicket from '../../../shared/components/table/listTicket';
import ModalFilter from '../../../shared/components/modal/modalFilter';
import ModalUpdate from '../../../shared/components/modal/modalUpdate';

import { AiOutlineFilter } from 'react-icons/ai';
import { useState } from 'react';

export default function ManagerTicket() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);

  const HandleClickModalOpen = () => {
    setModalOpen(false);
  };
  const HandleClickModalUpdate = () => {
    setModalUpdate(false);
  };
  const HandleOpenModalUpdate = (id: any) => {
    setModalUpdate(true);
  };
  return (
    <div className="container-managerTicket" style={{ marginTop: '80px', borderRadius: 18 }}>
      <p className="title-managerTicket pt-4 ps-4">Danh sách vé</p>
      <div className="navbar-managerTicket m-4 d-flex justify-content-between">
        <InputSearch width={446} height={48} placeholder="Tìm bằng số vé ..." />
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
        <ListTicket HandleOpenModalUpdate={HandleOpenModalUpdate} />
      </div>
      <ModalFilter open={modalOpen} HandleClickModalOpen={HandleClickModalOpen} />
      <ModalUpdate openUpdate={modalUpdate} HandleClickModalUpdate={HandleClickModalUpdate} />
    </div>
  );
}
