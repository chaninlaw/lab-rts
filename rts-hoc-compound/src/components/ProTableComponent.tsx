import { ProForm, ProFormText } from "@ant-design/pro-components"

export const ProTableComponent = () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values)
      }}
    >
      <ProFormText name="name" label="Pro Table" />
    </ProForm>
  )
}
