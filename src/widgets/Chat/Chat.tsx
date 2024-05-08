import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { Message } from "../../types/Message";
import { Container, Text } from "@chakra-ui/react";
import MyMessageComp from "../MyMessage/MyMessage";
import MessageComp from "../Message/Message";
import { headingMap } from "../../lib/headingMap";
import { useLocation } from "react-router";

interface ChatProps {
  subscribe: (setMessage: React.Dispatch<React.SetStateAction<Message[]>>) => React.EffectCallback
  height?: number
}

export default memo(function Chat({ subscribe, height }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation()

  const fn = useMemo(() => subscribe(setMessages), [subscribe])

  useEffect(fn, [fn])

  return (
    <Container as="section" height={height} flexGrow={1} overflowY={"auto"} paddingX={'36px'} gap={1} display={'flex'} flexDirection={'column'}>
      <Text textAlign={'center'} fontSize={'20px'} opacity={0.8} paddingBottom={7} paddingTop={4} zIndex={0}>
        Welcome to the {headingMap[location.pathname]}
      </Text>
      {messages.map((elem, index) => (
        <Fragment key={index}>
          {elem.fromUser ? (
            <MyMessageComp {...elem} />
          ) : (
            <MessageComp {...elem} />
          )}
        </Fragment>
      ))}
    </Container>
  );
}
)