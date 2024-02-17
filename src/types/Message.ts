export interface Message {
  name: string;
  content: string;
  color?: string;
  fromUser?: boolean
  token: string
}
