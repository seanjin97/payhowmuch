export interface Item {
  id: string;
  name: string;
  price: number;
};

export interface StyleProps {
  primary: string;
};

export interface FunctionalProps {
  isConfirmed: boolean;
}
export interface Person {
  id: string;
  name: string;
  items: Item[];
  styleProps: StyleProps;
  subtotal: number;
  functionalProps: FunctionalProps;
  sharedItems: SharingItem[];
};

export interface SharingItem {
  id: string;
  name: string;
  subtotal: number;
  sharers: Person[];
}