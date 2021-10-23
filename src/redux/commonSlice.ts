import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Common {
  isOpenMemberForm: boolean;
  isOpenUpdateForm: boolean;
  isOpenDeleteModal: boolean;
}

const initialState: Common = {
  isOpenMemberForm: false,
  isOpenUpdateForm: false,
  isOpenDeleteModal: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsOpenMemberForm: (state, action: PayloadAction<boolean>) => {
      state.isOpenMemberForm = action.payload;
    },
    setIsOpenUpdateForm: (state, action: PayloadAction<boolean>) => {
      state.isOpenUpdateForm = action.payload;
    },
    setIsOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenDeleteModal = action.payload;
    },
  },
});

interface RootState {
  common: {
    isOpenMemberForm: boolean;
    isOpenUpdateForm: boolean;
    isOpenDeleteModal: boolean;
  };
}
export const isOpenMemberForm = (state: RootState) =>
  state.common.isOpenMemberForm;

export const isOpenUpdateForm = (state: RootState) =>
  state.common.isOpenUpdateForm;

export const isOpenDeleteModal = (state: RootState) =>
  state.common.isOpenDeleteModal;

export const {
  setIsOpenMemberForm,
  setIsOpenUpdateForm,
  setIsOpenDeleteModal,
} = commonSlice.actions;

export default commonSlice.reducer;
