import { Avatar, Box, Container, Heading, Text } from "@chakra-ui/react";
import styles from './Message.module.css'
import { Message } from "../../types/Message";

export default function MessageComp({ name, content, color }: Message) {
  return (
    <Container padding={0} display={"flex"} gap={18}>
      <Avatar name={name} />
      <Box className={styles.message} background={'var(--main-400)'} padding={'6px 12px'} borderBottomRadius={'12px'} borderTopRightRadius={'12px'}>
        <Heading as='h3' fontSize={'18px'} fontWeight={600} size={"sm"} color={color}>
            {name}
        </Heading>
        <Text fontSize={'18px'} fontWeight={400} fontFamily={'var(--chakra-fonts-body)'}>
            {content}
        </Text>
      </Box>
    </Container>
  );
}
