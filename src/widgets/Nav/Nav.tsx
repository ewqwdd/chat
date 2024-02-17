import {
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import NavUser from "./NavUser";
import { useLocation } from "react-router-dom";
import { headingMap } from "../../lib/headingMap";

export default function Nav() {
  const location = useLocation()
  return (
    <nav>
      <Popover>
        <PopoverTrigger>
          <Heading
            size={"lg"}
            bg={"transparent"}
            _hover={{
              opacity: 0.8,
              color: "inherit",
              background: "rgba(255, 255, 255, 0.1)",
            }}
            cursor={"pointer"}
            borderRightRadius={18}
            padding={"6px 12px 6px 34px"}
            transition={"0.15s ease-in-out"}
            display={"inline-block"}
          >
            {headingMap[location.pathname]}
          </Heading>
        </PopoverTrigger>
        <PopoverContent width={'auto'}>
          <PopoverArrow />
          <PopoverBody display={'flex'} flexDir='column' color={'var(--main-600)'}>
              <Text as={'a'} href={"/"} fontSize={'24px'} _hover={{
                color: 'var(--main-400)'
              }}>
                Long Pooling Chat
              </Text>
              <Text as={'a'} href={"/event-source"} fontSize={'24px'} _hover={{
                color: 'var(--main-400)'
              }}>
                Event Source Chat
              </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <NavUser />
    </nav>
  );
}
