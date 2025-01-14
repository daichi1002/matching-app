export type RootStackParamList = {
  userEdit: { user: User };
};

export type Card = {
  id: number;
  image: any;
};

export type User = {
  id: number;
  name: string;
  gender: string;
  birthdate: string;
  age: number;
  image: any;
};
