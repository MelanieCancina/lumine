// Slice de favoritos. Guarda sólo los ids; el producto se resuelve del catálogo.

import { createSlice } from "@reduxjs/toolkit";

const favoritosSlice = createSlice({
  name: "favoritos",
  initialState: {
    ids: [],
  },
  reducers: {
    setFavoritos: (state, action) => {
      state.ids = action.payload;
    },
    alternarFavorito: (state, action) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
  },
});

export const { setFavoritos, alternarFavorito } = favoritosSlice.actions;
export default favoritosSlice.reducer;
