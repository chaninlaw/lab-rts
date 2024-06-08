import { Avatar, Card, Dropdown, MenuProps } from "antd"
import { style } from "../constants/style"

const DropdownContext = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Change image",
    },
    {
      key: "2",
      label: "Change color",
    },
    {
      key: "3",
      label: "Change profile",
    },
  ]

  return (
    <Card bodyStyle={{ ...style, display: "grid", placeItems: "center" }}>
      <Dropdown trigger={["click", "contextMenu"]} menu={{ items }}>
        <Avatar size={200}>CN</Avatar>
      </Dropdown>
    </Card>
  )
}

export default DropdownContext
