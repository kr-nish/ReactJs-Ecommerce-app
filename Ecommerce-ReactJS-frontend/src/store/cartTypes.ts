export type LoadingStatus = "idle" | "loading" | "succeeded" | "failed";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartState {
  cart: Product[];
  status: LoadingStatus;
  error: string | null;
}
