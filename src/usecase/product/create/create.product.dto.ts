export interface InputCreateProductDto {
  name: string;
  type: string;
  price: number;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}
