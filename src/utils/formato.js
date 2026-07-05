// Formateo de precios en pesos argentinos (separador de miles con punto).

export function formatearPrecio(valor) {
  if (valor == null || isNaN(valor)) return "$0";
  return "$" + Math.round(valor).toLocaleString("es-AR");
}

// Cuotas sin interés sugeridas (estilo DecoHome): 6 cuotas.
export function etiquetaCuotas(valor, cuotas = 6) {
  const cada = valor / cuotas;
  return `${cuotas} cuotas de ${formatearPrecio(cada)}`;
}

export default { formatearPrecio, etiquetaCuotas };
