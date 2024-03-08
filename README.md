# Hook Form React

中文 [English](./README.en.md)

该库是一个专为 React 应用设计的轻量级、无依赖的表单验证和提交解决方案。基于 React Hooks 和 TypeScript 开发，旨在提供一个简洁、高效且易于扩展的方式来处理表单验证和提交，无论是在简单还是复杂的表单场景中都能灵活应对。本库的设计哲学是兼容性和扩展性，理念是支持开发者以最少的代码实现最丰富的功能，不绑定任何 UI 组件库，从而支持所有 React 组件库。

## 特点

- **零依赖**：避免了因引入外部依赖而可能导致的项目膨胀和兼容性问题。
- **高度可扩展**：可通过简单配置应对各种验证规则和表单场景，满足不同需求。
- **TypeScript 支持**：充分利用 TypeScript 提供的类型检查，增强代码的可读性和可维护性。
- **通用性**：适配所有 UI 组件库，为 React 开发者提供统一的表单处理解决方案。
- **文档支持**：使用 TypeDoc 生成详尽的文档，帮助开发者更好地理解和使用库中的功能。
- **灵活的打包支持**：使用 Rollup 进行打包，支持 UMD、CommonJS 和 ES 模块格式，以适配不同的使用场景和环境。

## 安装

```shell
# pnpm
pnpm add hook-form-react

# yarn
yarn add hook-form-react

# npm
npm i hook-form-react
```

## 使用

```typescript
// 基础用法
import { useAttr, useFormData } from 'hook-form-react'
// 使用了nextui
import { Button, Input, Link } from '@nextui-org/react'

const Example = () => {
  const formData = useFormData(
    { password: '', username: '' }, // 默认数据
    {
      // 验证规则:password
      password: [
        {
          execute: async (value) => !!value,
          msg: '密码不能为空'
        }
      ],
      // 验证规则:username
      username: [
        {
          execute: async (value) => !!value,
          msg: '用户账户不能为空'
        }
      ]
    }
  )

  // 提交
  const submit = async () => {
    // 验证所有表单
    const isValid = await formData.doAllValidate()
    console.log('submit:isValid: ', isValid)
    if (isValid) {
      // 验证成功
      console.log('formValue:', formData.value)
    }
  }
  return (
    <div>
      <Input
        placeholder="请输入账户"
        className="mb-4 mt-10 login-input text-sm"
        isInvalid={formData.errors.username?.isInvalid} // 绑定错误状态
        errorMessage={formData.errors.username?.msg} // 绑定错误提示
        value={formData.value.username} // 绑定value
        onChange={(e) => formData.pushValue('username', e.target.value)} // 帮onChange
      ></Input>
      <Input
        autoComplete="new-password"
        type="password"
        placeholder="请输入登录密码"
        value={formData.value.password}
        isInvalid={formData.errors.password?.isInvalid}
        errorMessage={formData.errors.password?.msg}
        onChange={(e) => formData.pushValue('password', e.target.value)}
      ></Input>
      <Button onClick={submit}>登录</Button>
    </div>
  )
}
```

## API 参考

本节应详细介绍库中提供的 Hooks、函数及其参数、返回值类型和使用示例，以便开发者能够快速上手并有效利用库的功能。

[API](https://luoanb.github.io/hook-form-react/)

## 贡献指南

我们欢迎并鼓励社区成员对本项目做出贡献，无论是通过提交错误报告、功能请求还是直接提交代码。请参阅我们的贡献指南了解更多信息。

## 许可证

该项目采用 MIT 许可证，详情请见[LICENSE](./LICENSE)文件。
