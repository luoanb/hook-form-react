# Hook Form React

This library is a lightweight, dependency-free solution for form validation and submission designed specifically for React applications.

English | [中文](./README.md) | [API](https://luoanb.github.io/hook-form-react/) | [Example:Stackblitz](https://stackblitz.com/~/github.com/luoanb/hook-form-react-example)

Developed using React Hooks and TypeScript, it aims to provide a simple, efficient, and extensible way to handle form validation and submission, whether in simple or complex form scenarios. The design philosophy of this library emphasizes compatibility and extensibility, with the principle of supporting developers to achieve the richest functionality with the least code possible. It does not bind to any UI component library, thereby supporting all React component libraries.

## Features

- **Zero Dependencies**: Avoids project bloat and compatibility issues that may arise from external dependencies.
- **Highly Extensible**: Easily adaptable to various validation rules and form scenarios to meet different requirements.
- **TypeScript Support**: Takes full advantage of TypeScript's type checking to enhance code readability and maintainability.
- **Universality**: Compatible with all UI component libraries, providing a unified form processing solution for React developers.
- **Documentation Support**: Utilizes TypeDoc to generate comprehensive documentation, helping developers better understand and use the features of the library.
- **Flexible Packaging Support**: Uses Rollup for packaging, supporting UMD, CommonJS, and ES module formats to adapt to different usage scenarios and environments.

## Version Notes

- **Future Plans for Next Versions**

  1. **MUI UI**: These components do not come with form validation, generally used with react-hook-form (which does not provide a good experience), so there will be adaptations in the future. However, as this component library is not currently used by our company, the priority is not high.

- **v2.2.0**

  1. **Antd UI**: Form components have been adapted. As of the current version, we have adapted two component libraries, `Next UI` and `Antd`. To import Antd components, use `import { Antd_5 } from "hook-form-react"`. All adaptations for Antd are included here and isolated from the core library. For usage examples, please refer to [Example: Stackblitz](https://stackblitz.com/~/github.com/luoanb/).

- **v2.1.0**

  1. Fixed an issue where the latest form data could not be obtained when assigning values and validating immediately (a bug caused by the asynchronous execution of React.useState).
     Added two functions `doValidateImme` and `doAllValidateImme`. When issues are found using `doValidate` or `doAllValidate`, replace them with the corresponding new functions. Principally, it is recommended to use `doValidate` and `doAllValidate` first.

- **v2.0.2**

  1. Custom validation rules, `execute?: (value: V, content: any) => Promise<boolean>`, added a `content` parameter for accessing form context data.

- **v2.0.0**

  1. Added support for nested object forms. For more details, see [Stackblitz](https://stackblitz.com/~/github.com/luoanb/hook-form-react-example).
  2. Added a Stackblitz example project (requires VPN for access).

- **v1.0.0 (Official Release)**

  1. Refactored the validation rule implementation class for a friendlier usage experience, and added several common validation rules [All common validation rules](https://luoanb.github.io/hook-form-react/classes/Verifications.html). The validation rules have not been fully tested; issues are welcome to be reported.
  2. **NextUI Components**: All forms have now been adapted [All adapted components](https://luoanb.github.io/hook-form-react/classes/NextUI_2_2.html) (any omissions will be updated, @manual dog, hehe)
  3. Fixed inaccurate type declarations.
  4. Added test projects for functionality verification.

- **v0.5.x (Core Implementation Preview)**

  1. The core framework has been implemented, offering a smooth user experience, and can be directly used [see advanced usage]() below.
  2. Overall good extensibility, with component library related code and core form code being completely isolated, laying the foundation for future support of different component libraries.
  3. Complete control over form data state and form error state, allowing for customization according to business logic.
  4. Validation rules are also uniformly implemented, making extension and customization convenient.
  5. Zero dependencies, purely hooks-based.

## Component Library Support

- **90 Points**: NextUI provides a good experience, and issues are promptly fixed (also in use by ourselves).

- **60 Points**: MUI, given its lack of support for form validation, using hook-form-react is still a good choice. At least compared to react-hook-form, it doesn't have a bunch of complex concepts, right?

- **50 Points**: Antd components have a good native form experience, prefer to choose their own forms (subsequent adaptations mainly consider dual component library scenarios).

- **50 Points**: ......

## Installation

```shell
# pnpm
pnpm add hook-form-react

# yarn
yarn add hook-form-react

# npm
npm i hook-form-react
```

## Usage

### Basic usage

In principle, it can adapt to all React component libraries, although this slightly increases the amount of code.

```typescript
// Basic usage: In principle, it can adapt to all React component libraries, although this slightly increases the amount of code.
import { useAttr, useFormData } from 'hook-form-react'
// Using NextUI
import { Button, Input, Link } from '@nextui-org/react'

const Example = () => {
  const formData = useFormData(
    { password: '', username: '' }, // Default data
    {
      // Validation rules for password
      password: [
        {
          execute: async (value) => !!value,
          msg: 'Password cannot be empty'
        }
      ],
      // Validation rules for username
      username: [
        {
          execute: async (value) => !!value,
          msg: 'Username cannot be empty'
        }
      ]
    }
  )

  // Submission
  const submit = async () => {
    // Validate all form fields
    const isValid = await formData.doAllValidate()
    console.log('submit:isValid: ', isValid)
    if (isValid) {
      // Validation successful
      console.log('formValue:', formData.value)
    }
  }
  return (
    <div>
      <Input
        placeholder="Please enter your username"
        className="mb-4 mt-10 login-input text-sm"
        isInvalid={formData.errors.username?.isInvalid} // Bind error state
        errorMessage={formData.errors.username?.msg} // Bind error message
        value={formData.value.username} // Bind value
        onChange={(e) => formData.pushValue('username', e.target.value)} // Handle onChange
      ></Input>
      <Input
        autoComplete="new-password"
        type="password"
        placeholder="Please enter your password"
        value={formData.value.password}
        isInvalid={formData.errors.password?.isInvalid}
        errorMessage={formData.errors.password?.msg}
        onChange={(e) => formData.pushValue('password', e.target.value)}
      ></Input>
      <Button onClick={submit}>Login</Button>
    </div>
  )
}
```

### Advanced Usage

Providing Utility Tools for Faster Development Without Losing Customizability

```typescript
// Advanced Usage: Providing Utility Tools for Faster Development Without Losing Customizability

import { Button, Input } from '@nextui-org/react'
import { useAttr, useFormData, Verifications } from 'hook-form-react'

export const Example = () => {
  const formData = useFormData(
    { password: '', username: '' },
    {
      // Supports multiple validations
      password: [
        // Built-in validator for required field validation
        // Developers can also add other validation rules in their projects, see the developer documentation for details (to be added)
        Verifications.required(),
        // Built-in validator for password validation
        Verifications.password()
      ],
      username: [
        // Built-in validator for required field validation + custom message
        Verifications.required('Username cannot be empty'),
        // Built-in validator for username validation
        Verifications.username()
      ]
    }
  )

  // Use component to quickly bind hooks
  const attr = useAttr(formData)

  const submit = async () => {
    const isValid = await formData.doAllValidate()
    console.log('submit:isValid: ', isValid)
    if (isValid) {
      console.log('formValue', formData.value)
    }
  }

  return (
    <div className="p-10 pt-18 pb-0 flex-col">
      <Input
        placeholder="Please enter your username"
        // Comment out the original binding logic
        // value={formData.value.username}
        // onChange={(e) => formData.pushValue('username', e.target.value)}
        // isInvalid={formData.errors.username?.isInvalid}
        // errorMessage={formData.errors.username?.msg}

        // Replace with quick binding
        // NextUI.N_Input is specifically adapted for [NextUI.Input], other components are being supplemented
        // Developers can also add support for third-party components in their projects, see the developer documentation for details (to be added)
        {...attr('username', attr.NextUI.N_Input)}
      ></Input>
      <Input
        autoComplete="new-password"
        type="password"
        placeholder="Please enter your password"
        {...attr('password', attr.NextUI.N_Input)}
        // value={formData.value.password}
        // isInvalid={formData.errors.password?.isInvalid}
        // errorMessage={formData.errors.password?.msg}
        // onChange={(e) => formData.pushValue('password', e.target.value)}
      ></Input>

      <Button onClick={submit}>Login</Button>
    </div>
  )
}
```

### Nested Object Forms

Introducing a new hook `useSubFormData` for handling nested forms, which, in principle, can handle an arbitrary number of object nesting layers (i.e., infinite nesting).

```ts
// useSubFormData
const value10Form = useSubFormData(formData.formData, 'value10', {
  haha: [Verifications.required(), Verifications.email()]
})

/**
 * This is required for binding to form components of nested objects.
 */
const attrValue10 = useAttr(value10Form)

// Submit
const submit = async () => {
  const isValid = await formData.doAllValidate()
  // Nested forms need to be validated separately
  const isValidValue10 = await value10Form.doAllValidate()
  console.log('submit:isValid: ', isValid, isValidValue10)
  if (isValid && isValidValue10) {
    // The top-level form can access all values
    console.log('formValue', formData.value)
  }
}

// Reset
const reset = () => {
  formData.reset()
  // Error states need to be reset separately
  value10Form.formErrors.reset()
}
```

### [Full Example](./example.en.md)

## API Reference

This section should provide detailed information about the hooks, functions, their parameters, return types, and usage examples offered by the library, enabling developers to quickly get started and effectively utilize the library's features.

[API](https://luoanb.github.io/hook-form-react/)

## Contribution Guidelines

We welcome and encourage community members to contribute to this project, whether through submitting bug reports, feature requests, or directly contributing code. Please refer to our contribution guidelines for more information.

## License

This project is licensed under the MIT License, details of which can be found in the [LICENSE](./LICENSE) file.
