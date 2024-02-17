import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useUser } from "../UserContext/useUser";

export default function NavUser() {
  const { logout, user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Popover>
        <PopoverTrigger>
          <Avatar as={Button} name={user?.name} marginRight={'34px'}/>
        </PopoverTrigger>
        <PopoverContent display={"flex"} flexDirection={"column"} width={'auto'}>
        <PopoverArrow />
        <PopoverCloseButton />
          <PopoverBody >
            <Button onClick={logout}>
              Logout
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
  );
}
