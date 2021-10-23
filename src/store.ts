import { configureStore} from '@reduxjs/toolkit'
import membersSlice from './redux/membersSlice'
import commonSlice from './redux/commonSlice'

const store = configureStore({
  reducer: {
    members: membersSlice,
    common: commonSlice
  },
})

// type RootState = ReturnType<Typeof store.getState>


export default store