// Slice del carrito. Cada ítem es el producto completo + cantidad.
// La persistencia en SQLite se hace al suscribirse a los cambios (ver App.js).

import { createSlice } from "@reduxjs/toolkit";

const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    items: [],
  },
  reducers: {
    // Hidratar desde SQLite al iniciar.
    setCarrito: (state, action) => {
      state.items = action.payload;
    },
    agregarAlCarrito: (state, action) => {
      const { producto, cantidad = 1 } = action.payload;
      const existente = state.items.find((it) => it.id === producto.id);
      if (existente) {
        existente.cantidad += cantidad;
      } else {
        state.items.push({ ...producto, cantidad });
      }
    },
    quitarDelCarrito: (state, action) => {
      state.items = state.items.filter((it) => it.id !== action.payload);
    },
    incrementar: (state, action) => {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) it.cantidad += 1;
    },
    decrementar: (state, action) => {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) {
        it.cantidad -= 1;
        if (it.cantidad <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    vaciarCarrito: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCarrito,
  agregarAlCarrito,
  quitarDelCarrito,
  incrementar,
  decrementar,
  vaciarCarrito,
} = carritoSlice.actions;

// Selectores derivados (cantidad total y precio total).
export const selectCantidadTotal = (state) =>
  state.carrito.items.reduce((sum, it) => sum + it.cantidad, 0);
export const selectPrecioTotal = (state) =>
  state.carrito.items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);

export default carritoSlice.reducer;
