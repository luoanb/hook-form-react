# Hook Form React

This library is a lightweight, dependency-free solution for form validation and submission designed specifically for React applications.

English [中文](./README.md)

Developed using React Hooks and TypeScript, it aims to provide a simple, efficient, and extensible way to handle form validation and submission, whether in simple or complex form scenarios. The design philosophy of this library emphasizes compatibility and extensibility, with the principle of supporting developers to achieve the richest functionality with the least code possible. It does not bind to any UI component library, thereby supporting all React component libraries.

## Features

- **Zero Dependencies**: Avoids project bloat and compatibility issues that may arise from external dependencies.
- **Highly Extensible**: Easily adaptable to various validation rules and form scenarios to meet different requirements.
- **TypeScript Support**: Takes full advantage of TypeScript's type checking to enhance code readability and maintainability.
- **Universality**: Compatible with all UI component libraries, providing a unified form processing solution for React developers.
- **Documentation Support**: Utilizes TypeDoc to generate comprehensive documentation, helping developers better understand and use the features of the library.
- **Flexible Packaging Support**: Uses Rollup for packaging, supporting UMD, CommonJS, and ES module formats to adapt to different usage scenarios and environments.

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

```typescript
// Basic usage
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

## API Reference

This section should provide detailed information about the hooks, functions, their parameters, return types, and usage examples offered by the library, enabling developers to quickly get started and effectively utilize the library's features.

[API](https://luoanb.github.io/hook-form-react/)

## Contribution Guidelines

We welcome and encourage community members to contribute to this project, whether through submitting bug reports, feature requests, or directly contributing code. Please refer to our contribution guidelines for more information.

## License

This project is licensed under the MIT License, details of which can be found in the [LICENSE](./LICENSE) file.
