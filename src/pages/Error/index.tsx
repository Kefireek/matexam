import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom";

function ErrorPage() {

    return(
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
            <div>
                <Heading>Ups...</Heading>
                <Text>Przepraszamy, coś poszło nie tak.</Text>
                <ChakraLink textDecoration={'underline'} as={RouterLink} to='/'>Powrót do strony głownej</ChakraLink>
            </div>
        </Box>
    )
}

export default ErrorPage