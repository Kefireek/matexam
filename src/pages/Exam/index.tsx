import { useParams } from "react-router-dom";
import LeftMenu from "../../components/shared/leftMenu"
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