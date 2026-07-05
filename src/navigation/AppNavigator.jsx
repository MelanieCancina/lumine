// Navegación de la app.
//   - Tabs inferiores: Inicio · Productos · Carrito · Perfil
//   - Stack por encima: Detalle de producto (se abre sobre los tabs)

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/ProductsScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DetalleProductoScreen from "../screens/DetalleProductoScreen";
import { selectCantidadTotal } from "../store/carritoSlice";
import { colors } from "../styles/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const temaNav = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.fondo, card: colors.fondo },
};

const ICONOS_TAB = {
  Inicio: ["home", "home-outline"],
  Productos: ["grid", "grid-outline"],
  Carrito: ["bag-handle", "bag-handle-outline"],
  Perfil: ["person", "person-outline"],
};

function Tabs() {
  const cantidad = useSelector(selectCantidadTotal);
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.textoPrimario,
        tabBarInactiveTintColor: colors.textoTenue,
        tabBarStyle: {
          backgroundColor: colors.superficie,
          borderTopColor: colors.borde,
          // Sumamos el inset inferior para no quedar tapados por los botones
          // de navegación del teléfono.
          height: 62 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 10 },
        tabBarIcon: ({ focused, color, size }) => {
          const [activo, inactivo] = ICONOS_TAB[route.name];
          return <Ionicons name={focused ? activo : inactivo} size={size - 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Productos" component={ProductsScreen} />
      <Tab.Screen
        name="Carrito"
        component={CartScreen}
        options={{ tabBarBadge: cantidad > 0 ? cantidad : undefined }}
      />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={temaNav}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.fondo },
          headerShadowVisible: false,
          headerTintColor: colors.textoPrimario,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.fondo },
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="DetalleProducto" component={DetalleProductoScreen} options={{ title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
