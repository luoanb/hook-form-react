import { RenderAttrProps } from './useAttr'

/**
 * 属性绑定基类
 */
export class AttrBase {
  /**
   * HTML原生Input绑定：value/onChange(e.target.value)
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
   * 绑定value/onChange(value)
   * @param props
   * @returns
   */
  static D_ValueChange = (props: RenderAttrProps<any>) => {
    return {
      value: props.value,
      onChange: props.setValue
    }
  }
}
