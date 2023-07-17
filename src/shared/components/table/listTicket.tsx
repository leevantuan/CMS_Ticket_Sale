import { useEffect, useState } from 'react';
import './customTable.scss';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hook';
import { fetchData } from '../../../core/redux';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { openModalUpdate, ticketsInterface } from '../../../@types/types';

import { AiFillMinusCircle } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiOutlineMore } from 'react-icons/ai';
import { ConvertToTimestamp, SoSanhDateTicket } from '../../../handleLogic/handle';

export default function ListTicket(props: openModalUpdate) {
  const [listTickets, setListTicket] = useState<ticketsInterface[]>([]);
  const dispatch = useAppDispatch();
  const listTicketStore = useAppSelector(state => state.tickets.tickets);
  const dateNow: string = moment().format('DD/MM/YYYY');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const filterType = listTicketStore.filter(ticket => ticket.type === props.typeTicket);
    const inputSearch = filterType.filter(ticket => ticket.id.includes(props.inputSearch));

    const fromDate: Date = ConvertToTimestamp(props.fromDate, '00:00:00');
    const toDate: Date = ConvertToTimestamp(props.toDate, '00:00:00');

    const filterDate = inputSearch.filter(ticket => {
      const ngaySuDung: Date = ConvertToTimestamp(ticket.ngaySuDung, '00:00:00');
      if (ngaySuDung >= fromDate && ngaySuDung <= toDate) {
        return ticket;
      }
      return '';
    });

    let filterValue: ticketsInterface[];
    switch (props.value) {
      case 1: {
        filterValue = filterDate.filter(ticket => ticket.tinhTrang === true);
        break;
      }
      case 2: {
        filterValue = filterDate.filter(ticket => {
          const ngaySuDung: Date = ConvertToTimestamp(ticket.ngaySuDung, '00:00:00');
          const setDateNow: Date = ConvertToTimestamp(dateNow, '00:00:00');
          if (ngaySuDung > setDateNow && ticket.tinhTrang === false) {
            return ticket;
          }
          return null;
        });
        break;
      }
      case 3: {
        filterValue = filterDate.filter(ticket => {
          const ngaySuDung: Date = ConvertToTimestamp(ticket.ngaySuDung, '00:00:00');
          const setDateNow: Date = ConvertToTimestamp(dateNow, '00:00:00');
          if (ngaySuDung < setDateNow) {
            return ticket;
          }
          return null;
        });
        break;
      }
      default:
        filterValue = filterDate;
        break;
    }

    let filter: ticketsInterface[];
    if (props.checkedList.find(check => check === '0')) {
      filter = filterValue;
    } else {
    }
    setListTicket(filterValue);
  }, [
    props.typeTicket,
    listTicketStore,
    props.inputSearch,
    props.fromDate,
    props.toDate,
    props.value,
    props.checkedList,
    dateNow,
  ]);
  //Pagination
  const [NumberPage, setNumberPage] = useState<number>(1);
  const [currentLastPage] = useState<number>(9);
  let totalPage = Math.ceil(listTickets.length / currentLastPage);
  const indexOfLastPost = NumberPage * currentLastPage;
  const indexOfFistPost = indexOfLastPost - currentLastPage;
  const CurrentProducts = listTickets.slice(indexOfFistPost, indexOfLastPost);
  const handlePageClick = (event: any) => {
    setNumberPage(event.selected + 1);
  };
  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr style={{ backgroundColor: '#F1F4F8' }}>
            <th scope="col">STT</th>
            <th scope="col">Booking code</th>
            <th scope="col">Số vé</th>
            <th scope="col">Tên sự kiện</th>
            <th scope="col">Tình trạng sử dụng</th>
            <th scope="col">Ngày sử dụng</th>
            <th scope="col">Ngày xuất vé</th>
            <th scope="col">Cổng check - in</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {CurrentProducts.map((ticket: any, index: number) => {
            const checkNgaySuDung = SoSanhDateTicket(ticket.ngaySuDung, dateNow);
            return (
              <tr key={ticket.id}>
                <th scope="row">{index + 1}</th>
                <td>{ticket.bookingCode}</td>
                <td>{ticket.id}</td>
                <td>{ticket.tenSuKien}</td>
                <td>
                  {!checkNgaySuDung ? (
                    <button type="button" className="btn btn-outline-danger" disabled>
                      <AiFillMinusCircle />
                      Hết hạn
                    </button>
                  ) : ticket.tinhTrang ? (
                    <button type="button" className="btn btn-outline-secondary" disabled>
                      <AiFillCloseCircle />
                      Đã sử dụng
                    </button>
                  ) : (
                    <button type="button" className="btn btn-outline-success" disabled>
                      <AiFillCheckCircle />
                      Chưa sử dụng
                    </button>
                  )}
                </td>
                <td>{ticket.ngaySuDung}</td>
                <td>{ticket.ngayXuat}</td>
                <td>{ticket.congCheckIn}</td>
                <td>
                  {ticket.tinhTrang ? (
                    ''
                  ) : (
                    <button
                      style={{ border: 'none', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      onClick={() => props.HandleOpenModalUpdate(ticket.id)}
                    >
                      <AiOutlineMore />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page-products mt-4">
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
