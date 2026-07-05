// Banner de campaña en la Home (estilo DecoHome: "Hasta 40% OFF").

import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/globalStyles";

export default function BannerPromo({ onPress }) {
  return (
    <View style={styles.banner}>
      <View style={styles.contenido}>
        <Text style={styles.kicker}>NUEVA TEMPORADA</Text>
        <Text style={styles.titulo}>Hasta 40% OFF</Text>
        <Text style={styles.subtitulo}>en deco para tu living</Text>
        <Pressable style={styles.cta} onPress={onPress}>
          <Text style={styles.ctaTexto}>Ver ofertas</Text>
        </Pressable>
      </View>
      <MaterialCommunityIcons
        name="flower-tulip-outline"
        size={86}
        color="rgba(120, 105, 80, 0.18)"
        style={styles.deco}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: spacing.xl,
    backgroundColor: colors.banner,
    borderRadius: radius.lg,
    padding: spacing.xl,
    overflow: "hidden",
  },
  contenido: { gap: 4 },
  kicker: { fontSize: 11, letterSpacing: 2, color: "#8A7A64" },
  titulo: { fontSize: 26, fontWeight: "700", color: "#3A322A", marginTop: 4 },
  subtitulo: { fontSize: 12, color: colors.textoSecundario },
  cta: { marginTop: spacing.md, alignSelf: "flex-start", backgroundColor: colors.oscuro, paddingHorizontal: spacing.lg, paddingVertical: 8, borderRadius: radius.pill },
  ctaTexto: { color: colors.blanco, fontSize: 12, fontWeight: "700" },
  deco: { position: "absolute", right: 8, bottom: -10 },
});
