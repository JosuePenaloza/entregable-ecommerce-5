import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsloading } from "./isLoading.slice";
import Swal from 'sweetalert2'
export const carSlice = createSlice({
  name: "car",
  initialState: [],
  reducers: {
    setCar: (state, action) => {
      return action.payload;
    }
  }
});

export const getCarThunk = () => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
    .then((res) => dispatch(setCar(res.data.data.cart)))
    .finally(() => dispatch(setIsloading(false)));
};

export const getNewCar = (newsProdcut) => (dispatch) => {
    dispatch(setIsloading(true));
    return axios
      .post("https://e-commerce-api.academlo.tech/api/v1/cart",newsProdcut, getConfig())
      .then((res) => dispatch(getCarThunk()))
      .catch(error => {
        if(error.response?.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                
                
              })
        }else{
            console.log(error.response?.data)
        }
    })
      .finally(() => dispatch(setIsloading(false)));
  };

export const buyCart = () => (dispatch) => {
dispatch(setIsloading(true));
return axios
    .post("https://e-commerce-api.academlo.tech/api/v1/purchases",{}, getConfig())
    .then((res) => dispatch(setCar({}))
 )
    .finally(() => dispatch(setIsloading(false)));
};

export const deleteCart = (id) => (dispatch) => {
    dispatch(setIsloading(true));
    return axios
        .delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then((res) => dispatch(getCarThunk())
     )
        .finally(() => dispatch(setIsloading(false)));
    };
    
  

export const { setCar } = carSlice.actions;

export default carSlice.reducer;