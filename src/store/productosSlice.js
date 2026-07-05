// Slice de productos (catálogo). Los datos se cargan desde SQLite al iniciar.

import { createSlice } from "@reduxjs/toolkit";

const productosSlice = createSlice({
  name: "productos",
  initialState: {
    items: [],
    cargando: true,
  },
  reducers: {
    setProductos: (state, action) => {
      state.items = action.payload;
      state.cargando = false;
    },
    setCargando: (state, action) => {
      state.cargando = action.payload;
    },
  },
});

export const { setProductos, setCargando } = productosSlice.actions;
export default productosSlice.reducer;
