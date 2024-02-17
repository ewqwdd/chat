import Chat from "../widgets/Chat/Chat";
import { useCallback } from "react";
import axios from "axios";
import { Message } from "../types/Message";
import { useUser } from "../widgets/UserContext/useUser";
import WriteMessage from "../widgets/WriteMessage/WriteMessage";

export default function LongPoolingPage() {
  const {user} = useUser()
  
  const subscribe = useCallback(
    (setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
      const fn = async () => {
        if (!user) return;
        try {
          const { data } = await axios.get<Message>(
            import.meta.env.VITE_API + "message"
          );
          const fromUser = data.token === user?.token && data.name === user.name;
          setMessages((prev) => [...prev, { ...data, fromUser }]);
          await fn();
        } catch (err) {
          setTimeout(() => {
            fn();
          }, 500);
        }
      }
      return () => {fn()}
    },
    [user]
  );

  return (
    <>
      <Chat subscribe={subscribe}/>
      <WriteMessage path='message' />
    </>
  );
}
