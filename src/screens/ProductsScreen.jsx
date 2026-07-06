// Catálogo navegable: filtro por categoría (chips) + búsqueda en vivo.
// Lista dinámica que se actualiza según el filtro y el texto buscado.

import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import SearchBar from "../componentes/SearchBar";
import GrillaProductos from "../componentes/GrillaProductos";
import EstadoVacio from "../componentes/EstadoVacio";
import { categorias } from "../datos/productos";
import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/globalStyles";

export default function ProductsScreen({ navigation, route }) {
  const productos = useSelector((state) => state.productos.items);
  const [categoriaActiva, setCategoriaActiva] = useState(route.params?.categoria || "todas");
  const [busqueda, setBusqueda] = useState("");

  const filtros = [{ id: "todas", nombre: "Todas" }, ...categorias];

  const resultados = productos.filter((p) => {
    const coincideCategoria = categoriaActiva === "todas" || p.categoria === categoriaActiva;
    const q = busqueda.trim().toLowerCase();
    // Buscamos sólo por nombre (no por descripción) para que los resultados
    // sean intuitivos: "lámpara" trae lámparas, no productos que la mencionan.
    const coincideBusqueda = !q || p.nombre.toLowerCase().includes(q);
    return coincideCategoria && coincideBusqueda;
  });

  const irAProducto = (producto) => navigation.navigate("DetalleProducto", { id: producto.id });

  return (
    <SafeAreaView style={styles.pantalla} edges={["top"]}>
      <Text style={styles.titulo}>Productos</Text>

      <View style={styles.buscadorWrap}>
        <SearchBar valor={busqueda} onChangeText={setBusqueda} autoFocus={route.params?.enfocarBusqueda} />
      </View>

      {/* Chips en scroll horizontal: cada chip toma su ancho natural sin
          límite, así el texto nunca se corta (estilo tienda de deco). */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={styles.chipsWrap}
      >
        {filtros.map((f) => {
          const activo = categoriaActiva === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setCategoriaActiva(f.id)}
              style={[styles.chip, activo && styles.chipActivo]}
            >
              <Text allowFontScaling={false} numberOfLines={1} style={[styles.chipTexto, activo && styles.chipTextoActivo]}>
                {f.nombre.replace(/ /g, " ") + " "}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {resultados.length === 0 ? (
        <EstadoVacio icono="search-outline" titulo="Sin resultados" subtitulo="Probá con otra categoría o búsqueda." />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: spacing.md, paddingBottom: spacing.xxl }}>
          <GrillaProductos productos={resultados} onPressProducto={irAProducto} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  titulo: { fontSize: 26, fontWeight: "700", color: colors.textoPrimario, paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.sm },
  buscadorWrap: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  // Altura fija: los ScrollView horizontales no siempre miden bien la altura
  // de sus hijos y aplastan los chips.
  chipsWrap: { flexGrow: 0, flexShrink: 0, height: 56 },
  chips: { flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.xl, gap: spacing.sm },
  chip: { paddingHorizontal: spacing.lg, paddingVertical: 8, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.bordeFuerte, backgroundColor: colors.superficie },
  chipActivo: { backgroundColor: colors.oscuro, borderColor: colors.oscuro },
  chipTexto: { fontSize: 13, color: colors.textoSecundario, paddingHorizontal: 2 },
  chipTextoActivo: { color: colors.blanco, fontWeight: "600" },
});
