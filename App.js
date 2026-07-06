// Punto de entrada: provee el store de Redux, inicializa SQLite, hidrata el
// estado y monta la navegación.

import { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { store } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { setProductos } from "./src/store/productosSlice";
import { setCarrito } from "./src/store/carritoSlice";
import { setFavoritos } from "./src/store/favoritosSlice";
import {
  inicializarBaseDatos,
  obtenerProductos,
  obtenerCarrito,
  obtenerFavoritos,
  guardarCarrito,
  guardarFavoritos,
} from "./src/db/db";

// Inicializa la base, hidrata Redux desde SQLite y persiste cambios del
// carrito y favoritos (estrategia last-write-wins).
function Inicializador() {
  const dispatch = useDispatch();
  const hidratado = useRef(false);
  const carrito = useSelector((state) => state.carrito.items);
  const favoritos = useSelector((state) => state.favoritos.ids);

  useEffect(() => {
    (async () => {
      await inicializarBaseDatos();
      const [prods, cart, favs] = await Promise.all([
        obtenerProductos(),
        obtenerCarrito(),
        obtenerFavoritos(),
      ]);
      dispatch(setProductos(prods));
      dispatch(setCarrito(cart));
      dispatch(setFavoritos(favs));
      hidratado.current = true;
    })();
  }, [dispatch]);

  useEffect(() => {
    if (hidratado.current) guardarCarrito(carrito);
  }, [carrito]);

  useEffect(() => {
    if (hidratado.current) guardarFavoritos(favoritos);
  }, [favoritos]);

  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Inicializador />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
