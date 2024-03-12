import { Button, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { StudentDescriptive } from "../../../interfaces/students";
import { useContext, useEffect, useState } from "react";
import ExamsAPIService from "../../../services/api/exams/ExamsAPIService";
import { Assignments } from "../../../interfaces/exams";
import { useFieldArray, useForm } from "react-hook-form";
import messageContext from "../../../contexts/messageContext";

function AssignToExamModal({selectedStudent}: {selectedStudent?: StudentDescriptive}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignableExams, setAssignableExams] = useState<Assignments>({assigned: [], unassigned: []});

  const { setMessage } = useContext(messageContext)

  const { 
    handleSubmit,
    register,
    control,
    formState: {isSubmitting},
  } = useForm();

  const { fields, replace } = useFieldArray({
    control,
    name: "assignments",
  });

  useEffect(() => {
    console.log(selectedStudent)
    if (selectedStudent) {
      ExamsAPIService.getAssignableExams(selectedStudent?.PESEL).then(res => {
        setAssignableExams(res.data);
        replace([
          ...(res.data.assigned.map(i => ({id: i.id, value: true}))),
          ...(res.data.unassigned.map(i => ({id: i.id, value: false})))
        ])
        return;
      })
      onOpen()
    }
    else {
      onClose()
    }
  }, [selectedStudent, onOpen, onClose, replace])

  const onSubmit = (values: unknown) => {
    const assignments = {
      toAssign: assignableExams.unassigned.filter(e => !(values.assignments.filter(v => !v.value).map(v => v.id).includes(e.id))).map(e => e.id),
      toUnassign: assignableExams.assigned.filter(e => !(values.assignments.filter(v => v.value).map(v => v.id).includes(e.id))).map(e => e.id),
    }
    if (assignments.toAssign.length + assignments.toUnassign.length > 0)
      ExamsAPIService.assignExamsToStudent(selectedStudent!.PESEL, assignments).then(() => {
        setMessage({
          title: 'Pomyślnie zapisano przypisania do egzaminu',
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
                fields.map((field, index) => <Checkbox {...register(`assignments.${index}.value` as const)} key={field.id}>{[...assignableExams.assigned, ...assignableExams.unassigned][index].name}</Checkbox>)
              }
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Zamknij
            </Button>
            <Button colorScheme='blue' type="submit" isLoading={isSubmitting}>Zapisz</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AssignToExamModal