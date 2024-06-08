/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  PropsWithChildren,
  cloneElement,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`

const CloneModalContext = createContext<{
  openName: string
  close: React.Dispatch<React.SetStateAction<string>>
  open: React.Dispatch<React.SetStateAction<string>>
}>({
  openName: '',
  close: function (value: React.SetStateAction<string>): void {
    throw new Error('Function not implemented.')
  },
  open: function (value: React.SetStateAction<string>): void {
    throw new Error('Function not implemented.')
  },
})

function CloneModal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState('')

  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <CloneModalContext.Provider value={{ openName, close, open }}>
      {children}
    </CloneModalContext.Provider>
  )
}

function Open({
  children,
  opens: opensWindowName,
}: PropsWithChildren<{ opens: string }>) {
  const { open } = useCloneModal()

  if (React.isValidElement(children)) {
    return cloneElement(children, { onClick: () => open(opensWindowName) })
  }
  return children
}

function Window({ children, name }: PropsWithChildren<{ name: string }>) {
  const { openName, close } = useCloneModal()
  const ref = useRef<any>()

  useEffect(
    function () {
      function handleClick(e: any) {
        if (ref.current && !ref.current.contains(e.target)) {
          close('')
        }
      }

      document.addEventListener('click', handleClick)

      return () => document.removeEventListener('click', handleClick)
    },
    [close]
  )

  if (name !== openName) return null

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => close('')}>👍</Button>

        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body
  )
}

const useCloneModal = () => {
  const context = React.useContext(CloneModalContext)
  if (!context)
    throw new Error(
      'useCloneModal should be use inside <CloneModal> Component!'
    )

  return context
}

CloneModal.Open = Open
CloneModal.Window = Window

export { CloneModal }
