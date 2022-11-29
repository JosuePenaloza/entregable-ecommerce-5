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

export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsloading(true));
    axios
        .get('https://e-commerce-api.academlo.tech/api/v1/products/')
        .then(res => dispatch(setData(res.data.data.products)))
        .finally(() => dispatch(setIsloading(false)))
}

export const filterThunk = (id) => (dispatch) => {
    dispatch(setIsloading(true));
    axios
        .get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then(res => dispatch(setData(res.data.data.products)))
        .finally(() => dispatch(setIsloading(false)))
}

export const filterSearchThunk = (inputSearch) => (dispatch) =>{
    dispatch(setIsloading(true));
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`)
    .then(res => dispatch(setData(res.data.data.products)))
    .catch(error => {
        if(error.response?.status === 404) {
            alert('no existe')
        }else {
            console.log(error.response?.data)
        }
    })
    .finally(() => dispatch(setIsloading(false)))
}



export const { setData } = dataSlice.actions;

export default dataSlice.reducer;