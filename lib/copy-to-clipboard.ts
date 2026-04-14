
/**
 * !Esta función es para copiar texto a la clipboard del usuario.
 * @param text - El texto que se va a copiar a la clipboard.
 * @returns True si el texto se copió correctamente, false en caso contrario.
 * @example
 * copyToClipboard("Hello, world!");
 * @returns {Promise<boolean>} True si el texto se copió correctamente, false en caso contrario.
 * @throws {Error} Si el texto no se puede copiar a la clipboard.
 * @throws {Error} Si el navegador no soporta la función de copiar a la clipboard.
 * @throws {Error} Si el texto es inválido.
 */
const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error("Failed to copy text: ", error);
        return false;
    }
}

export { copyToClipboard };