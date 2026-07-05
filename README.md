# Lumine 🕯️

App móvil de e-commerce de **decoración de interiores** — cuadros, plantas, iluminación, muebles, textiles y bazar — construida en **React Native + Expo** como proyecto final del curso de Desarrollo de Aplicaciones Móviles.

> *Lumine* — del latín *lumen* (luz). Una tienda que ilumina los espacios del hogar.

## ✨ Funcionalidades

- **Catálogo dinámico** con destacados, categorías, filtro por chips y **búsqueda en vivo**
- **Detalle de producto** con precio, cuotas, descripción y selector de cantidad
- **Carrito persistente**: cantidades editables, total en vivo, badge en el tab y finalización de compra
- **Favoritos** con ♥ desde cualquier grilla, listados en el Perfil
- **Perfil** con nombre editable
- **Funcionamiento 100% offline**: catálogo, carrito y favoritos viven en SQLite

## 🛠️ Stack

| Capa | Tecnología |
|------|-----------|
| UI | React Native + Expo |
| Navegación | React Navigation (bottom tabs + native stack) |
| Estado global | Redux Toolkit (slices de productos, carrito y favoritos) |
| Persistencia | SQLite (expo-sqlite) con transacciones y modo WAL |

## 📁 Estructura

```
lumine/
  App.js                  # Punto de entrada: store + SQLite + navegación
  src/
    componentes/          # UI reutilizable (ProductCard, GrillaProductos, ...)
    screens/              # Pantallas (Home, Productos, Detalle, Carrito, Perfil)
    navigation/           # AppNavigator (tabs + stack)
    store/                # Redux Toolkit: slices y selectores
    db/                   # Capa de persistencia SQLite (db.js)
    datos/                # Catálogo semilla y categorías
    styles/               # Paleta de colores y estilos globales
    utils/                # Helpers (formato de precios y cuotas)
```

## 🏛️ Arquitectura

Arquitectura por capas inspirada en **MVVM**:

- **Vista** (`screens/` + `componentes/`): sólo presentación; lee estado con `useSelector` y despacha acciones. Los componentes son "tontos": props + callbacks.
- **Lógica** (`store/`): los slices de Redux concentran las reglas de negocio; los selectores derivan totales sin duplicar estado.
- **Datos** (`db/db.js`): único módulo con acceso a SQLite. Tablas `productos`, `carrito` y `favoritos`; siembra del catálogo en el primer arranque.

## 📴 Persistencia y offline

Estrategia **offline-first**: la fuente de verdad en el dispositivo es SQLite, no la red.

1. Al primer arranque se crean las tablas y se siembra el catálogo.
2. Al iniciar, un `Inicializador` hidrata Redux desde SQLite.
3. Cada cambio de carrito/favoritos se persiste al instante dentro de una transacción (**last-write-wins**).

El carrito y los favoritos se conservan aunque se cierre la app o no haya conexión.

## 🚀 Instalación y ejecución

```bash
npm install
npx expo start
```

Escanear el QR con **Expo Go** (Android/iOS) o presionar `a` para abrir en un emulador Android.

---

Hecho con 🤎 por **Melanie Cancina**
