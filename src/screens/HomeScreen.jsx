// Pantalla principal: header de marca, buscador, banner, categorías, destacados
// y catálogo completo. Los datos vienen de Redux (cargados desde SQLite).

import { View, ScrollView, Text, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import Header from "../componentes/Header";
import SearchBar from "../componentes/SearchBar";
import BannerPromo from "../componentes/BannerPromo";
import CategoryCard from "../componentes/CategoryCard";
import GrillaProductos from "../componentes/GrillaProductos";
import { categorias } from "../datos/productos";
import { selectCantidadTotal } from "../store/carritoSlice";
import { colors } from "../styles/colors";
import { spacing } from "../styles/globalStyles";

export default function HomeScreen({ navigation }) {
  const { items: productos, cargando } = useSelector((state) => state.productos);
  const cantidad = useSelector(selectCantidadTotal);

  const destacados = productos.filter((p) => p.destacado);

  const irAProducto = (producto) => navigation.navigate("DetalleProducto", { id: producto.id });
  const irACategoria = (categoria) => navigation.navigate("Productos", { categoria: categoria.id });

  return (
    <SafeAreaView style={styles.pantalla} edges={["top"]}>
      <Header
        cantidad={cantidad}
        onBuscar={() => navigation.navigate("Productos", { enfocarBusqueda: true })}
        onCarrito={() => navigation.navigate("Carrito")}
      />

      {cargando ? (
        <View style={styles.cargando}>
          <ActivityIndicator color={colors.terracota} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
          <View style={styles.buscadorWrap}>
            <SearchBar editable={false} onPress={() => navigation.navigate("Productos", { enfocarBusqueda: true })} />
          </View>

          <View style={{ marginBottom: spacing.xl }}>
            <BannerPromo onPress={() => navigation.navigate("Productos")} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filaCategorias}
          >
            {categorias.map((cat) => (
              <CategoryCard key={cat.id} categoria={cat} onPress={() => irACategoria(cat)} />
            ))}
          </ScrollView>

          {destacados.length > 0 && (
            <View style={{ marginBottom: spacing.xl }}>
              <Text style={styles.seccion}>Destacados</Text>
              <GrillaProductos productos={destacados} onPressProducto={irAProducto} />
            </View>
          )}

          <Text style={styles.seccion}>Todo el catálogo</Text>
          <GrillaProductos productos={productos} onPressProducto={irAProducto} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  cargando: { flex: 1, alignItems: "center", justifyContent: "center" },
  buscadorWrap: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
  filaCategorias: { paddingHorizontal: spacing.lg, gap: spacing.md, marginBottom: spacing.xl },
  seccion: { fontSize: 18, fontWeight: "700", color: colors.textoPrimario, paddingHorizontal: spacing.xl, marginBottom: spacing.md },
});
