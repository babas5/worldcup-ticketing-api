export class FifaCode {
  private value: string;

  constructor(value: string) {
    if (!value || value.length !== 3) {
      throw new Error('Format de code FIFA invalide');
    }
    this.value = value.toUpperCase();
  }

  public getValue(): string {
    return this.value;
  }
}