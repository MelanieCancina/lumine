import { configureStore } from "@reduxjs/toolkit";

import productosReducer from "./productosSlice.js";
import carritoReducer from "./carritoSlice.js";
import favoritosReducer from "./favoritosSlice.js";
import todosReducer from "./todosslice.js";

export const store = configureStore({
  reducer: {
    productos: productosReducer,
    carrito: carritoReducer,
    favoritos: favoritosReducer,
    todos: todosReducer, // ejercicio de clase (ListaTareas)
  },
});
