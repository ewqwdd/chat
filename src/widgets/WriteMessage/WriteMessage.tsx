import { ChatIcon } from "@chakra-ui/icons";
import { Button, Container, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  KeyboardEvent,
  useState,
  MouseEvent
} from "react";
import { useUser } from "../UserContext/useUser";
import disableScroll from "disable-scroll";
import UAparser from "ua-parser-js";

interface WriteMessageProps {
  path: string;
}

const Comp = forwardRef(function WriteMessage(
  { path }: WriteMessageProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const [input, setInput] = useState<string>("");
  const toast = useToast();
  const { user } = useUser();

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  const post = useCallback(async () => {
    if (!user || !input) return;
    try {
      await axios.post(import.meta.env.VITE_API + path, {
        content: input,
        name: user.name,
        token: user.token,
      });
      setInput("");
    } catch (err) {
      console.log(err);
      toast({
        variant: "error",
        title: "Error",
        description: "Something went wrong.",
        isClosable: true,
      });
    }
  }, [input, toast, user, path]);

  const onEnter = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.shiftKey) {
        setInput(prev => prev + '\n')
      } else {
        post()
      }
    }
  }, [post])

  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      post();
    },
    [post]
  );

  const disable = useCallback(() => {
    const parsed = new UAparser(navigator.userAgent);
    if (
      ["mobile", "tablet", "wearable"].includes(parsed.getDevice().type ?? "")
    ) {
      disableScroll.on();
    }
  }, []);
  const enable = useCallback(() => disableScroll.off(), []);

  return (
    <Container
      as="form"
      display={"grid"}
      justifySelf={"flex-end"}
      gridTemplateColumns={"1fr auto"}
      gap={4}
      padding={"8px 8px 16px 8px"}
      background={"var(--main-600)"}
    >
      <Textarea
        rows={1}
        onFocus={disable}
        onBlur={enable}
        ref={ref}
        placeholder="Type a message..."
        _placeholder={{
          color: "rgba(255, 255, 255, 0.5)",
        }}
        value={input}
        flexShrink={1}
        onChange={onChange}
        fontSize={"20px"}
        padding={"auto 12px"}
        display={'inline-block'}
        height={"100%"}
        onKeyDown={onEnter}
        resize={'none'}
      />
      <Button
        type="button"
        onClick={onClick}
        aspectRatio={"1/1"}
        height={"100%"}
        flexGrow={1}
      >
        <ChatIcon boxSize={"20px"} />
      </Button>
    </Container>
  );
});

export default memo(Comp);
