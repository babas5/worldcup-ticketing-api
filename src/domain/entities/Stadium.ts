import { City } from "@domain/entities/City";

export class Stadium {
  constructor(
    public name: string,
    public city: City,
    public capacity: number
  ) {

    if (capacity <= 0) {        
      throw new Error("La capacité du stade doit être supérieure à 0.");
    }
  }
}