import { Button, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { StudentDescriptive } from "../../../interfaces/students";
import { useCallback, useEffect, useState } from "react";
import ExamsAPIService from "../../../services/api/exams/ExamsAPIService";
import { ExamItem } from "../../../interfaces/exams";
import { useForm } from "react-hook-form";

function AssignToExamModal({selectedStudent}: {selectedStudent?: StudentDescriptive}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignableExams, setAssignableExams] = useState<ExamItem[]>([]);

  const { 
    handleSubmit,
    register,
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
    ExamsAPIService.assignExamsToStudent(selectedStudent!.PESEL, Object.entries(values).filter((e) => e[1]).map(e => Number(e[0])))
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
              {assignableExams.map(r => <Checkbox {...register(r.id.toString())}>{r.name}</Checkbox>)}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Zamknij
            </Button>
            <Button variant='ghost' type="submit" isLoading={isSubmitting}>Dodaj</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AssignToExamModal