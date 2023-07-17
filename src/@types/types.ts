import { CheckboxValueType } from 'antd/es/checkbox/Group';

export interface ticketsInterface {
  bookingCode: string;
  id: string | any;
  tenSuKien: string;
  tinhTrang: boolean;
  ngaySuDung: string;
  ngayXuat: string;
  congCheckIn: string;
  type: string;
}
export interface addTicketsInterface {
  bookingCode: string;
  tenSuKien: string;
  tinhTrang: boolean;
  ngaySuDung: Date;
  ngayXuat: Date;
  congCheckIn: string;
  type: string;
}
export interface updateTicketsInterface {
  id: string | any;
  ngaySuDung: Date;
}
export interface servicesInterface {
  id: string | any;
  combo: number;
  serviceId: string;
  serviceName: string;
  state: boolean;
  ngaySuDung: string;
  gioSuDung: string;
  ngayHetHan: string;
  gioHetHan: string;
  price: number;
}
export interface updateServicesInterface {
  id: string;
  combo: number;
  serviceId: string;
  serviceName: string;
  state: boolean;
  ngaySuDung: Date;
  ngayHetHan: Date;
  price: number;
}
export interface addServicesInterface {
  combo: number;
  serviceId: string;
  serviceName: string;
  state: boolean;
  ngaySuDung: Date;
  ngayHetHan: Date;
  price: number;
}
export interface eventsInterface {
  eventName: string;
  ngaySuDung: string;
  state: boolean;
}
export interface listTicketsInterface {
  tickets: ticketsInterface[];
  services: servicesInterface[];
  events: eventsInterface[];
}
export interface modalFilter {
  HandleClickModalOpen: () => void;
  HandleClickFilter: (
    fromDate: string,
    toDate: string,
    value: number,
    checkedList: CheckboxValueType[],
  ) => void;
  open: boolean;
}
export interface modalUpdate {
  HandleClickModalUpdate: () => void;
  HandleClickUpdate: (newDate: string) => void;
  openUpdate: boolean;
  ticketId: string;
}
export interface openModalUpdate {
  HandleOpenModalUpdate: (id: any) => void;
  typeTicket: string;
  inputSearch: string;
  fromDate: string;
  toDate: string;
  value: number;
  checkedList: CheckboxValueType[];
}
export interface openModalAddService {
  HandleClickModalAddService: () => void;
  HandleClickAdd: (
    fromDate: string,
    fromTime: string,
    toDate: string,
    toTime: string,
    priceCombo: number,
    serviceId: string,
    serviceName: string,
    state: string,
    price: number,
  ) => void;
  openAddService: boolean;
}
export interface openModalUpdateService {
  HandleClickModalUpdateService: () => void;
  HandleClickUpdate: (
    fromDate: string,
    fromTime: string,
    toDate: string,
    toTime: string,
    priceCombo: number,
    serviceId: string,
    serviceName: string,
    state: string,
    price: number,
  ) => void;
  openUpdateService: boolean;
  id: string;
}
export interface modalUpdateService {
  HandleClickUpdateService: (id: any) => void;
  inputSearch: string;
}
export interface checkTicket {
  inputSearch: string;
  filterFromDate: Date | undefined;
  filterToDate: Date | undefined;
  radioState: number;
}
