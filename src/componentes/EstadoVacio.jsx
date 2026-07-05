// Estado vacío reutilizable (carrito vacío, sin favoritos, sin resultados).

import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomButtom from "./CustomButtom";
import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/globalStyles";

export default function EstadoVacio({ icono = "bag-handle-outline", titulo, subtitulo, textoBoton, onBoton }) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.iconoWrap}>
        <Ionicons name={icono} size={34} color={colors.textoTenue} />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
      {textoBoton ? <CustomButtom texto={textoBoton} onPress={onBoton} estilo={{ marginTop: spacing.md }} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { alignItems: "center", justifyContent: "center", padding: spacing.xxl, gap: spacing.sm },
  iconoWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.superficieAlt,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  titulo: { fontSize: 16, fontWeight: "700", color: colors.textoPrimario, textAlign: "center" },
  subtitulo: { fontSize: 13, color: colors.textoSecundario, textAlign: "center", lineHeight: 19 },
});
