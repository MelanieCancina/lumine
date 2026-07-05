// Carrito: lista de ítems con cantidad editable, total y finalización de compra.
// Estado vacío cuando no hay productos. Persiste en SQLite (ver App.js).

import { View, Text, ScrollView, Pressable, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import ImagenProducto from "../componentes/ImagenProducto";
import ContadorCantidad from "../componentes/ContadorCantidad";
import EstadoVacio from "../componentes/EstadoVacio";
import CustomButtom from "../componentes/CustomButtom";
import { incrementar, decrementar, quitarDelCarrito, vaciarCarrito, selectCantidadTotal, selectPrecioTotal } from "../store/carritoSlice";
import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/globalStyles";
import { formatearPrecio } from "../utils/formato";

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.carrito.items);
  const cantidad = useSelector(selectCantidadTotal);
  const total = useSelector(selectPrecioTotal);

  function finalizar() {
    Alert.alert(
      "¡Gracias por tu compra!",
      `Tu pedido de ${cantidad} producto(s) por ${formatearPrecio(total)} fue registrado.`,
      [{ text: "Listo", onPress: () => dispatch(vaciarCarrito()) }]
    );
  }

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.pantalla} edges={["top"]}>
        <Text style={styles.titulo}>Carrito</Text>
        <View style={styles.vacioWrap}>
          <EstadoVacio
            icono="bag-handle-outline"
            titulo="Tu carrito está vacío"
            subtitulo="Sumá productos del catálogo y van a aparecer acá."
            textoBoton="Explorar catálogo"
            onBoton={() => navigation.navigate("Inicio")}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.pantalla} edges={["top"]}>
      <Text style={styles.titulo}>Carrito</Text>
      <ScrollView contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.miniatura}>
              <ImagenProducto producto={item} tamanoIcono={26} />
            </View>
            <View style={styles.itemCuerpo}>
              <Text style={styles.itemNombre} numberOfLines={2}>{item.nombre}</Text>
              <Text style={styles.itemPrecio}>{formatearPrecio(item.precio)}</Text>
              <View style={styles.itemControles}>
                <ContadorCantidad
                  tamano="sm"
                  valor={item.cantidad}
                  onMas={() => dispatch(incrementar(item.id))}
                  onMenos={() => dispatch(decrementar(item.id))}
                />
                <Pressable onPress={() => dispatch(quitarDelCarrito(item.id))} hitSlop={8}>
                  <Ionicons name="trash-outline" size={18} color={colors.textoTenue} />
                </Pressable>
              </View>
            </View>
            <Text style={styles.itemTotal}>{formatearPrecio(item.precio * item.cantidad)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pie}>
        <View style={styles.filaTotal}>
          <Text style={styles.totalLabel}>Total ({cantidad})</Text>
          <Text style={styles.totalValor}>{formatearPrecio(total)}</Text>
        </View>
        <CustomButtom texto="Finalizar compra" onPress={finalizar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  titulo: { fontSize: 26, fontWeight: "700", color: colors.textoPrimario, paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
  vacioWrap: { flex: 1, justifyContent: "center" },
  lista: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, gap: spacing.md },
  item: { flexDirection: "row", gap: spacing.md, backgroundColor: colors.superficie, borderWidth: 1, borderColor: colors.borde, borderRadius: radius.md, padding: spacing.md },
  miniatura: { width: 70, height: 70, borderRadius: radius.sm, overflow: "hidden", backgroundColor: colors.superficieAlt },
  itemCuerpo: { flex: 1, gap: 4 },
  itemNombre: { fontSize: 13, color: colors.textoPrimario, lineHeight: 17 },
  itemPrecio: { fontSize: 12, color: colors.textoSecundario },
  itemControles: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  itemTotal: { fontSize: 14, fontWeight: "700", color: colors.textoPrimario },
  pie: { borderTopWidth: 1, borderTopColor: colors.borde, backgroundColor: colors.superficie, padding: spacing.xl, gap: spacing.md },
  filaTotal: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  totalLabel: { fontSize: 14, color: colors.textoSecundario },
  totalValor: { fontSize: 22, fontWeight: "700", color: colors.textoPrimario },
});
