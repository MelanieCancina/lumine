// Capa de persistencia local con SQLite (expo-sqlite).
//
// Modelado de datos (3 tablas):
//   productos  → catálogo cacheado (se siembra al primer arranque)
//   carrito    → ítems del carrito (id del producto + cantidad)
//   favoritos  → ids de productos marcados con ♥
//
// Esto garantiza que el catálogo, el carrito y los favoritos estén disponibles
// sin conexión: la app lee siempre de SQLite (no de la red).

import * as SQLite from "expo-sqlite";
import { productos as productosSemilla } from "../datos/productos";

// Subir este número cada vez que cambie el catálogo semilla: la tabla
// productos se vuelve a sembrar sin tocar el carrito ni los favoritos.
const VERSION_CATALOGO = 2;

let dbPromesa = null;

function obtenerDB() {
  if (!dbPromesa) dbPromesa = SQLite.openDatabaseAsync("lumine.db");
  return dbPromesa;
}

// Crea las tablas (si no existen) y siembra el catálogo la primera vez.
export async function inicializarBaseDatos() {
  const db = await obtenerDB();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS productos (
      id TEXT PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      categoria TEXT NOT NULL,
      precio INTEGER NOT NULL,
      precioAnterior INTEGER,
      badge TEXT,
      destacado INTEGER DEFAULT 0,
      envioGratis INTEGER DEFAULT 0,
      descripcion TEXT
    );
    CREATE TABLE IF NOT EXISTS carrito (
      id TEXT PRIMARY KEY NOT NULL,
      cantidad INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS favoritos (
      id TEXT PRIMARY KEY NOT NULL
    );
  `);

  // Sembrar (o re-sembrar) el catálogo cuando la versión guardada quedó vieja.
  const fila = await db.getFirstAsync("PRAGMA user_version");
  if (!fila || fila.user_version < VERSION_CATALOGO) {
    await db.withTransactionAsync(async () => {
      await db.execAsync("DELETE FROM productos");
      for (const p of productosSemilla) {
        await db.runAsync(
          `INSERT INTO productos
            (id, nombre, categoria, precio, precioAnterior, badge, destacado, envioGratis, descripcion)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.id, p.nombre, p.categoria, p.precio, p.precioAnterior, p.badge, p.destacado, p.envioGratis, p.descripcion]
        );
      }
    });
    await db.execAsync(`PRAGMA user_version = ${VERSION_CATALOGO}`);
  }
}

// --- Catálogo ---
export async function obtenerProductos() {
  const db = await obtenerDB();
  return db.getAllAsync("SELECT * FROM productos");
}

// --- Carrito ---
// Devuelve los ítems con todos los datos del producto + cantidad.
export async function obtenerCarrito() {
  const db = await obtenerDB();
  return db.getAllAsync(`
    SELECT p.*, c.cantidad
    FROM carrito c
    JOIN productos p ON p.id = c.id
  `);
}

// Reemplaza el carrito guardado por el estado actual (last-write-wins).
export async function guardarCarrito(items) {
  const db = await obtenerDB();
  await db.withTransactionAsync(async () => {
    await db.execAsync("DELETE FROM carrito");
    for (const it of items) {
      await db.runAsync("INSERT INTO carrito (id, cantidad) VALUES (?, ?)", [it.id, it.cantidad]);
    }
  });
}

// --- Favoritos ---
export async function obtenerFavoritos() {
  const db = await obtenerDB();
  const filas = await db.getAllAsync("SELECT id FROM favoritos");
  return filas.map((f) => f.id);
}

export async function guardarFavoritos(ids) {
  const db = await obtenerDB();
  await db.withTransactionAsync(async () => {
    await db.execAsync("DELETE FROM favoritos");
    for (const id of ids) {
      await db.runAsync("INSERT INTO favoritos (id) VALUES (?)", [id]);
    }
  });
}

export default {
  inicializarBaseDatos,
  obtenerProductos,
  obtenerCarrito,
  guardarCarrito,
  obtenerFavoritos,
  guardarFavoritos,
};
