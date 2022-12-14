import { configureStore } from '@reduxjs/toolkit'
import carSlice from './slice/car.slice'
import dataSlice from './slice/data.slice'
import isLoadingSlice from './slice/isLoading.slice'
import purchasesSlice from './slice/purchases.slice'

export default configureStore({
  reducer: {
    loading: isLoadingSlice,
    data: dataSlice,
    purchases: purchasesSlice,
    car: carSlice

	}
})