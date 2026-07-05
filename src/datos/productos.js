// Catálogo semilla de Lumine.
// Se usa para poblar la base SQLite la primera vez que se abre la app.
// Cada producto tiene su foto local en assets/productos (ver imagenesProductos.js);
// si un producto no tuviera foto, se muestra un placeholder de marca
// (color + ícono de su categoría).

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
  { id: "cua-01", nombre: "Cuadro abstracto 60x120", categoria: "cuadros", precio: 18900, precioAnterior: 27000, badge: "-30%", destacado: 1, envioGratis: 1, descripcion: "Cuadro abstracto en tonos tierra, dorado y negro con marco de madera. Aporta calidez y un punto focal sereno sobre el sillón o la cama." },
  { id: "cua-02", nombre: "Cuadro Salt Shapes 62x92", categoria: "cuadros", precio: 24500, precioAnterior: null, badge: null, destacado: 0, envioGratis: 1, descripcion: "Obra texturada en relieve blanco arena con marco de madera clara. Sus curvas orgánicas suman calma y sofisticación a la pared." },
  { id: "cua-03", nombre: "Cuadro Salt Road 62x92", categoria: "cuadros", precio: 31200, precioAnterior: 39000, badge: "-20%", destacado: 0, envioGratis: 0, descripcion: "Lienzo texturado con trazos en relieve y marco de madera clara. Compañero ideal del Salt Shapes para componer una pared de galería." },

  // Plantas
  { id: "pla-01", nombre: "Monstera artificial 45 cm", categoria: "plantas", precio: 22900, precioAnterior: null, badge: "Nuevo", destacado: 1, envioGratis: 0, descripcion: "Monstera deliciosa artificial de 45 cm con maceta incluida. Mucho impacto verde sin ningún mantenimiento." },
  { id: "pla-02", nombre: "Olivo artificial 50 cm", categoria: "plantas", precio: 12400, precioAnterior: null, badge: null, destacado: 0, envioGratis: 1, descripcion: "Olivo artificial de tacto realista con maceta. Aporta un aire mediterráneo a estantes, recibidores y rincones." },
  { id: "pla-03", nombre: "Lazo de amor artificial 30 cm", categoria: "plantas", precio: 9800, precioAnterior: 14000, badge: "-30%", destacado: 0, envioGratis: 0, descripcion: "Planta lazo de amor artificial en maceta blanca. Suma frescura sobre mesas y escritorios sin necesidad de riego." },

  // Iluminación
  { id: "ilu-01", nombre: "Velador Hongo greige", categoria: "iluminacion", precio: 32500, precioAnterior: null, badge: "Nuevo", destacado: 1, envioGratis: 0, descripcion: "Velador de metal con pantalla tipo hongo en tono greige. Luz cálida y difusa para mesas de luz y rincones de lectura." },
  { id: "ilu-02", nombre: "Lámpara LED inalámbrica Stripes", categoria: "iluminacion", precio: 8900, precioAnterior: null, badge: null, destacado: 0, envioGratis: 1, descripcion: "Lámpara LED portátil e inalámbrica a rayas. Se recarga por USB y acompaña cenas, mesas de luz y noches de balcón." },
  { id: "ilu-03", nombre: "Lámpara de pie Portland negra", categoria: "iluminacion", precio: 27800, precioAnterior: 34000, badge: "-18%", destacado: 1, envioGratis: 0, descripcion: "Lámpara de pie de hierro negro con estantes integrados. Ilumina el living y suma apoyo para plantas y objetos." },

  // Muebles
  { id: "mue-01", nombre: "Mesa ratona Sentul álamo", categoria: "muebles", precio: 64900, precioAnterior: 82000, badge: "-20%", destacado: 1, envioGratis: 1, descripcion: "Mesa ratona alargada de madera de álamo, 1,40 x 0,50 m. Líneas simples y cálidas que ordenan el living." },
  { id: "mue-02", nombre: "Mesa de luz Mónaco", categoria: "muebles", precio: 38500, precioAnterior: null, badge: null, destacado: 0, envioGratis: 1, descripcion: "Mesa de luz de madera con cajón y estante inferior. Compacta y noble, lista para acompañar la cama." },
  { id: "mue-03", nombre: "Perchero París", categoria: "muebles", precio: 15900, precioAnterior: null, badge: "Nuevo", destacado: 0, envioGratis: 0, descripcion: "Perchero de pie de madera con brazos escalonados. Orden y estilo escandinavo para la entrada o el dormitorio." },

  // Textil & Deco
  { id: "tex-01", nombre: "Almohadón Bogan beige 50x50", categoria: "textil", precio: 11900, precioAnterior: null, badge: "Nuevo", destacado: 0, envioGratis: 0, descripcion: "Almohadón tejido en tonos beige con franja central, 50x50 cm con relleno incluido. Textura suave y look relajado." },
  { id: "tex-02", nombre: "Manta Ivory con flecos", categoria: "textil", precio: 21500, precioAnterior: 28000, badge: "-23%", destacado: 1, envioGratis: 1, descripcion: "Manta tejida color crudo con flecos. Abriga el sillón y aporta capas de textura en tonos naturales." },
  { id: "tex-03", nombre: "Individual de seagrass 38 cm", categoria: "textil", precio: 8400, precioAnterior: null, badge: null, destacado: 0, envioGratis: 0, descripcion: "Individual redondo de seagrass trenzado a mano. Una base natural que realza platos y bowls en la mesa." },

  // Bazar / Cocina
  { id: "baz-01", nombre: "Taza y plato Copenhague", categoria: "bazar", precio: 13900, precioAnterior: null, badge: "Nuevo", destacado: 1, envioGratis: 0, descripcion: "Taza de cerámica esmaltada con plato a juego. Tonos neutros y terminación artesanal para el café de la mañana." },
  { id: "baz-02", nombre: "Set de utensilios de bamboo", categoria: "bazar", precio: 16800, precioAnterior: 21000, badge: "-20%", destacado: 0, envioGratis: 1, descripcion: "Set de utensilios de cocina de bamboo. Livianos, resistentes y amables con tus ollas y sartenes." },
  { id: "baz-03", nombre: "Frasco hermético con mimbre", categoria: "bazar", precio: 6900, precioAnterior: null, badge: null, destacado: 0, envioGratis: 0, descripcion: "Frasco hermético de vidrio con base de malla de mimbre. Orden y estética natural para la alacena." },
];

export default { categorias, tintesCategoria, productos };
