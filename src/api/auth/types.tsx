export type Variables = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_moderator: boolean;
}