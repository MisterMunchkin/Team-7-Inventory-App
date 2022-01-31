export interface Mix {
  name: string;
  chemicals: Array<ChemicalMix>;
}

export interface ChemicalMix {
  chemicalId: string;
  name: string;
  type: string;
  percentage: number;
}
