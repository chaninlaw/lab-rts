import React from 'react'

type DialogInstance = {
  open: () => void
  close: () => void
  toggle: () => void
  isOpen: boolean
}

const InternalDialog = ({
  dialog,
  children,
}: {
  dialog?: DialogInstance
  children: React.ReactNode
}) => {
  return (
    <dialog className="p-4 border border-orange-400" open={dialog?.isOpen}>
      <DialogHeader dialog={dialog} title="Dialog" closable />
      <div className="mt-4">{children}</div>
    </dialog>
  )
}

const DialogHeader = ({
  dialog,
  title,
  closable,
}: {
  dialog?: DialogInstance
  title: string
  closable?: boolean
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1>{title}</h1>
      {closable && <button onClick={dialog?.close}>X</button>}
    </div>
  )
}

const useDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(!isOpen)

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

export const Dialog = Object.assign(InternalDialog, {
  useDialog,
})
