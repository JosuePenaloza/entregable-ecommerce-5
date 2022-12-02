import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsloading } from "./isLoading.slice";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
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

  //const navigate = useNavigate();
    dispatch(setIsloading(true));
    return axios
      .post("https://e-commerce-api.academlo.tech/api/v1/cart",newsProdcut, getConfig())
      .then((res) => dispatch(getCarThunk()))
      .catch(error => {
        if(error.response?.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',   
              })
              //navigate('/login')
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
    .then((res) => dispatch(setCar({})))
    .catch(error => console.log(error.response?.data))
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