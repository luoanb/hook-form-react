import { RenderAttrProps } from "./useAttr"

/**
 * NextUI 2.2 版本快速填写
 */
export class NextUI_2_2 {
  /**
   * NextUI 表单错误绑定
   * @param props Form表单上下文
   * @returns
   */
  static N_ErrorFiled = ({ isError, msg }: RenderAttrProps<any>) => {
    return { isInvalid: isError, errorMessage: msg }
  }

  /**
   * HTML原生Input 绑定
   * @param props Form表单上下文
   * @returns
   */
  static D_Input = ({ value, setValue }: RenderAttrProps<string>) => {
    return {
      value,
      onChange: (e: any) => setValue(e.target.value)
    }
  }

  /**
   * NextUI_Input
   * @param props
   * @returns
   */
  static readonly N_Input = (props: RenderAttrProps<string>) => {
    return {
      ...this.N_ErrorFiled(props),
      ...this.D_Input(props)
    }
  }
}