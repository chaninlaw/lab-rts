import { Button, Card } from 'antd'
import { Dialog } from './InstanceDialog'
import { style } from '../constants/style'

export const DialogWithInstanceHook = () => {
  const dialog = Dialog.useDialog()

  return (
    <Card styles={{ body: style }}>
      <Button onClick={dialog.toggle}>
        Open Dialog with instance hook pattern
      </Button>
      <Dialog dialog={dialog}>Dialog with instance hook pattern</Dialog>
    </Card>
  )
}
