// Imagen de producto con fallback de marca.
// Si el producto tiene `imagen` (URL) la muestra; si no, o si falla la carga,
// renderiza un placeholder con el color de la categoría + su ícono.

import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { categorias, tintesCategoria } from "../datos/productos";
import { colors } from "../styles/colors";

export default function ImagenProducto({ producto, estilo, tamanoIcono = 40 }) {
  const [fallo, setFallo] = useState(false);
  const categoria = categorias.find((c) => c.id === producto.categoria);
  const tinte = tintesCategoria[producto.categoria] || colors.superficieAlt;

  if (producto.imagen && !fallo) {
    return (
      <Image
        source={{ uri: producto.imagen }}
        style={[styles.imagen, estilo]}
        resizeMode="cover"
        onError={() => setFallo(true)}
      />
    );
  }

  return (
    <View style={[styles.placeholder, { backgroundColor: tinte }, estilo]}>
      <MaterialCommunityIcons
        name={categoria?.icono || "image-outline"}
        size={tamanoIcono}
        color="rgba(90, 82, 70, 0.45)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagen: { width: "100%", height: "100%", backgroundColor: colors.superficieAlt },
  placeholder: { width: "100%", height: "100%", alignItems: "center", justifyContent: "center" },
});
