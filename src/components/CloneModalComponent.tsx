import { CloneModal } from '../compound/CloneModal'

const CloneModalComponent = () => {
	return (
		<CloneModal>
			<CloneModal.Window name='test'>Content</CloneModal.Window>
			<CloneModal.Open opens={'test'}>Open</CloneModal.Open>
		</CloneModal>
	)
}

export default CloneModalComponent
