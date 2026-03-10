import { Country } from "@domain/entities/Country";

export class City {
  constructor(
    public name: string,
    public country: Country
  ) {}
}