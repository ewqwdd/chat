import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useUser } from "../UserContext/useUser";
import { ChatIcon } from "@chakra-ui/icons";
import RegisterForm from "./RegisterForm";

export default function Register() {
    const { error, user } = useUser();
  
  return (
    <Modal isOpen={!user} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent background={"var(--main-600)"}>
        <ModalHeader
          display={"flex"}
          flexDirection={"column"}
          color="var(--main-600)"
          alignItems={'center'}
        >
          <Box background="var(--chakra-colors-whiteAlpha-800)" padding={4} paddingBottom={1} borderTopRadius={24}>
            <ChatIcon boxSize={"3rem"} />
          </Box>
          <Heading as="h2" textAlign={"center"} background="var(--chakra-colors-whiteAlpha-800)" padding={4} borderTopRadius={24}>
            WELCOME
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Stack>
            <Heading size={"md"} as="h3">
              Enter your name:
            </Heading>
            <Stack flexDirection={"row"}>
              <RegisterForm />
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
