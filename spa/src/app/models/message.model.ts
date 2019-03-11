export interface Message {
  mine?: boolean;
  created: Date;
  date: string;
  from: string;
  userId: string;
  text: string;
  chatRoom: string;
  like: Number;
  unlike: Number;
}
