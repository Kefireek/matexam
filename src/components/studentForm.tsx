import { useForm } from 'react-hook-form';
import { StudentDescriptive } from '../interfaces/students';
import { 
    Box, 
    Button, 
    Flex, 
    FormControl, 
    FormErrorMessage, 
    FormLabel, 
    Input, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader 
} from '@chakra-ui/react';
import studentService from '../services/students/StudentService';
import messageContext from '../contexts/messageContext';
import { useContext } from 'react';

const StudentForm = (props: {onStudentClose: () => void}) => {

    const { setMessage } = useContext(messageContext)
    

    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<StudentDescriptive>();
    
    const onSubmit = async (values: StudentDescriptive) => {
        const {PESEL,name,surname,department,ordinalNumber,phone,email,document} = values;
        await studentService.addStudent({PESEL, name, surname, department, ordinalNumber, phone, email, document});
        setMessage({
            title: 'Pomyślnie dodano ucznia',
            description: null,
            status: 'success',
        })
        props.onStudentClose();
    }

    return (
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <form id='student-form' onSubmit={handleSubmit(onSubmit)}>
                    
                            <Box>
                                <Flex gap="2">
                                    <FormControl isInvalid={errors.name?.message != null} mb="5">
                                        <FormLabel> imie </FormLabel>
                                        <Input
                                            id='name'
                                            placeholder='imie ucznia'
                                            type='text'
                                            {...register(
                                                'name', {
                                                    required: "Pole nie może być puste!"
                                                })} />
                                        <FormErrorMessage> {errors.name && errors.name.message} </FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.surname?.message != null} mb="5">
                                        <FormLabel> nazwisko </FormLabel>
                                        <Input
                                            id='surname'
                                            placeholder='nazwisko ucznia'
                                            type='text'
                                            {...register(
                                                'surname', {
                                                    required: "Pole nie może być puste!"
                                                })} />
                                        <FormErrorMessage> {errors.surname && errors.surname.message} </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                            </Box>
                            <FormControl isInvalid={errors.PESEL?.message != null} mb="5">
                                <FormLabel> PESEL </FormLabel>
                                <Input
                                    id='pesel'
                                    placeholder='pesel ucznia'
                                    type='text'
                                    {...register(
                                        'PESEL', {
                                            required: "Pole nie może być puste!",
                                            maxLength: 11
                                        })} />
                                <FormErrorMessage> {errors.PESEL && errors.PESEL.message} </FormErrorMessage>
                            </FormControl>
                            <Box>
                                <Flex gap="2">
                                <FormControl isInvalid={errors.department?.message != null} mb="5">
                                <FormLabel> oddzial </FormLabel>
                                <Input
                                    id='department'
                                    placeholder='oddzial ucznia'
                                    type='text'
                                    {...register(
                                        'department', {
                                            required: "Pole nie może być puste!"
                                        })} />
                                <FormErrorMessage> {errors.department && errors.department.message} </FormErrorMessage>   
                            </FormControl>
                            <FormControl isInvalid={errors.ordinalNumber?.message != null}>
                            <FormLabel> numer </FormLabel>
                            <Input
                                id='ordinalNumber'
                                placeholder='numer w dzienniku'
                                type='text'
                                {...register(
                                    'ordinalNumber', {
                                        required: "Pole nie może być puste!"
                                    })} />
                            <FormErrorMessage> {errors.ordinalNumber && errors.ordinalNumber.message} </FormErrorMessage>
                            </FormControl>
                                </Flex>
                            </Box>
                        
                            <FormControl isInvalid={errors.phone?.message != null} mb="5">
                                <FormLabel> numer telefonu (opcjonalne) </FormLabel>
                                <Input
                                    id='phone'
                                    placeholder='numer telefonu'
                                    type='phone'
                                    {...register(
                                        'phone', {
                                            
                                        })} />
                                <FormErrorMessage> {errors.phone && errors.phone.message} </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.email?.message != null} mb="5">
                                <FormLabel> email (opcjonalne) </FormLabel>
                                <Input
                                    id='email'
                                    placeholder='adres email'
                                    type='mail'
                                    {...register(
                                        'email', {
                                            
                                        })} />
                                <FormErrorMessage> {errors.email && errors.email.message} </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.document?.message != null} mb="5">
                                <FormLabel> dokument (opcjonalne) </FormLabel>
                                <Input
                                    id='document'
                                    placeholder='numer'
                                    type='text'
                                    {...register(
                                        'document', {
                                            
                                        })} />
                                <FormErrorMessage> {errors.document && errors.document.message} </FormErrorMessage>
                            </FormControl> 
                        
                    <Button type="submit" id="student-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
                </form>
            </ModalBody>
        </ModalContent>
    )
}

export default StudentForm;