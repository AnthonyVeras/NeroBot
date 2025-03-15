/**
 * Classe de erro customizada para
 * parâmetros inválidos.
 *
 * @author Anthony
 */
export class InvalidParameterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidParameterError";
  }
} 