import { useCallback, useEffect, useRef } from "react";
import Chat from "../widgets/Chat/Chat";
import WriteMessage from "../widgets/WriteMessage/WriteMessage";
import { Message } from "../types/Message";
import { useUser } from "../widgets/UserContext/useUser";

export default function EventSourcePage() {
  const { user } = useUser();
  const ref = useRef<HTMLTextAreaElement>(null)
  
  const onResize = useCallback(() => {
    const height = window.visualViewport?.height
    if (height) {
      document.getElementById('root')!.style.height = height + 'px'
      
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  const subscribe = useCallback(
    (setMessage: React.Dispatch<React.SetStateAction<Message[]>>) => () => {
      const eventSource = new EventSource(
        import.meta.env.VITE_API + "event-soursing/connect"
      );
      eventSource.onmessage = ({ data }) => {
        if (!user) return;
        data = JSON.parse(data)
        const fromUser = data.token === user?.token && data.name === user.name;
        setMessage((prev) => [...prev, { ...data, fromUser }]);
        return () => {
          eventSource.close();
        };
      };
    },
    [user]
  );

  return (
    <>
      <Chat subscribe={subscribe} />
      <WriteMessage path="event-soursing" ref={ref} />
    </>
  );
}
