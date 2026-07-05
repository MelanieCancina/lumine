// Grilla de 2 columnas reutilizable. Conecta cada ProductCard con Redux
// (favoritos) y con la navegación. Se usa en Home, Productos, Favoritos.

import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "./ProductCard";
import { alternarFavorito } from "../store/favoritosSlice";
import { spacing } from "../styles/globalStyles";

export default function GrillaProductos({ productos, onPressProducto }) {
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favoritos.ids);

  return (
    <View style={styles.grilla}>
      {productos.map((producto) => (
        <View style={styles.celda} key={producto.id}>
          <ProductCard
            producto={producto}
            onPress={() => onPressProducto(producto)}
            esFavorito={favoritos.includes(producto.id)}
            onToggleFavorito={() => dispatch(alternarFavorito(producto.id))}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grilla: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: spacing.lg, gap: spacing.md },
  // Sin flexGrow: las cards mantienen su ancho aunque la fila quede impar o con
  // una sola (así no se estiran ni se deforman las imágenes).
  celda: { width: "47.5%" },
});
