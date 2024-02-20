import { Button, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { StudentDescriptive } from "../../../interfaces/students";
import { useCallback, useContext, useEffect, useState } from "react";
import ExamsAPIService from "../../../services/api/exams/ExamsAPIService";
import { ExamItem } from "../../../interfaces/exams";
import { useForm } from "react-hook-form";
import messageContext from "../../../contexts/messageContext";

function AssignToExamModal({selectedStudent}: {selectedStudent?: StudentDescriptive}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignableExams, setAssignableExams] = useState<ExamItem[]>([]);

  const { setMessage } = useContext(messageContext)

  const { 
    handleSubmit,
    register,
    reset,
    formState: {isSubmitting},
  } = useForm<{[key: string]: boolean}>();

  useEffect(() => {
    if (selectedStudent)
      onOpen()
    else
      onClose()
  }, [selectedStudent, onOpen, onClose])

  const fetchAssignableExams = useCallback(() => {
    if(!selectedStudent) return
    ExamsAPIService.getAssignableExams(selectedStudent?.PESEL).then(res => {
      setAssignableExams(res.data);
    })
  }, [selectedStudent])

  const onSubmit = (values: {[key: string]: boolean}) => {
    ExamsAPIService.assignExamsToStudent(selectedStudent!.PESEL,
      {toAssign: Object.entries(values).filter((e) => e[1]).map(e => Number(e[0])), toUnassign: Object.entries(values).filter((e) => !e[1]).map(e => Number(e[0]))}
    ).then(() => {
      setMessage({
        title: 'Pomyślnie przypisano do egzaminu',
        description: null,
        status: 'success',
      })
      reset();
      onClose()
    })
  }

  useEffect(() => {
    fetchAssignableExams()
  }, [fetchAssignableExams])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Przypisz {selectedStudent?.name} {selectedStudent?.surname} do egzaminu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='column'>
              {
                assignableExams.length > 0 ? 
                assignableExams.map(r => <Checkbox {...register(r.id.toString())} key={r.id}>{r.name}</Checkbox>) :
                <Text color="gray" as='i'>Brak możliwych egzaminów do przypisania</Text>
              }
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Zamknij
            </Button>
            <Button colorScheme='blue' type="submit" isLoading={isSubmitting}>Dodaj</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AssignToExamModal