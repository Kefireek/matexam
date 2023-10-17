import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

function ExamPage() {

    const { examid } = useParams();

    return(
        <>
            <Box>
                <Text>{examid}</Text>
            </Box>
        </>
    )
}

export default ExamPage