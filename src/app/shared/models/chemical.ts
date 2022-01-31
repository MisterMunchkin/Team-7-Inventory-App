export interface Chemical {
  id?: string;
  name: string;
  type: string;
}

export interface ChemicalGroup {
  name: string;
  chemicals: Array<Chemical>;
}
