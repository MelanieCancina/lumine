// Perfil: tarjeta de usuaria con nombre editable (guardado en AsyncStorage),
// resumen y "Mis favoritos" (los productos con ♥).

import { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GrillaProductos from "../componentes/GrillaProductos";
import EstadoVacio from "../componentes/EstadoVacio";
import { selectCantidadTotal } from "../store/carritoSlice";
import { colors } from "../styles/colors";
import { radius, spacing } from "../styles/globalStyles";

const CLAVE_NOMBRE = "@lumine/nombre";

export default function ProfileScreen({ navigation }) {
  const productos = useSelector((state) => state.productos.items);
  const idsFavoritos = useSelector((state) => state.favoritos.ids);
  const enCarrito = useSelector(selectCantidadTotal);

  const [nombre, setNombre] = useState("Melanie");
  const [editando, setEditando] = useState(false);
  const [borrador, setBorrador] = useState("");

  useEffect(() => {
    (async () => {
      const guardado = await AsyncStorage.getItem(CLAVE_NOMBRE);
      if (guardado) setNombre(guardado);
    })();
  }, []);

  function comenzarEdicion() {
    setBorrador(nombre);
    setEditando(true);
  }

  async function guardar() {
    const limpio = borrador.trim() || "Invitada";
    setNombre(limpio);
    await AsyncStorage.setItem(CLAVE_NOMBRE, limpio);
    setEditando(false);
  }

  const favoritos = productos.filter((p) => idsFavoritos.includes(p.id));
  const irAProducto = (producto) => navigation.navigate("DetalleProducto", { id: producto.id });
  const palabraFav = favoritos.length === 1 ? "favorito" : "favoritos";

  return (
    <SafeAreaView style={styles.pantalla} edges={["top"]}>
      <Text style={styles.titulo}>Perfil</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <View style={styles.tarjeta}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={colors.terracota} />
          </View>

          {editando ? (
            <View style={styles.datos}>
              <TextInput
                style={styles.input}
                value={borrador}
                onChangeText={setBorrador}
                placeholder="Tu nombre"
                placeholderTextColor={colors.textoTenue}
                autoFocus
              />
              <Pressable style={styles.btnGuardar} onPress={guardar}>
                <Text style={styles.btnGuardarTexto}>Guardar</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.datos}>
              <Text style={styles.nombre} numberOfLines={1}>{nombre}</Text>
              <Text style={styles.sub} numberOfLines={1}>
                {favoritos.length} {palabraFav} · {enCarrito} en carrito
              </Text>
            </View>
          )}

          {!editando ? (
            <Pressable onPress={comenzarEdicion} hitSlop={8} style={styles.lapiz}>
              <Ionicons name="create-outline" size={20} color={colors.textoSecundario} />
            </Pressable>
          ) : null}
        </View>

        <Text style={styles.seccion}>Mis favoritos</Text>
        {favoritos.length === 0 ? (
          <EstadoVacio
            icono="heart-outline"
            titulo="Todavía no tenés favoritos"
            subtitulo="Tocá el corazón en cualquier producto para guardarlo acá."
            textoBoton="Explorar catálogo"
            onBoton={() => navigation.navigate("Inicio")}
          />
        ) : (
          <GrillaProductos productos={favoritos} onPressProducto={irAProducto} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  titulo: { fontSize: 26, fontWeight: "700", color: colors.textoPrimario, paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
  tarjeta: {
    flexDirection: "row", alignItems: "center", gap: spacing.lg,
    marginHorizontal: spacing.xl, marginBottom: spacing.xl,
    backgroundColor: colors.superficie, borderWidth: 1, borderColor: colors.borde,
    borderRadius: radius.lg, padding: spacing.lg,
  },
  avatar: { width: 56, height: 56, borderRadius: radius.pill, backgroundColor: colors.superficieAlt, alignItems: "center", justifyContent: "center" },
  datos: { flex: 1, gap: 4 },
  nombre: { fontSize: 17, fontWeight: "700", color: colors.textoPrimario },
  sub: { fontSize: 13, color: colors.textoSecundario },
  input: {
    fontSize: 16, color: colors.textoPrimario, borderBottomWidth: 1,
    borderBottomColor: colors.bordeFuerte, paddingVertical: 4,
  },
  btnGuardar: { alignSelf: "flex-start", backgroundColor: colors.oscuro, paddingHorizontal: spacing.lg, paddingVertical: 7, borderRadius: radius.pill, marginTop: 4 },
  btnGuardarTexto: { color: colors.blanco, fontSize: 12, fontWeight: "700" },
  lapiz: { padding: 4 },
  seccion: { fontSize: 18, fontWeight: "700", color: colors.textoPrimario, paddingHorizontal: spacing.xl, marginBottom: spacing.md },
});
