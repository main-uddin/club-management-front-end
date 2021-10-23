import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Member {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateMember {
  name: string;
  phone: string;
  email: string;
  address: string;
  _id: string;
}

interface MemberSlice {
  members: Member[];
  selectedMember: UpdateMember;
}

const initialState: MemberSlice = {
  members: [],
  selectedMember: {
    name: '',
    phone: '',
    email: '',
    address: '',
    _id: '',
  },
};

export const addMember = createAsyncThunk(
  'member/add',
  async (query: any, { dispatch }) => {
    return await axios({
      method: 'POST',
      url: 'http://localhost:4000/add',
      data: { ...query },
    }).then(() => dispatch(getMember()));
  },
);

export const getMember = createAsyncThunk<
  Member[],
  void,
  { fulfilledMeta: any }
>('member/get', async (_, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await fetch(`http://localhost:4000/allmembers`);
    const data = await response.json();
    return fulfillWithValue(data, null);
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const deleteMember = createAsyncThunk(
  'member/delete',
  async (query: string, { dispatch }) => {
    return await axios({
      method: 'DELETE',
      url: 'http://localhost:4000/remove',
      data: { id: query },
    }).then(() => dispatch(getMember()));
  },
);

export const updateMemberSlice = createAsyncThunk(
  'member/update',
  async (query: UpdateMember, { dispatch }) => {
    return await axios({
      method: 'PUT',
      url: 'http://localhost:4000/update',
      data: { ...query },
    }).then(() => dispatch(getMember()));
  },
);

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    getSelectedMember: (state, action: PayloadAction<UpdateMember>) => {
      state.selectedMember = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getMember.fulfilled, (state, action) => {
      state.members = action.payload;
    });
  },
});

interface RootState {
  members: {
    members: MemberSlice | any;
    selectedMember: UpdateMember;
  };
}
export const membersSelector = (state: RootState) => state.members.members;

export const selectedMemberSelector = (state: RootState) =>
  state.members.selectedMember;

export const { getSelectedMember } = membersSlice.actions;

export default membersSlice.reducer;
