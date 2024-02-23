import { Button, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { StudentDescriptive } from "../../../interfaces/students";
import { useCallback, useContext, useEffect, useState } from "react";
import ExamsAPIService from "../../../services/api/exams/ExamsAPIService";
import { Assignments } from "../../../interfaces/exams";
import { useForm } from "react-hook-form";
import messageContext from "../../../contexts/messageContext";

function AssignToExamModal({selectedStudent}: {selectedStudent?: StudentDescriptive}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignableExams, setAssignableExams] = useState<Assignments>({assigned: [], unassigned: []});

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
    console.log(assignableExams)
    console.log(Object.entries(values))
    const assignments = {
      toAssign: assignableExams.unassigned.filter(e => !(Object.entries(values).filter(e => !e[1]).map(e => Number(e[0])).includes(e.id))).map(e => e.id),
      toUnassign: assignableExams.assigned.filter(e => !(Object.entries(values).filter(e => e[1]).map(e => Number(e[0])).includes(e.id))).map(e => e.id),
    }
    console.log(assignments)
    if (assignments.toAssign.length + assignments.toUnassign.length > 0)
      ExamsAPIService.assignExamsToStudent(selectedStudent!.PESEL, assignments).then(() => {
        setMessage({
          title: 'Pomyślnie przypisano do egzaminu',
          description: null,
          status: 'success',
        })
      })
    else
      setMessage({
        title: 'Przypisania bez zmian',
        description: null,
        status: 'info',
      })
    onClose()
  }

  useEffect(() => {
    fetchAssignableExams()
  }, [fetchAssignableExams])

  useEffect(() => {
    reset()
    assignableExams.assigned.forEach(e => register(e.id.toString(), {value: true}))
    assignableExams.unassigned.forEach(e => register(e.id.toString(), {value: false}))
  }, [assignableExams, reset, register])

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
                assignableExams.assigned.length + assignableExams.unassigned.length > 0 ? 
                <>
                  {assignableExams.assigned.map(r => <Checkbox {...register(r.id.toString())} key={r.id}>{r.name}</Checkbox>)}
                  {assignableExams.unassigned.map(r => <Checkbox {...register(r.id.toString())} key={r.id}>{r.name}</Checkbox>)}
                </> :
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