// Tokens de espaciado/radio y estilos globales reutilizables.

import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 };
export const radius = { sm: 10, md: 14, lg: 16, xl: 24, pill: 999 };

export const globalStyles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textoPrimario,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textoPrimario,
  },
  textoTenue: {
    fontSize: 13,
    color: colors.textoTenue,
  },
});

export default globalStyles;
