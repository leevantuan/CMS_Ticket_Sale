import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../../data/firebase';
import {
  addServicesInterface,
  addTicketsInterface,
  eventsInterface,
  listTicketsInterface,
  servicesInterface,
  ticketsInterface,
  updateServicesInterface,
  updateTicketsInterface,
} from '../../@types/types';
import { HandleDates, HandleTimes } from '../../handleLogic/handle';

export const ticketsRef = query(collection(db, 'tickets'));
export const servicesRef = query(collection(db, 'services'));
export const eventRef = query(collection(db, 'events'));

export const fetchData = createAsyncThunk('fetchData', async (): Promise<ticketsInterface[]> => {
  const getDatas = await getDocs(ticketsRef);
  const ticketsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

  const data = ticketsData.map((event: any) => {
    const ngayXuatData = event.ngayXuat.toDate();
    const ngayXuat = HandleDates(ngayXuatData);

    const ngaySuDungData = event.ngaySuDung.toDate();
    const ngaySuDung = HandleDates(ngaySuDungData);

    const newData: ticketsInterface = {
      bookingCode: event.bookingCode,
      id: event.id,
      tenSuKien: event.tenSuKien,
      tinhTrang: event.tinhTrang,
      ngaySuDung: ngaySuDung,
      ngayXuat: ngayXuat,
      congCheckIn: event.congCheckIn,
      type: event.type,
    };
    return newData;
  });
  return data;
});
export const updateDataTickets = createAsyncThunk(
  'updateDataTickets',
  async (updateDataTicket: updateTicketsInterface) => {
    await updateDoc(doc(db, 'tickets', `${updateDataTicket.id}`), {
      ...{
        ngaySuDung: updateDataTicket.ngaySuDung,
      },
    });
    const getDatas = await getDocs(ticketsRef);
    const ticketsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = ticketsData.map((event: any) => {
      const ngayXuatData = event.ngayXuat.toDate();
      const ngayXuat = HandleDates(ngayXuatData);

      const ngaySuDungData = event.ngaySuDung.toDate();
      const ngaySuDung = HandleDates(ngaySuDungData);

      const newData: ticketsInterface = {
        bookingCode: event.bookingCode,
        id: event.id,
        tenSuKien: event.tenSuKien,
        tinhTrang: event.tinhTrang,
        ngaySuDung: ngaySuDung,
        ngayXuat: ngayXuat,
        congCheckIn: event.congCheckIn,
        type: event.type,
      };
      return newData;
    });
    return data;
  },
);
export const addDataTickets = createAsyncThunk(
  'addDataTickets',
  async (addDataTickets: addTicketsInterface) => {
    await addDoc(collection(db, 'tickets'), {
      bookingCode: addDataTickets.bookingCode,
      tenSuKien: addDataTickets.tenSuKien,
      tinhTrang: addDataTickets.tinhTrang,
      ngaySuDung: addDataTickets.ngaySuDung,
      ngayXuat: addDataTickets.ngayXuat,
      congCheckIn: addDataTickets.congCheckIn,
      type: addDataTickets.type,
    });

    const getDatas = await getDocs(ticketsRef);
    const ticketsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = ticketsData.map((event: any) => {
      const ngayXuatData = event.ngayXuat.toDate();
      const ngayXuat = HandleDates(ngayXuatData);

      const ngaySuDungData = event.ngaySuDung.toDate();
      const ngaySuDung = HandleDates(ngaySuDungData);

      const newData: ticketsInterface = {
        bookingCode: event.bookingCode,
        id: event.id,
        tenSuKien: event.tenSuKien,
        tinhTrang: event.tinhTrang,
        ngaySuDung: ngaySuDung,
        ngayXuat: ngayXuat,
        congCheckIn: event.congCheckIn,
        type: event.type,
      };
      return newData;
    });
    return data;
  },
);
export const fetchDataServices = createAsyncThunk(
  'fetchDataService',
  async (): Promise<servicesInterface[]> => {
    const getDatas = await getDocs(servicesRef);
    const servicesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
    const data = servicesData.map((event: any) => {
      const ngayHetHanData = event.ngayHetHan.toDate();
      const ngayHetHan = HandleDates(ngayHetHanData);
      const gioHetHan = HandleTimes(ngayHetHanData);

      const ngaySuDungData = event.ngaySuDung.toDate();
      const ngaySuDung = HandleDates(ngaySuDungData);
      const gioSuDung = HandleTimes(ngaySuDungData);

      const newData: servicesInterface = {
        id: event.id,
        combo: event.combo,
        serviceId: event.serviceId,
        serviceName: event.serviceName,
        state: event.state,
        ngaySuDung: ngaySuDung,
        gioSuDung: gioSuDung,
        ngayHetHan: ngayHetHan,
        gioHetHan: gioHetHan,
        price: event.price,
      };
      return newData;
    });
    return data;
  },
);
export const updateDataServices = createAsyncThunk(
  'updateDataServiecs',
  async (updateDataService: updateServicesInterface) => {
    await updateDoc(doc(db, 'services', `${updateDataService.id}`), {
      ...{
        combo: updateDataService.combo,
        serviceId: updateDataService.serviceId,
        serviceName: updateDataService.serviceName,
        state: updateDataService.state,
        ngaySuDung: updateDataService.ngaySuDung,
        ngayHetHan: updateDataService.ngayHetHan,
        price: updateDataService.price,
      },
    });

    const getDatas = await getDocs(servicesRef);
    const servicesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
    const data = servicesData.map((event: any) => {
      const ngayHetHanData = event.ngayHetHan.toDate();
      const ngayHetHan = HandleDates(ngayHetHanData);
      const gioHetHan = HandleTimes(ngayHetHanData);

      const ngaySuDungData = event.ngaySuDung.toDate();
      const ngaySuDung = HandleDates(ngaySuDungData);
      const gioSuDung = HandleTimes(ngaySuDungData);

      const newData: servicesInterface = {
        id: event.id,
        combo: event.combo,
        serviceId: event.serviceId,
        serviceName: event.serviceName,
        state: event.state,
        ngaySuDung: ngaySuDung,
        gioSuDung: gioSuDung,
        ngayHetHan: ngayHetHan,
        gioHetHan: gioHetHan,
        price: event.price,
      };
      return newData;
    });
    return data;
  },
);
export const addDataServices = createAsyncThunk(
  'addDataServices',
  async (addDataService: addServicesInterface) => {
    await addDoc(collection(db, 'services'), {
      combo: addDataService.combo,
      serviceId: addDataService.serviceId,
      serviceName: addDataService.serviceName,
      state: addDataService.state,
      ngaySuDung: addDataService.ngaySuDung,
      ngayHetHan: addDataService.ngayHetHan,
      price: addDataService.price,
    });

    const getDatas = await getDocs(servicesRef);
    const servicesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
    const data = servicesData.map((event: any) => {
      const ngayHetHanData = event.ngayHetHan.toDate();
      const ngayHetHan = HandleDates(ngayHetHanData);
      const gioHetHan = HandleTimes(ngayHetHanData);

      const ngaySuDungData = event.ngaySuDung.toDate();
      const ngaySuDung = HandleDates(ngaySuDungData);
      const gioSuDung = HandleTimes(ngaySuDungData);

      const newData: servicesInterface = {
        id: event.id,
        combo: event.combo,
        serviceId: event.serviceId,
        serviceName: event.serviceName,
        state: event.state,
        ngaySuDung: ngaySuDung,
        gioSuDung: gioSuDung,
        ngayHetHan: ngayHetHan,
        gioHetHan: gioHetHan,
        price: event.price,
      };
      return newData;
    });
    return data;
  },
);

export const fetchDataEvents = createAsyncThunk(
  'fetchDataEvent',
  async (): Promise<eventsInterface[]> => {
    const data = await getDocs(eventRef);
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
  },
);
const initialState: listTicketsInterface = {
  tickets: [],
  services: [],
  events: [],
};
const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.tickets = action.payload;
      })
      .addCase(updateDataTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
      })
      .addCase(addDataTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
      })
      .addCase(fetchDataServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(updateDataServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(addDataServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(fetchDataEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      });
  },
});

const { actions, reducer } = ticketsSlice;
export default reducer;
