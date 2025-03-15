/**
 * Classe de erro customizada para
 * erros críticos.
 *
 * @author Anthony
 */
export class DangerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DangerError";
  }
} 