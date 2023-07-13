import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../data/firebase';
import { listTicketsInterface } from '../../@types/types';

export const ticketsRef = query(collection(db, 'tickets'));

export const fetchData = createAsyncThunk(
  'fetchData',
  async (): Promise<listTicketsInterface[]> => {
    const data = await getDocs(ticketsRef);
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
  },
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [] as listTicketsInterface[],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.tickets = action.payload;
    });
  },
});

const { actions, reducer } = ticketsSlice;
export default reducer;
