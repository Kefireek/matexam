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
    Checkbox
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import RoomService from "../services/api/rooms/RoomsService";
import { RoomDescriptive } from "../interfaces/rooms";
import { useContext } from "react";
import messageContext from "../contexts/messageContext";


const RoomForm = (props: {onRoomClose: () => void, refreshRooms: () => void}) => {
    const { 
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm<RoomDescriptive>();

    const { setMessage } = useContext(messageContext)

    const onSubmit = async (values: RoomDescriptive) => {
        const {number, size, computers} = values;
        await RoomService.createRoom({number, size, computers});
        setMessage({
            title: 'Pomyślnie dodano salę',
            description: null,
            status: 'success'
        });
        props.refreshRooms();
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
                    <FormLabel>Czy sala posiada komputery?</FormLabel> 
                    <Checkbox {...register('computers')}/>
                </FormControl>
                <Button type="submit" id="exam-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
            </form>
        </ModalBody>
    </ModalContent>
    );
}

export default RoomForm;