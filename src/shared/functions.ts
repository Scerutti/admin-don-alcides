/**
 * Convierte un valor en una cadena de texto o devuelve un valor predeterminado si no es una cadena o es un objeto vacío.
 * 
 * @param {any} value - El valor que se desea convertir a una cadena de texto.
 * @param {string | undefined} defaultValue - (Opcional) El valor predeterminado que se retornará si `value` no es una cadena o es un objeto vacío.
 * @returns {string} Una cadena de texto si `value` es una cadena, o el valor predeterminado si se proporciona, de lo contrario, una cadena vacía.
 */

export default function toString(value: any, defaultValue?: string): string {
  if (value) {
    if (typeof value === 'object' && Object.keys(value).length === 0) {
      if (defaultValue !== undefined && typeof defaultValue === 'string') {
        return defaultValue;
      }
      return '';
    }
    return value.toString();
  }

  if (defaultValue !== undefined && typeof defaultValue === 'string') {
    return defaultValue;
  }

  return '';
}

/**
 * Convierte un input de precio recibido como 99.99 o 99,99 ( "," | ".") y lo paresea a ","
 * 
 * @param {string} amount - El valor que se desea convertir a una cadena de texto.
 * @returns {string} El precio que llega por params parseado con coma
 */
export const parseAmountFormat = (amount: string): string => {
  const parsedAmount = parseFloat(amount.replace(',', '.')).toFixed(2);
  return parsedAmount.replace('.', ',');
};