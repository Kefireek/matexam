import {
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Input,
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
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CsvInput } from "../interfaces/data";
import { StudentDescriptive } from "../interfaces/students";
import DataService from "../services/api/data/dataService";
import { PlusSquareIcon } from "@chakra-ui/icons";
import messageContext from "../contexts/messageContext";


const CsvModal = (props: {refreshExams: () => void}) => {
    const { setMessage } = useContext(messageContext)
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    const [headers, setHeaders] = useState<string[]>();
    const [rows, setRows] = useState<string[][]>();
    const [data, setData] = useState<CsvInput>();
    const [result, setResult] = useState<string>();
    const [errorMsg, setErrorMsg] = useState<string>();

    const csvToArr = (stringVal: string) => {
        const finalObj: CsvInput = {students: [], exams: []};
        const [keys, ...rest] = stringVal.trim().split("\n").map((item) => item.split(","));
        setHeaders(keys);
        setRows(rest);

        rest.forEach((item) => {
            const studentObject: {[key: string] : string} = {};
            keys.forEach((key, index) => (studentObject[key] = item[index]));
            finalObj.students.push(studentObject as unknown as StudentDescriptive);
            let foundExam = finalObj.exams.find((obj) => obj.name === studentObject["examName"]);
            if(!foundExam){
                foundExam = finalObj.exams[finalObj.exams.push({name: studentObject["examName"], studentIds: []}) - 1];
            }
            foundExam.studentIds.push(studentObject["PESEL"]);

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
                    const data = await resp.text();
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
        if(data == undefined){
            setMessage(
                {
                    title: 'Nie wybrano pliku',
                    description: null,
                    status: 'error',
                }
            )
            return;
        }
        else {
            await DataService.postData(data!).then(
                (res) => {
                    setResult(res.data)
                    props.refreshExams();
                    setMessage(
                        {
                            title: 'Pomyślnie dodano dane',
                            description: null,
                            status: 'success',
                        }
                    )
                }
            ).catch((err) => {
                setErrorMsg(err.response.data);
            })
        }
    }

    return (
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <form id="csv-form" onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <Box transition="0.5" flexDirection="row">
                            <FormControl isInvalid={errors.file?.message != null}>
                                <InputGroup>
                                  <InputLeftAddon>
                                    <PlusSquareIcon/>
                                  </InputLeftAddon>
                                    <Input
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                            id="file"
                                            placeholder="Wybierz plik..."
                                            variant="filled"
                                            type="file"
                                            {...register(
                                                'file'
                                            )}
                                            accept=".csv"
                                            onChange={handleChange}
                                            multiple={false}
                                      />
                                      <InputRightAddon>
                                        .csv
                                      </InputRightAddon>
                                  </InputGroup>
                                <FormErrorMessage> {errorMsg} </FormErrorMessage>
                            </FormControl>
                            </Box>
                        <Button type="submit" id="csv-form" isLoading={isSubmitting} colorScheme='teal' disabled={data == undefined}>Zatwierdź!</Button>
                    </Box>
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