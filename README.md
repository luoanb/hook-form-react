# Hook Form React

This library is a lightweight, dependency-free solution for form validation and submission designed specifically for React applications.

该库是一个专为 React 应用设计的轻量级、无依赖的表单验证和提交解决方案。

中文 | [English](./README.en.md) | [API](https://luoanb.github.io/hook-form-react/) | [示例:Stackblitz](https://stackblitz.com/~/github.com/luoanb/hook-form-react-example)

基于 React Hooks 和 TypeScript 开发，旨在提供一个简洁、高效且易于扩展的方式来处理表单验证和提交，无论是在简单还是复杂的表单场景中都能灵活应对。本库的设计哲学是兼容性和扩展性，理念是支持开发者以最少的代码实现最丰富的功能，不绑定任何 UI 组件库，从而支持所有 React 组件库。

## 特点

- **零依赖**：避免了因引入外部依赖而可能导致的项目膨胀和兼容性问题。
- **高度可扩展**：可通过简单配置应对各种验证规则和表单场景，满足不同需求。
- **TypeScript 支持**：充分利用 TypeScript 提供的类型检查，增强代码的可读性和可维护性。
- **通用性**：适配所有 UI 组件库，为 React 开发者提供统一的表单处理解决方案。
- **文档支持**：使用 TypeDoc 生成详尽的文档，帮助开发者更好地理解和使用库中的功能。
- **灵活的打包支持**：使用 Rollup 进行打包，支持 UMD、CommonJS 和 ES 模块格式，以适配不同的使用场景和环境。

## 版本说明

- **Next 后续版本计划**

  1. **MUI 组件**： 组件未自带表单验证，一般使用 react-hook-form（体验并不好），所以后续会进行适配，但由于当前企业并未使用该套组件库，所以优先级并不高

- **v2.2.0**

  1. **Antd 组件**：表单组件已经适配完成,截止到当前版本，(我们已经适配完` Next UI`、`Antd `两个组件库), `import { Antd_5 } from 'hook-form-react/Antd_5'`,对于`antd`的适配的所有内容都包含在这里，和核心库隔离。使用示例请参考 [示例:Stackblitz](https://stackblitz.com/~/github.com/luoanb/)

- **v2.1.0**

  1. 修复立即赋值,立即验证时,获取不到最新的表单数据的问题(React.useState 异步执行导致的 bug),
     新增两个方法：`doValidateImme` `doAllValidateImme`，当发现使用`doValidate`,`doAllValidate`存在问题时，相应替换一下对应的方法，原则上推荐优先使用`doValidate`,`doAllValidate`。

- **v2.0.2**

  1. 自定义校验规则，`execute?: (value: V, content: any) => Promise<boolean>` ，添加`content`参数用于获取表单上下文数据

- **v2.0.0**

  1. 新增对象嵌套型表单的支持,具体可查看[Stackblitz](https://stackblitz.com/~/github.com/luoanb/hook-form-react-example)
  2. 添加 Stackblitz 示例项目(需要科学上网)

- **v1.0.0**

  1. 重构了验证规则实现类，使用会更友好，同时新增几个常用验证规则 [所有的常用验证规则](https://luoanb.github.io/hook-form-react/classes/Verifications.html)。验证规则并未完全经过测试，有问题欢迎@我。
  2. **NextUI 组件**：目前所有表单已经适配完成 [所有已适配组件](https://luoanb.github.io/hook-form-react/classes/NextUI_2_2.html) (如有遗漏后续会补上，@手动 dog，嘿嘿)
  3. 修复类型声明不准确问题。
  4. 添加测试项目，用于验证功能

- **v0.5.x (底层实现预览)**

  1. 底层框架已实现，使用体验顺畅，可直接[往下看高级用法]()
  2. 整体拓展性良好，组件库相关代码和表单核心代码是完全隔离的，这为今后支持不同的组件库打下基础。
  3. 表单数据状态，表单异常状态完全可控，可以根据业务定制逻辑。
  4. 验证规则也是统一实现，拓展和自定义都很方便。
  5. 零依赖项，纯 hooks。

## 组件库支持情况

- 【90 分】 NextUI 体验良好，且有问题会及时修复（自己也在用）

- 【60 分】 MUI 在 MUI 自己不支持表单验证的前提下，使用 hook-form-react 也是不会错的，至少相对于 react-hook-form，它没有一堆复杂的概念不是吗。

- 【50 分】 Antd 组件自有表单使用体验不错的，优选选自有表单吧，（后续适配主要考虑双组件库情况）。

- 【50 分】 ......

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

### 基础用法

原则上可适应 React 所有的组件库，只是代码量略大

```typescript
// 基础用法：原则上可适应 React 所有的组件库，只是代码量略大
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

### 高级用法

提供了辅助工具，可以使得开发更快捷，同时不丢失高度的可定制性

```typescript
// 高级用法：提供了辅助工具，可以使得开发更快捷，同时不丢失高度的可定制性
import { Button, Input } from '@nextui-org/react'
import { useAttr, useFormData, Verifications } from 'hook-form-react'

export const Example = () => {
  const formData = useFormData(
    { password: '', username: '' },
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
      ]
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
    <div className="p-10 pt-18 pb-0 flex-col">
      <Input
        placeholder="请输入账户"
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
        placeholder="请输入登录密码"
        {...attr('password', attr.NextUI.N_Input)}
        // value={formData.value.password}
        // isInvalid={formData.errors.password?.isInvalid}
        // errorMessage={formData.errors.password?.msg}
        // onChange={(e) => formData.pushValue('password', e.target.value)}
      ></Input>

      <Button onClick={submit}>登录</Button>
    </div>
  )
}
```

### 嵌套对象表单

新增一个 hook `useSubFormData`用于处理嵌套表单，原则上可以处理任意层数的对象嵌套（也就是无线套娃）。

```ts
// useSubFormData
const value10Form = useSubFormData(formData.formData, 'value10', {
  haha: [Verifications.required(), Verifications.email()]
})

/**
 * 嵌套对象的表单组件需要用它来绑定
 */
const attrValue10 = useAttr(value10Form)

// 提交
const submit = async () => {
  const isValid = await formData.doAllValidate()
  // 嵌套表单需要单独验证
  const isValidValue10 = await value10Form.doAllValidate()
  console.log('submit:isValid: ', isValid, isValidValue10)
  if (isValid && isValidValue10) {
    //顶层form能拿到所有value
    console.log('formValue', formData.value)
  }
}

// 重置
const reset = () => {
  formData.reset()
  // 错误状态得单独重置
  value10Form.formErrors.reset()
}
```

### [完整示例](./example.md)

## API 参考

本节应详细介绍库中提供的 Hooks、函数及其参数、返回值类型和使用示例，以便开发者能够快速上手并有效利用库的功能。

[API](https://luoanb.github.io/hook-form-react/)

## 贡献指南

我们欢迎并鼓励社区成员对本项目做出贡献，无论是通过提交错误报告、功能请求还是直接提交代码。请参阅我们的贡献指南了解更多信息。

## 许可证

该项目采用 MIT 许可证，详情请见[LICENSE](./LICENSE)文件。
