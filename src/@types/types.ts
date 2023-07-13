export interface ticketsInterface {
  bookingCode: string;
  id: string | any;
  tenSuKien: string;
  tinhTrang: boolean;
  ngaySuDung: string;
  ngayXuat: string;
  congCheckIn: string;
}
export interface listTicketsInterface {
  tickets: ticketsInterface[];
}
export interface modalFilter {
  HandleClickModalOpen: () => void;
  open: boolean;
}
export interface modalUpdate {
  HandleClickModalUpdate: () => void;
  openUpdate: boolean;
}
export interface openModalUpdate {
  HandleOpenModalUpdate: (id: any) => void;
}
