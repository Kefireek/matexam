import { 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Button,
    TableContainer,
    Thead,
    Table,
    Tr,
    Th,
    Tbody,
    Td,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";


const CsvModal = () => {

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    const [data, setData] = useState<String>();

    const [headers, setHeaders] = useState<String[]>();
    const [rows, setRows] = useState<String[][]>();

    const acceptedExtension = ["csv"];

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            try{
                const file = e.target.files[0];
                const fileUrl = URL.createObjectURL(file);
                const res = await fetch(fileUrl).then(async (resp) => {
                    var data = await resp.text();
                    var data_ = data.split("\n");
                    var _data = data_.map((row) => row.split(","));
                    setHeaders(_data[0]);
                    setRows(_data.slice(1));
                })
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const onSubmit = () => {
        
    }

    return (
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <form id="csv-form" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.file?.message != null}>
                        <FormLabel> Dodaj plik </FormLabel>
                        <Input size=""
                            type="file"
                            {...register(
                                'file'
                            )}
                            accept=".csv"
                            onChange={handleChange}
                        />
                        <FormErrorMessage> </FormErrorMessage>
                    </FormControl>
                <Button type="submit" id="csv-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
                </form>
                <TableContainer>
                    <Table variant='simple' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                {headers?.map((header, i) => (
                                    <Th key={i}> {header}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rows?.map((rows, i) => (
                                <Tr key={i}>
                                    {rows?.map((data, i) => (
                                        <Td key={i}> {data}</Td>
                                    ))}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </ModalBody>
        </ModalContent>
    )
}

export default CsvModal;