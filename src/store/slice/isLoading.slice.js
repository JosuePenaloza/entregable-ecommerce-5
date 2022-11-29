import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const loadingSlice = createSlice({
		name: 'loading',
    initialState: false,
    reducers: {
        setIsloading: (state, action) => {
            return action.payload;
        }
    }
})

export const { setIsloading } = loadingSlice.actions;

export default loadingSlice.reducer;