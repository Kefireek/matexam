import { Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import logo_white from "../../assets/logo_white.png";
import logo_black from "../../assets/logo_black.png";

const MainPage = () => {

  const { colorMode } = useColorMode()

  return (
    <Flex alignItems="center" justifyContent="center" marginLeft="1vw" width="90vw" height="100vh" position="absolute" flexDirection="column">
      <Flex alignItems="center">
        <Image src={colorMode === "dark" ? logo_white : logo_black} marginTop="2vw" marginRight="1vw" zIndex="20" height="fit-content" width="4vw"></Image>
        <Text fontSize="7vw">matExam</Text>
      </Flex>
      <Text fontSize="2vw" marginBottom="10vh">Innowacyjny system zarządzania egzaminami maturalnymi</Text>
    </Flex>
  )
}

export default MainPage;