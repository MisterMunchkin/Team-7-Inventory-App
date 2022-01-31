export interface Mix {
  id?: string;
  name: string;
  chemicals: Array<ChemicalMix>;
}

export interface ChemicalMix {
  name: string;
  type: string;
  percentage: number;
}
