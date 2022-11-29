import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsloading } from './isLoading.slice';



// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const dataSlice = createSlice({
		name: 'data',
    initialState: [],
    reducers: {
        setData: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsThunk = () => (dispach) => {
    dispach(setIsloading(true));
    axios
        .get('https://e-commerce-api.academlo.tech/api/v1/products/')
        .then(res => dispach(setData(res.data.data.products)))
        .finally(() => dispach(setIsloading(false)))
}

export const filterThunk = (id) => (dispach) => {
    dispach(setIsloading(true));
    axios
        .get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then(res => dispach(setData(res.data.data.products)))
        .finally(() => dispach(setIsloading(false)))
}

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;