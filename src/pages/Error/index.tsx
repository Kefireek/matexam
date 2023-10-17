import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

function ErrorPage() {

    const navigate = useNavigate();

    return(
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
            <div>
                <Heading>Ups...</Heading>
                <Text>Przepraszamy, coś poszło nie tak.</Text>
                <Button onClick={()=> navigate("/")}>Powrót do strony głownej</Button>
            </div>
        </Box>
    )
}

export default ErrorPage