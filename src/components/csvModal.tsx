import { 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
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
    Box,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { CsvInput } from "../interfaces/data";
import { StudentDescriptive } from "../interfaces/students";
import DataService from "../services/api/data/dataService";


const CsvModal = (props: {refreshExams: Function}) => {

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    const [headers, setHeaders] = useState<String[]>();
    const [rows, setRows] = useState<String[][]>();
    const [data, setData] = useState<CsvInput>();
    const [result, setResult] = useState<string>()

    const csvToArr = (stringVal: string) => {
        var finalObj: CsvInput = {students: [], exams: []};
        const [keys, ...rest] = stringVal.trim().split("\n").map((item) => item.split(","));
        setHeaders(keys);
        setRows(rest);
        
        rest.forEach((item) => {
            var studentObject: {[key: string] : string} = {};
            keys.forEach((key, index) => (studentObject[key] = item[index]));
            finalObj.students.push(studentObject as any as StudentDescriptive);
            let foundExam = finalObj.exams.find((obj) => obj.name === studentObject["examName"]);
            if(!foundExam){
                foundExam = finalObj.exams[finalObj.exams.push({name: studentObject["examName"], studentIds: []}) - 1];
            }
            foundExam.studentIds.push({PESEL: studentObject["PESEL"]});

        })
        console.log(finalObj);
        return finalObj;

    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            try{
                const file = e.target.files[0];
                const fileUrl = URL.createObjectURL(file);
                await fetch(fileUrl).then(async (resp) => {
                    var data = await resp.text();
                    console.log(data);
                    const arr = csvToArr(data);
                    setData(arr);
                })
                
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const onSubmit = async () => {
        await DataService.postData(data!).then(
            (res) => {
                setResult(res.data)
            }
        );
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
                <Button type="submit" id="csv-form" isLoading={isSubmitting} colorScheme='teal' disabled={data != undefined}>Zatwierdź!</Button>
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
                <Box style={{whiteSpace: "pre-line"}}>
                    {result}
                </Box>
            </ModalBody>
        </ModalContent>
    )
}

export default CsvModal;