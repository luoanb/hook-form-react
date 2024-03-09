# NextUI 完整示例

```ts
// import { useAttr, useFormData, Verifications } from '../../src/index'
import { useAttr, useFormData, Verifications } from 'hook-form-react'
import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Slider,
  Switch,
  Textarea
} from '@nextui-org/react'
import { animals } from './data'
// import { Button, Input } from 'antd'

export const Example = () => {
  const formData = useFormData(
    {
      password: '',
      username: '',
      age: '',
      value4: [],
      value5: '',
      value6: false,
      value7: '',
      value8: '',
      value9: ''
    },
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
      age: [Verifications.min(0), Verifications.max(150)],
      value4: [Verifications.minLenth(2)],
      value5: [Verifications.required('请选择')]
    }
  )

  // 使用组件快速绑定hook
  const attr = useAttr(formData)

  const submit = async () => {
    // formData.pushValue('password', (old) => old + '你好')
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

      <Select
        label="Favorite Animal"
        variant="bordered"
        placeholder="Select an animal"
        className="mb-2"
        {...attr('value4', attr.NextUI.N_Select_Mult)}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500 mb-2">Selected: {formData.value.value4}</p>

      <Select
        label="Favorite Animal"
        variant="bordered"
        placeholder="Select an animal"
        className=""
        {...attr('value5', attr.NextUI.N_Select)}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>

      <p className="text-small text-default-500 mb-2">Selected: {formData.value.value5}</p>

      <Checkbox className="" {...attr('value6', attr.NextUI.N_Checkbox)}>
        Subscribe (controlled)
      </Checkbox>
      <Switch className="" {...attr('value6', attr.NextUI.N_Checkbox)}>
        Subscribe (controlled)
      </Switch>
      <p className="text-default-500 mb-2">Selected: {formData.value.value6 ? 'true' : 'false'}</p>

      <div className="flex flex-col gap-3 mb-2">
        <RadioGroup label="Select your favorite city" {...attr('value7', attr.NextUI.N_RadioGroup)}>
          <Radio value="buenos-aires">Buenos Aires</Radio>
          <Radio value="sydney">Sydney</Radio>
          <Radio value="san-francisco">San Francisco</Radio>
          <Radio value="london">London</Radio>
          <Radio value="tokyo">Tokyo</Radio>
        </RadioGroup>
        <p className="text-default-500 text-small">Selected: {formData.value.value7}</p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Textarea
          {...attr('value8', attr.NextUI.N_TextArea)}
          variant="faded"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
        />
        <p className="text-default-500 text-small">Textarea value: {formData.value.value8}</p>
      </div>

      <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
        <Slider
          aria-label="Volume"
          size="lg"
          color="success"
          {...attr('value9', attr.NextUI.N_Slider)}
          className="max-w-md"
        />
        <p className="text-default-500 font-medium text-small">
          Current volume: {formData.value.value9}
        </p>
      </div>

      <Button onClick={submit}>登录</Button>
    </div>
  )
}

export default Example
```
