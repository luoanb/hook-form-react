import { SelectProps } from '@nextui-org/react'
import { RenderAttrProps } from './useAttr'
import { AttrBase } from './AttrBase'

/**
 * NextUI 2.2 绑定组件属性 快速填写
 */
export class NextUI_2_2 extends AttrBase {
  /**
   * 字符串值绑定(value/onValueChange)
   * @param props
   * @returns
   */
  static B_TextBind = (props: RenderAttrProps<string>) => {
    return {
      ...this.N_ErrorBind(props),
      value: props.value,
      onValueChange: props.setValue
    }
  }

  /**
   * 绑定value/onChange(value)
   * @param props
   * @returns
   */
  static B_ValueChange = (props: RenderAttrProps<any>) => {
    return {
      ...this.N_ErrorBind(props),
      ...this.D_ValueChange(props)
    }
  }

  /**
   * NextUI 表单错误绑定
   * @param props Form表单上下文
   * @returns
   */
  static N_ErrorBind = ({ isError, msg }: RenderAttrProps<any>) => {
    return { isInvalid: isError, errorMessage: msg }
  }

  /**
   * NextUI_Input
   * @param props
   * @returns
   */
  static N_Input = (props: RenderAttrProps<string>) => {
    return {
      ...this.N_ErrorBind(props),
      ...this.D_Input(props)
    }
  }

  /**
   * NextUI_Select_Multiple
   * @param props
   * @returns
   */
  static N_Select_Mult = <T = any>(props: RenderAttrProps<T[]>) => {
    return {
      ...this.N_ErrorBind(props),
      selectionMode: 'multiple',
      selectedKeys: new Set(props.value || []),
      onChange: (e: any) => props.setValue((e.target.value || '').split(','))
    } as Partial<SelectProps<T>>
  }

  /**
   * NextUI_Select_Single
   * @param props
   * @returns
   */
  static N_Select = <T = any>(props: RenderAttrProps<T>) => {
    return {
      ...this.N_ErrorBind(props),
      selectedKeys: new Set([props.value]),
      onChange: (e: any) => props.setValue(e.target.value)
    } as Partial<SelectProps<T>>
  }

  /**
   * NextUI_Checkbox
   * @param props
   */
  static N_Checkbox = (props: RenderAttrProps<boolean>) => {
    return {
      ...this.N_ErrorBind(props),
      isSelected: props.value,
      onValueChange: props.setValue
    } // as Partial<CheckboxProps>
  }

  /**
   * NextUI_Switch
   * @param props
   */
  static N_Switch = (props: RenderAttrProps<boolean>) => {
    return this.N_Checkbox(props)
  }

  /**
   * NextUI_RadioGroup
   * @param props
   */
  static N_RadioGroup = (props: RenderAttrProps<string>) => {
    return this.B_TextBind(props)
  }

  /**
   * NextUI_TextArea
   * @param props
   */
  static N_TextArea = (props: RenderAttrProps<string>) => {
    return this.B_TextBind(props)
  }

  /**
   * NextUI_Slider
   * @param props
   */
  static N_Slider = (props: RenderAttrProps<string>) => {
    return this.B_ValueChange(props)
  }
}
