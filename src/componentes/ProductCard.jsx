// Tarjeta de producto para grillas. UI pura: recibe el producto y callbacks.
// La lógica de favoritos/carrito vive en Redux, no acá (separación UI / negocio).

import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ImagenProducto from "./ImagenProducto";
import Badge from "./Badge";
import { colors } from "../styles/colors";
import { spacing, radius } from "../styles/globalStyles";
import { formatearPrecio } from "../utils/formato";

export default function ProductCard({ producto, onPress, esFavorito, onToggleFavorito }) {
  const variante = producto.badge === "Nuevo" ? "nuevo" : "descuento";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imagenWrap}>
        <ImagenProducto producto={producto} tamanoIcono={36} />

        {producto.badge ? <Badge texto={producto.badge} variante={variante} estilo={styles.badge} /> : null}

        <Pressable style={styles.corazon} onPress={onToggleFavorito} hitSlop={8}>
          <Ionicons
            name={esFavorito ? "heart" : "heart-outline"}
            size={18}
            color={esFavorito ? colors.terracota : colors.textoTenue}
          />
        </Pressable>
      </View>

      <View style={styles.cuerpo}>
        <Text style={styles.nombre} numberOfLines={2}>
          {producto.nombre}
        </Text>
        <View style={styles.filaPrecio}>
          <Text style={styles.precio}>{formatearPrecio(producto.precio)}</Text>
          {producto.precioAnterior ? (
            <Text style={styles.precioAnterior}>{formatearPrecio(producto.precioAnterior)}</Text>
          ) : null}
        </View>
        {producto.envioGratis ? <Text style={styles.envio}>Envío gratis</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  imagenWrap: { height: 130, position: "relative" },
  badge: { position: "absolute", top: 8, left: 8 },
  corazon: {
    position: "absolute",
    top: 7,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  cuerpo: { padding: spacing.md, gap: 5 },
  nombre: { fontSize: 13, color: colors.textoPrimario, lineHeight: 17 },
  filaPrecio: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  precio: { fontSize: 14, fontWeight: "700", color: colors.textoPrimario },
  precioAnterior: { fontSize: 11, color: colors.textoTenue, textDecorationLine: "line-through" },
  envio: { fontSize: 10, color: colors.salvia, fontWeight: "700" },
});
