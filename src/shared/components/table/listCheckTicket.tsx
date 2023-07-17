import { useEffect, useState } from 'react';
import './customTable.scss';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hook';
import { fetchData } from '../../../core/redux';
import ReactPaginate from 'react-paginate';
import { checkTicket, ticketsInterface } from '../../../@types/types';
import { ConvertToTimestamp } from '../../../handleLogic/handle';

export default function ListCheckTicket(props: checkTicket) {
  const [listTickets, setListTickets] = useState<ticketsInterface[]>([]);
  const dispatch = useAppDispatch();
  const listTicketStore = useAppSelector(state => state.tickets.tickets);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const ticketSearch = listTicketStore.filter(ticket => ticket.id.includes(props.inputSearch));

    if (props.filterFromDate && props.filterToDate) {
      const fromDate = props.filterFromDate;
      const toDate = props.filterToDate;
      const filterDate = ticketSearch.filter(ticket => {
        const ngaySuDung: Date = ConvertToTimestamp(ticket.ngaySuDung, '00:00:00');
        if (ngaySuDung >= fromDate && ngaySuDung <= toDate) {
          return ticket;
        }
        return '';
      });

      let filter: ticketsInterface[];
      switch (props.radioState) {
        case 1: {
          filter = filterDate.filter(ticket => ticket.tinhTrang === true);
          break;
        }
        case 2: {
          filter = filterDate.filter(ticket => ticket.tinhTrang === false);
          break;
        }
        default:
          filter = filterDate;
          break;
      }

      setListTickets(filter);
    }
  }, [
    props.inputSearch,
    listTicketStore,
    props.filterFromDate,
    props.filterToDate,
    props.radioState,
  ]);

  //Pagination
  const [NumberPage, setNumberPage] = useState<number>(1);
  const [currentLastPage] = useState<number>(11);
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
            <th scope="col">Số vé</th>
            <th scope="col">Hạn sử dụng</th>
            <th scope="col">Tên loại vé</th>
            <th scope="col">Cổng check - in</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {CurrentProducts.map((ticket: any, index: number) => {
            return (
              <tr key={ticket.id} style={{ height: 54 }}>
                <th scope="row">{index + 1}</th>
                <td>{ticket.id}</td>
                <td>{ticket.ngaySuDung}</td>
                <td>Vé cổng</td>
                <td>{ticket.congCheckIn}</td>
                <td>
                  {ticket.tinhTrang ? (
                    <i style={{ color: 'grey' }}>Đã soát vé</i>
                  ) : (
                    <i style={{ color: 'red' }}>Chưa soát vé</i>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page-products mt-3">
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
