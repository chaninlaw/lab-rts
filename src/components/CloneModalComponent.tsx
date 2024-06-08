import { CloneModal } from '../compound/CloneModal'

const CloneModalComponent = () => {
  return (
    <CloneModal>
      <CloneModal.Window>Content</CloneModal.Window>
      <CloneModal.Open opens={false}>Open</CloneModal.Open>
    </CloneModal>
  )
}

export default CloneModalComponent