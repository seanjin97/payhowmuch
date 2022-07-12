export interface Item {
  id: string;
  name: string;
  price: number;
};

export interface StyleProps {
  primary: string;
};

export interface Person {
  id: string;
  name: string;
  items: Item[];
  styleProps: StyleProps,
  subtotal: number
};
