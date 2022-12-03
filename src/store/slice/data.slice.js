import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsloading } from './isLoading.slice';
import Swal from 'sweetalert2'


export const dataSlice = createSlice({
		name: 'data',
    initialState: [],
    reducers: {
        setData: (state, action) => {
            return action.payload
        },

        filterPrices: (state, action) => {
            const {priceMax, priceMin} = action.payload
            console.log('$', priceMax, priceMin)
            return state.filter(product => product.price > priceMin && product.price < priceMax)
        }
    }
})

//productos en general
export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsloading(true));
    axios
        .get('https://e-commerce-api.academlo.tech/api/v1/products/')
        .then(res => dispatch(setData(res.data.data.products)))
        .finally(() => dispatch(setIsloading(false)))
}


//producto en especifico
export const filterThunk = (id) => (dispatch) => {
    dispatch(setIsloading(true));
    axios
        .get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then(res => dispatch(setData(res.data.data.products)))
        .finally(() => dispatch(setIsloading(false)))
}

//Buscador de producto
export const filterSearchThunk = (inputSearch,setInputSearch) => (dispatch) =>{
    dispatch(setIsloading(true));
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`)
    .then(res => {
        if(res.data = []){
            Swal.fire({
                icon: 'error',
                title: 'Not exist',
                timer: 1500
              })
              setInputSearch(inputSearch = '')
        }else{
            dispatch(setData(res.data.data.products))
        }
    } )
    .catch(error => {
        if(error.response?.status === 404) {
            console.log('?',error.response?.data)
        }else {
            console.log(error.response?.data)
        }
    })
    .finally(() => dispatch(setIsloading(false)))
}



export const { setData, filterPrices } = dataSlice.actions;

export default dataSlice.reducer;