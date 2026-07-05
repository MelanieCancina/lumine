// Pastilla pequeña para descuentos ("-30%") o "Nuevo".

import { View, Text, StyleSheet } from "react-native";
import { radius } from "../styles/globalStyles";
import { colors as paleta } from "../styles/colors";

const VARIANTES = {
  descuento: { bg: paleta.terracota, fg: paleta.blanco },
  nuevo: { bg: paleta.salvia, fg: paleta.blanco },
};

export default function Badge({ texto, variante = "descuento", estilo }) {
  const v = VARIANTES[variante] || VARIANTES.descuento;
  return (
    <View style={[styles.badge, { backgroundColor: v.bg }, estilo]}>
      <Text style={[styles.texto, { color: v.fg }]}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, alignSelf: "flex-start" },
  texto: { fontSize: 10, fontWeight: "700" },
});
