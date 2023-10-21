import React from 'react'
import { Modal as AntModal, Button as AntButton } from 'antd'

const ModalContext = React.createContext<
  | {
      open: boolean
      setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
  | undefined
>(undefined)

interface ModalComposition {
  onOk: () => void
  children: React.ReactNode
}

const Modal = ({ children }: React.PropsWithChildren) => {
  const [open, setOpen] = React.useState(false)

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

const Content = ({ onOk: cb, children }: ModalComposition) => {
  const { open, setOpen } = useModal()

  const onCancel = () => setOpen(false)

  const onOk = () => {
    cb()
    setOpen(false)
  }

  return (
    <AntModal open={open} onCancel={onCancel} onOk={onOk}>
      {children}
    </AntModal>
  )
}

const Button = ({ children }: React.PropsWithChildren) => {
  const { setOpen } = useModal()

  return <AntButton onClick={() => setOpen(true)}>{children}</AntButton>
}

const useModal = () => {
  const context = React.useContext(ModalContext)
  if (!context)
    throw new Error('useModal must be used within a <Modal> component.')
  return context
}
Modal.Content = Content
Modal.Button = Button

export default Modal
