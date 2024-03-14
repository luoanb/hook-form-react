import { RenderAttrProps } from '../useAttr'
import { InputProps } from 'antd'
import { FormItemProps, FormItem } from './FormItem'
import { AttrBase } from '../AttrBase'
/**
 * Antd-5 属性绑定
 */
export class Antd_5 extends AttrBase {
  /**
   * 错误提醒与状态
   * @param props
   * @returns
   */
  static A_Error = (props: RenderAttrProps<any>) => {
    const status: any = props.isError ? 'error' : undefined
    return {
      status
    }
  }
  /**
   * Antd.Input
   * @param props
   * @returns
   */
  static A_Input = (props: RenderAttrProps<string>) => {
    return {
      ...this.A_Error(props),
      ...this.D_Input(props)
    } as InputProps
  }
  /**
   * Antd.Input
   * @param props
   * @returns
   */
  static A_InputNumber = (props: RenderAttrProps<string>) => {
    return {
      ...this.A_Error(props),
      ...this.D_ValueChange(props)
    }
  }

  /**
   * 兼容Antd5的FormItem
   * @description 由于 Antd.Form.Item与 Antd.Form 深度耦合，使用它会导致额外的性能损失； 对于错误提醒，采用新Item展示
   */
  static FormItem = FormItem
}
export type { FormItemProps }
