import { IconButton, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Pagination = ({total, take, skipChanged}: {total: number, take: number, skipChanged: (skip: number) => void}) => {
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    skipChanged((currentPage - 1) * take);
  }, [currentPage, skipChanged, take])

  return (
    <Flex width='100%'>
      {currentPage !== 1 && <IconButton aria-label='1'  onClick={(_) => setCurrentPage(1)} key={1} variant={'ghost'} icon={<span>1</span>} />}
      {currentPage > 2 && <><IconButton isDisabled={true} key='dots1' variant={'ghost'} aria-label='dots 1' icon={<span>...</span>} /><IconButton aria-label={(currentPage - 1).toString()} onClick={(_) => setCurrentPage(currentPage - 1)} key={currentPage - 1} variant={'ghost'} icon={<span>{currentPage - 1}</span>} /></>}
      {<IconButton key={currentPage} aria-label={currentPage.toString()} icon={<span>{currentPage}</span>} />}
      {currentPage < Math.floor(total / take) - 1 && <><IconButton aria-label={(currentPage + 1).toString()} icon={<span>{currentPage + 1}</span>} onClick={(_) => setCurrentPage(currentPage + 1)}  key={currentPage + 1} variant={'ghost'} /><IconButton key='dots2' variant={'ghost'} aria-label='dots 2' isDisabled={true} icon={<span>...</span>} /></>}
      {currentPage !== Math.floor(total / take) && <IconButton aria-label={Math.floor(total / take).toString()} icon={<span>{Math.floor(total / take)}</span>} onClick={(_) => setCurrentPage(Math.floor(total / take))} key={Math.floor(total / take)} variant={'ghost'} />}
    </Flex>
  )
}
export default Pagination;