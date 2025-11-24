export type AddProps = { text: string };
export type ArrayPropsTypes = { title: string; price: number; length: number };
export type CategoryTypes = { _id: string; category: string };
export type FoodsTypes = {
  _id: string;
  category: CategoryTypes;
  food: string;
  price: number;
  image: string;
  ingredients: string;
};
export type AccountLoginTypes = { email: string; setEmail: string; emailError: string; setEmailError: string };
export type UserTypes = { email: string; password: string; _id: string };
export type OrderItem = {
  _id?: string;
  foodId: string;
  name: string;
  price: number;
  howMuch: number;
  ingredients: string;
  image?: string;
};
export type OrderedFood = {
  _id?: string;
  user: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "canceled" | "delivered";
  location: string;
  createdAt?: string;
  updatedAt?: string;
};
export type EditFoodTypes = { dish: FoodsTypes; categories: CategoryTypes[] };
