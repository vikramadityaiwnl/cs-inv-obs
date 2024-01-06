import { useState } from "react"
import { Button } from "../Button/Button"
import { Typography } from "../Typography/Typography"
import "./Modal.css"
import { Input } from "../Input/Input"

interface ModalProps {
  isOpen: boolean,
  text: string,
  inputPlaceHolder: string,
  onPositiveButtonClick: (inputText: string) => void,
  onNegativeButtonClick: () => void
}

export const Modal = (props: ModalProps) => {
  if (!props.isOpen) return null

  const [inputText, setInputText] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.onPositiveButtonClick(inputText)
    }
  }

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal-head">
          <Typography text={props.text} subheading />
        </div>
        <div className="modal-content">
          <Input placeholder={props.inputPlaceHolder} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <div className="modal-actions">
          <Button text="Add" onClick={() => props.onPositiveButtonClick(inputText)} leadingIcon="add" />
          <Button text="Cancel" secondary onClick={props.onNegativeButtonClick} trailingIcon="cancel" />
        </div>
      </div>
    </div>
  )
}