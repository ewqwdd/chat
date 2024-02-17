import { Button, Input, Spinner } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useState } from "react";
import { useUser } from "../UserContext/useUser";

export default function RegisterForm() {
  const [input, setInput] = useState<string>("");
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);
  const { setUser, isLoading } = useUser();

  const login = useCallback(() => {
    setUser?.(input);
  }, [setUser, input]);
  return (
    <>
      <Input
        value={input}
        onChange={onChange}
        maxWidth={300}
        placeholder="JohnSmith123"
      />
      <Button colorScheme="blue" mr={3} disabled={isLoading} onClick={login}>
        {isLoading ? <Spinner /> : "Login"}
      </Button>
    </>
  );
}
