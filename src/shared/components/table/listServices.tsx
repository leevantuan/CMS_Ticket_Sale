import './customTable.scss';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hook';
import { fetchData, fetchDataServices, fetchDataEvents } from '../../../core/redux';
import ReactPaginate from 'react-paginate';

import { AiFillMinusCircle } from 'react-icons/ai';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { modalUpdateService } from '../../../@types/types';

export default function ListServices(props: modalUpdateService) {
  const dispatch = useAppDispatch();
  //set data
  const listServiceStore = useAppSelector(state => state.tickets.services);
  const services = listServiceStore.filter(service =>
    service.serviceId.includes(props.inputSearch),
  );
  //load data
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchDataServices());
    dispatch(fetchDataEvents());
  }, [dispatch]);

  //Pagination
  const [NumberPage, setNumberPage] = useState<number>(1);
  const [currentLastPage] = useState<number>(10);
  let totalPage = Math.ceil(services.length / currentLastPage);
  const indexOfLastPost = NumberPage * currentLastPage;
  const indexOfFistPost = indexOfLastPost - currentLastPage;
  const CurrentProducts = services.slice(indexOfFistPost, indexOfLastPost);
  const handlePageClick = (event: any) => {
    setNumberPage(event.selected + 1);
  };
  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr style={{ backgroundColor: '#F1F4F8' }}>
            <th scope="col">STT</th>
            <th scope="col">Mã gói</th>
            <th scope="col">Tên gói vé</th>
            <th scope="col">Ngày áp dụng</th>
            <th scope="col">Ngày hết hạn</th>
            <th scope="col">Giá vé ( VND/vé )</th>
            <th scope="col">Giá combo ( VND/combo )</th>
            <th scope="col">Tình trạng</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {CurrentProducts.map((service: any, index: number) => {
            return (
              <tr key={service.id}>
                <th scope="row">{index + 1}</th>
                <td>{service.serviceId}</td>
                <td>{service.serviceName}</td>
                <td>
                  {service.ngaySuDung} <br /> {service.gioSuDung}
                </td>
                <td>
                  {service.ngayHetHan} <br /> {service.gioHetHan}
                </td>
                <td>{service.price === 0 ? '-' : service.price}</td>
                <td>{service.combo === 0 ? '-' : service.combo}</td>
                <td>
                  {service.state ? (
                    <button type="button" className="btn btn-outline-success" disabled>
                      <AiFillCheckCircle />
                      Đang áp dụng
                    </button>
                  ) : (
                    <button type="button" className="btn btn-outline-danger" disabled>
                      <AiFillMinusCircle />
                      Tắt
                    </button>
                  )}
                </td>
                <td>
                  <i
                    style={{ color: '#FF993C', cursor: 'pointer' }}
                    onClick={() => props.HandleClickUpdateService(service.id)}
                  >
                    <AiOutlineEdit /> Cập nhập
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page-products">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" > "
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPage}
          previousLabel=" < "
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active-paginate"
        />
      </div>
    </>
  );
}
