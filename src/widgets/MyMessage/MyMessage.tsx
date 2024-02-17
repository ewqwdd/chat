import { Avatar, Box, Container, Text } from "@chakra-ui/react";
import styles from './MyMessage.module.css'
import { Message } from "../../types/Message";

export default function MyMessageComp({ name, content }: Message) {
  return (
    <Container padding={0} display={"flex"} gap={18} justifyContent={'end'}>
      <Box className={styles.message} background={'var(--main-300)'} padding={'6px 12px'} borderBottomRadius={'12px'} borderTopLeftRadius={'12px'}>
        <Text fontSize={'18px'} fontWeight={400} fontFamily={'var(--chakra-fonts-body)'}>
            {content}
        </Text>
      </Box>
      <Avatar name={name} />
    </Container>
  );
}
