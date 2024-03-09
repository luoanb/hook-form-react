// import { useAttr, useFormData, Verifications } from '../../src/index'
import { useAttr, useFormData, Verifications } from 'hook-form-react'
import { Button, Input } from '@nextui-org/react'
// import { Button, Input } from 'antd'

export const Example = () => {
  const formData = useFormData(
    { password: '', username: '', age: '' },
    {
      // 支持多个校验
      password: [
        // 自带验证器必填校验
        // 开发者也可以自行在项目中补充其它验证规则，具体请看开发者文档（待补充）
        Verifications.required(),
        // 自带验证器密码校验
        Verifications.password()
      ],
      username: [
        // 自带验证器的必填校验 + 自定义提示
        Verifications.required('用户账户不能为空'),
        // 自带验证器的用户名校验
        Verifications.username()
      ],
      age: [Verifications.min(0), Verifications.max(150)]
    }
  )

  // 使用组件快速绑定hook
  const attr = useAttr(formData)

  const submit = async () => {
    const isValid = await formData.doAllValidate()
    console.log('submit:isValid: ', isValid)
    if (isValid) {
      console.log('formValue', formData.value)
    }
  }

  return (
    <div className="p-10 pt-18 pb-0 flex-col m-auto" style={{ width: '50vw' }}>
      <Input
        placeholder="请输入账户"
        className="mb-2"
        // // 注释掉原有绑定逻辑
        // value={formData.value.username}
        // onChange={(e) => formData.pushValue('username', e.target.value)}
        // isInvalid={formData.errors.username?.isInvalid}
        // errorMessage={formData.errors.username?.msg}

        // 替换为快速绑定
        // NextUI.N_Input属于针对[NextUI.Input]的单独适配,其他组件正在补充中
        // 开发者也可以自行在项目中补充第三方组件,具体请看开发者文档(待补充)
        {...attr('username', attr.NextUI.N_Input)}
      ></Input>
      <Input
        autoComplete="new-password"
        type="password"
        className="mb-2"
        placeholder="请输入登录密码"
        {...attr('password', attr.NextUI.N_Input)}
        // value={formData.value.password}
        // isInvalid={formData.errors.password?.isInvalid}
        // errorMessage={formData.errors.password?.msg}
        // onChange={(e) => formData.pushValue('password', e.target.value)}
      ></Input>
      <Input
        className="mb-2"
        placeholder="请输入年龄"
        {...attr('age', attr.NextUI.N_Input)}
      ></Input>

      <Button onClick={submit}>登录</Button>
    </div>
  )
}

export default Example
