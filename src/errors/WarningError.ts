/**
 * Classe de erro customizada para
 * avisos.
 *
 * @author Anthony
 */
export class WarningError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WarningError";
  }
} 