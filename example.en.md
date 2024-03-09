# NextUI Full Example

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
      // Supports multiple validations
      password: [
        // Built-in validator for required validation
        // Developers can also add other validation rules in their projects, see developer documentation for details (to be added)
        Verifications.required(),
        // Built-in validator for password validation
        Verifications.password()
      ],
      username: [
        // Built-in validator's required check + custom message
        Verifications.required('User account cannot be empty'),
        // Built-in validator for username validation
        Verifications.username()
      ],
      age: [Verifications.min(0), Verifications.max(150)],
      value4: [Verifications.minLength(2)],
      value5: [Verifications.required('Please select')]
    }
  )

  // Use component to quickly bind hook
  const attr = useAttr(formData)

  const submit = async () => {
    // formData.pushValue('password', (old) => old + 'hello')
    const isValid = await formData.doAllValidate()
    console.log('submit:isValid: ', isValid)
    if (isValid) {
      console.log('formValue', formData.value)
    }
  }

  return (
    <div className="p-10 pt-18 pb-0 flex-col m-auto" style={{ width: '50vw' }}>
      <Input
        placeholder="Please enter account"
        className="mb-2"
        // Commented out original binding logic
        // value={formData.value.username}
        // onChange={(e) => formData.pushValue('username', e.target.value)}
        // isInvalid={formData.errors.username?.isInvalid}
        // errorMessage={formData.errors.username?.msg}

        // Replaced with quick binding
        // NextUI.N_Input is a special adaptation for [NextUI.Input], other components are being supplemented
        // Developers can also supplement third-party components in their projects, see developer documentation for details (to be added)
        {...attr('username', attr.NextUI.N_Input)}
      ></Input>
      <Input
        autoComplete="new-password"
        type="password"
        className="mb-2"
        placeholder="Please enter login password"
        {...attr('password', attr.NextUI.N_Input)}
        // value={formData.value.password}
        // isInvalid={formData.errors.password?.isInvalid}
        // errorMessage={formData.errors.password?.msg}
        // onChange={(e) => formData.pushValue('password', e.target.value)}
      ></Input>
      <Input
        className="mb-2"
        placeholder="Please enter age"
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

      <Button onClick={submit}>Login</Button>
    </div>
  )
}

export default Example

```
