// Barra de búsqueda. Puede ser editable (onChangeText) o un botón estático
// que navega a la pantalla de búsqueda (cuando se pasa `onPress` y editable=false).

import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../styles/colors";
import { radius } from "../styles/globalStyles";

export default function SearchBar({
  valor,
  onChangeText,
  onPress,
  editable = true,
  placeholder = "Buscar en Lumine…",
  autoFocus = false,
}) {
  if (!editable && onPress) {
    return (
      <Pressable style={styles.contenedor} onPress={onPress}>
        <Ionicons name="search" size={16} color={colors.textoTenue} />
        <Text style={styles.placeholder}>{placeholder}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Ionicons name="search" size={16} color={colors.textoTenue} />
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textoTenue}
        autoFocus={autoFocus}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.bordeFuerte,
    borderRadius: radius.xl,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  input: { flex: 1, fontSize: 14, color: colors.textoPrimario, padding: 0 },
  placeholder: { flex: 1, fontSize: 14, color: colors.textoTenue },
});
