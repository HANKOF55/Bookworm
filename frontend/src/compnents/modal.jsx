import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

export default function modal({modalName}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

const [ isSignUp, setIsSignUP ] = useState(true);


const handleShowSignUp = () => {
  setIsSignUP(!isSignUp)
}


  return (
    <>
      <Button className="bg-blue-200 text-gray-700" onPress={onOpen}>
        {modalName}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>{
                isSignUp ?
                  <SignUp handleShowSignUp={handleShowSignUp}/> : 
                  <Login handleShowSignUp={handleShowSignUp}/>
              }
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
