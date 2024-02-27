import { useContext, useEffect } from "react";
import messageContext from "../../contexts/messageContext";
import { useToast } from "@chakra-ui/react";

function MessagesContainer() {
  const { message, setMessage } = useContext(messageContext)

  const toast = useToast()

  useEffect(() => {
    if(message) {
      toast({
        title: message.title,
        description: message.description ?? undefined,
        status: message.status,
        duration: message.duration ?? 3000,
        isClosable: true,
        position: 'bottom-right'
      })
      setMessage(null)
    }
  }, [message, toast, setMessage])

  return <></>
}

export default MessagesContainer