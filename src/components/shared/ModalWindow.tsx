import { 
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalHeader 
  } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const ModalWindow = (props: {onClose: Function, fields: {fieldname: string, gridNumber: number}[]}) => {


  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting}
  } = useForm();

  const onSubmit = () =>{

  }
  return (
    <ModalContent>
      <ModalHeader>
        <ModalCloseButton/>
      </ModalHeader>
        <ModalBody>
          <form id="modal-form" onSubmit={handleSubmit(onSubmit)}>
            
          {props.fields?.map((field) => (
            <FormControl isInvalid={errors.field?.message != null} mb="5">
              <FormLabel> {field.fieldname} </FormLabel>
              <Input
                id={field.fieldname}
                {...register(
                  field.fieldname, {
                    required: "Pole nie może być puste!"
                  }
                )}
              />
            </FormControl>
          ))}
          <Button type="submit" id="modal-form" isLoading={isSubmitting} colorScheme='teal'>Zatwierdź!</Button>
          </form>
        </ModalBody>
    </ModalContent>
  )
}

export default ModalWindow;