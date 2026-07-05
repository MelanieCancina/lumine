// Catálogo semilla de Lumine.
// Se usa para poblar la base SQLite la primera vez que se abre la app.
// Cada producto se muestra con un placeholder de marca (color + ícono de su
// categoría); el campo `imagen` es opcional y, si existe, se muestra la foto real.

export const categorias = [
  { id: "cuadros", nombre: "Cuadros", icono: "image-frame" },
  { id: "plantas", nombre: "Plantas", icono: "flower-tulip-outline" },
  { id: "iluminacion", nombre: "Iluminación", icono: "lamp" },
  { id: "muebles", nombre: "Muebles", icono: "sofa-outline" },
  { id: "textil", nombre: "Textil & Deco", icono: "bed-outline" },
  { id: "bazar", nombre: "Bazar / Cocina", icono: "silverware-fork-knife" },
];

// Tono del placeholder por categoría (cuando no hay foto).
export const tintesCategoria = {
  cuadros: "#EDE6DA",
  plantas: "#E4EADD",
  iluminacion: "#F1E9D8",
  muebles: "#EAE3D8",
  textil: "#F0E4E0",
  bazar: "#E6E8E6",
};

export const productos = [
  // Cuadros
  { id: "cua-01", nombre: "Cuadro abstracto beige", categoria: "cuadros", precio: 18900, precioAnterior: 27000, badge: "-30%", destacado: 1, envioGratis: 1, descripcion: "Lámina abstracta en tonos tierra con marco de madera clara. Aporta calidez y un punto focal sereno a cualquier ambiente." },
  { id: "cua-02", nombre: "Set de 3 láminas botánicas", categoria: "cuadros", precio: 24500, precioAnterior: null, badge: null, destacado: 0, envioGratis: 1, descripcion: "Trío de láminas botánicas en blanco y negro. Ideal para componer una pared de galería sobre el sillón o el escritorio." },
  { id: "cua-03", nombre: "Cuadro lienzo paisaje", categoria: "cuadros", precio: 31200, precioAnterior: 39000, badge: "-20%", destacado: 0, envioGratis: 0, descripcion: "Lienzo texturado con paisaje minimalista en arena y arcilla. Bastidor de 60x80 cm listo para colgar." },

  // Plantas
  { id: "pla-01", nombre: "Monstera en maceta de cerámica", categoria: "plantas", precio: 22900, precioAnterior: null, badge: "Nuevo", destacado: 1, envioGratis: 0, descripcion: "Monstera deliciosa de 60 cm en maceta de cerámica mate. Bajo mantenimiento y mucho impacto verde." },
  { id: "pla-02", nombre: "Planta artificial eucalipto", categoria: "plantas", precio: 12400, precioAnterior: null, badge: null, destacado: 0, envioGratis: 1, descripcion: "Rama de eucalipto artificial de tacto realista. Perfecta para floreros altos sin necesidad de riego." },
  { id: "pla-03", nombre: "Set de 2 cactus decorativos", categoria: "plantas", precio: 9800, precioAnterior: 14000, badge: "-30%", destacado: 0, envioGratis: 0, descripcion: "Dúo de cactus en macetas de terracota pequeñas. Suman textura sobre estantes y mesas de luz." },

  // Iluminación
  { id: "ilu-01", nombre: "Lámpara de mesa lino", categoria: "iluminacion", precio: 32500, precioAnterior: null, badge: "Nuevo", destacado: 1, envioGratis: 0, descripcion: "Lámpara de mesa con pantalla de lino natural y base de madera. Luz cálida y difusa para rincones de lectura." },
  { id: "ilu-02", nombre: "Guirnalda de luces cálidas", categoria: "iluminacion", precio: 8900, precioAnterior: null, badge: null, destacado: 0, envioGratis: 1, descripcion: "Diez metros de luces LED cálidas para interior. Crean un ambiente acogedor en balcones y cabeceras." },
  { id: "ilu-03", nombre: "Velador colgante mimbre", categoria: "iluminacion", precio: 27800, precioAnterior: 34000, badge: "-18%", destacado: 1, envioGratis: 0, descripcion: "Lámpara colgante tejida en mimbre natural. Proyecta sombras orgánicas y aporta un aire boho cálido." },

  // Muebles
  { id: "mue-01", nombre: "Mesa ratona nórdica", categoria: "muebles", precio: 64900, precioAnterior: 82000, badge: "-20%", destacado: 1, envioGratis: 1, descripcion: "Mesa ratona de madera maciza con líneas nórdicas y patas cónicas. 90x50 cm, acabado natural." },
  { id: "mue-02", nombre: "Banqueta de madera y junco", categoria: "muebles", precio: 38500, precioAnterior: null, badge: null, destacado: 0, envioGratis: 1, descripcion: "Banqueta con asiento de junco trenzado y estructura de madera. Suma a la barra de la cocina o al tocador." },
  { id: "mue-03", nombre: "Estante flotante roble", categoria: "muebles", precio: 15900, precioAnterior: null, badge: "Nuevo", destacado: 0, envioGratis: 0, descripcion: "Estante flotante de roble de 60 cm con herrajes ocultos. Ideal para libros, plantas y objetos decorativos." },

  // Textil & Deco
  { id: "tex-01", nombre: "Almohadón de lino arena", categoria: "textil", precio: 11900, precioAnterior: null, badge: "Nuevo", destacado: 0, envioGratis: 0, descripcion: "Almohadón de lino lavado color arena, 45x45 cm con relleno incluido. Textura suave y look relajado." },
  { id: "tex-02", nombre: "Manta de algodón trenzado", categoria: "textil", precio: 21500, precioAnterior: 28000, badge: "-23%", destacado: 1, envioGratis: 1, descripcion: "Manta tejida en algodón con flecos. Abriga el sillón y aporta capas de textura en tonos crudos." },
  { id: "tex-03", nombre: "Camino de mesa beige", categoria: "textil", precio: 8400, precioAnterior: null, badge: null, destacado: 0, envioGratis: 0, descripcion: "Camino de mesa de algodón con detalle de fleco. Viste la mesa del comedor con un gesto sencillo." },

  // Bazar / Cocina
  { id: "baz-01", nombre: "Set de tazas de cerámica", categoria: "bazar", precio: 13900, precioAnterior: null, badge: "Nuevo", destacado: 1, envioGratis: 0, descripcion: "Juego de 4 tazas de cerámica esmaltada en tonos tierra. Hechas a mano, cada una con su matiz único." },
  { id: "baz-02", nombre: "Tabla de madera para servir", categoria: "bazar", precio: 16800, precioAnterior: 21000, badge: "-20%", destacado: 0, envioGratis: 1, descripcion: "Tabla de madera de paraíso con manija. Perfecta para tablas de quesos y picadas de fin de semana." },
  { id: "baz-03", nombre: "Frasco de vidrio con tapa bambú", categoria: "bazar", precio: 6900, precioAnterior: null, badge: null, destacado: 0, envioGratis: 0, descripcion: "Frasco hermético de vidrio con tapa de bambú. Orden y estética natural para la alacena." },
];

export default { categorias, tintesCategoria, productos };
