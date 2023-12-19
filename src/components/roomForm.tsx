import { 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    Button,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    RadioGroup,
    HStack,
    Radio,
    Checkbox
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import RoomService from "../services/api/rooms/RoomsService";
import { RoomDescriptive } from "../interfaces/rooms";


const RoomForm = (props: {onRoomClose: Function}) => {
    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<RoomDescriptive>();

    const onSubmit = async (values: RoomDescriptive) => {
        const {number, size, computers} = values;
        console.log(number, size)
        await RoomService.createRoom({number, size, computers});
        props.onRoomClose();
    }

    return (
        <ModalContent>
        <ModalHeader>
            <ModalCloseButton/>
        </ModalHeader>
        <ModalBody>
            <form id="exam-form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.number?.message != null} mb="5">
                    <FormLabel> Numer </FormLabel>
                    <Input
                        id="number"
                        placeholder="numer sali"
                        type="number"
                        {...register(
                            'number', {
                                required: "Pole nie może być puste!",
                            }
                        )} />
                    <FormErrorMessage> {errors.number && errors.number.message} </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.size?.message != null} mb="5">
                    <FormLabel> Rozmiar </FormLabel>
                    <Input
                        id="sze"
                        placeholder="rozmiar sali"
                        type="number"
                        {...register(
                            'size', {
                                required: "Pole nie może być puste!"
                            }
                        )} />
                    <FormErrorMessage> {errors.size && errors.size.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>czy sala posiada komputery?</FormLabel> 
                    <Checkbox {...register('computers')}/>
                </FormControl>
                <Button type="submit" id="exam-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
            </form>
        </ModalBody>
    </ModalContent>
    );
}

export default RoomForm;