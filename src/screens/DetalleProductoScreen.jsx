// Detalle de producto: foto, precio, cuotas, descripción y la ACCIÓN PRINCIPAL
// (agregar al carrito), más favorito. Barra de compra fija abajo.

import { useState, useLayoutEffect } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import ImagenProducto from "../componentes/ImagenProducto";
import Badge from "../componentes/Badge";
import ContadorCantidad from "../componentes/ContadorCantidad";
import { agregarAlCarrito } from "../store/carritoSlice";
import { alternarFavorito } from "../store/favoritosSlice";
import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/globalStyles";
import { formatearPrecio, etiquetaCuotas } from "../utils/formato";

export default function DetalleProductoScreen({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const producto = useSelector((state) => state.productos.items.find((p) => p.id === id));
  const esFavorito = useSelector((state) => state.favoritos.ids.includes(id));

  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () =>
        producto ? (
          <Pressable onPress={() => dispatch(alternarFavorito(producto.id))} hitSlop={8} style={{ marginRight: 4 }}>
            <Ionicons
              name={esFavorito ? "heart" : "heart-outline"}
              size={22}
              color={esFavorito ? colors.terracota : colors.textoPrimario}
            />
          </Pressable>
        ) : null,
    });
  }, [navigation, producto, esFavorito, dispatch]);

  if (!producto) {
    return (
      <SafeAreaView style={styles.pantalla}>
        <Text style={styles.noEncontrado}>Producto no encontrado.</Text>
      </SafeAreaView>
    );
  }

  const variante = producto.badge === "Nuevo" ? "nuevo" : "descuento";

  function agregar() {
    dispatch(agregarAlCarrito({ producto, cantidad }));
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1600);
  }

  return (
    <SafeAreaView style={styles.pantalla} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={styles.imagenWrap}>
          <ImagenProducto producto={producto} tamanoIcono={64} />
          {producto.badge ? <Badge texto={producto.badge} variante={variante} estilo={styles.badge} /> : null}
        </View>

        <View style={styles.cuerpo}>
          <Text style={styles.nombre}>{producto.nombre}</Text>

          <View style={styles.filaPrecio}>
            <Text style={styles.precio}>{formatearPrecio(producto.precio)}</Text>
            {producto.precioAnterior ? (
              <Text style={styles.precioAnterior}>{formatearPrecio(producto.precioAnterior)}</Text>
            ) : null}
          </View>
          <Text style={styles.cuotas}>{etiquetaCuotas(producto.precio)} sin interés</Text>

          {producto.envioGratis ? (
            <View style={styles.filaEnvio}>
              <Ionicons name="cube-outline" size={16} color={colors.salvia} />
              <Text style={styles.envio}>Envío gratis a todo el país</Text>
            </View>
          ) : null}

          <View style={styles.divisor} />

          <Text style={styles.tituloSeccion}>Descripción</Text>
          <Text style={styles.descripcion}>{producto.descripcion}</Text>

          <View style={styles.filaCantidad}>
            <Text style={styles.tituloSeccion}>Cantidad</Text>
            <ContadorCantidad
              valor={cantidad}
              onMas={() => setCantidad((c) => c + 1)}
              onMenos={() => setCantidad((c) => Math.max(1, c - 1))}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.barraCompra}>
        <View>
          <Text style={styles.barraLabel}>Total</Text>
          <Text style={styles.barraTotal}>{formatearPrecio(producto.precio * cantidad)}</Text>
        </View>
        <Pressable style={[styles.btnAgregar, agregado && styles.btnAgregado]} onPress={agregar}>
          <Ionicons name={agregado ? "checkmark" : "bag-add-outline"} size={18} color={colors.blanco} />
          <Text style={styles.btnTexto}>{agregado ? "Agregado" : "Agregar al carrito"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  noEncontrado: { padding: spacing.xl, color: colors.textoSecundario },
  imagenWrap: { height: 300, backgroundColor: colors.superficieAlt, position: "relative" },
  badge: { position: "absolute", top: spacing.lg, left: spacing.lg },
  cuerpo: { padding: spacing.xl, gap: spacing.sm },
  nombre: { fontSize: 22, fontWeight: "700", color: colors.textoPrimario, lineHeight: 28 },
  filaPrecio: { flexDirection: "row", alignItems: "baseline", gap: spacing.sm, marginTop: spacing.xs },
  precio: { fontSize: 24, fontWeight: "700", color: colors.textoPrimario },
  precioAnterior: { fontSize: 14, color: colors.textoTenue, textDecorationLine: "line-through" },
  cuotas: { fontSize: 13, color: colors.salvia, fontWeight: "700" },
  filaEnvio: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.xs },
  envio: { fontSize: 13, color: colors.textoSecundario },
  divisor: { height: 1, backgroundColor: colors.borde, marginVertical: spacing.lg },
  tituloSeccion: { fontSize: 15, fontWeight: "700", color: colors.textoPrimario },
  descripcion: { fontSize: 14, color: colors.textoSecundario, lineHeight: 21, marginTop: 4 },
  filaCantidad: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg },
  barraCompra: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: colors.superficie, borderTopWidth: 1, borderTopColor: colors.borde,
    paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xl,
  },
  barraLabel: { fontSize: 11, color: colors.textoTenue },
  barraTotal: { fontSize: 18, fontWeight: "700", color: colors.textoPrimario },
  btnAgregar: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: colors.oscuro, paddingHorizontal: spacing.xl, paddingVertical: 13, borderRadius: radius.pill,
  },
  btnAgregado: { backgroundColor: colors.salvia },
  btnTexto: { color: colors.blanco, fontSize: 14, fontWeight: "700" },
});
