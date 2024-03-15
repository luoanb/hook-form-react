import { RenderAttrProps } from '../useAttr'
import { InputProps } from 'antd'
import { FormItemProps, FormItem } from './FormItem'
import { AttrBase } from '../AttrBase'
import { Color } from 'antd/es/color-picker'
import dayjs, { Dayjs } from 'dayjs'
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
   * Antd.A_Mentions
   * @param props
   * @returns
   */
  static A_Mentions = (props: RenderAttrProps<string>) => {
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
  static A_InputNumber = (props: RenderAttrProps<any>) => {
    return {
      ...this.A_Error(props),
      ...this.D_ValueChange(props)
    }
  }
  /**
   * Antd.Input
   * @param props
   * @returns
   */
  static A_AutoComplete = (props: RenderAttrProps<string>) => {
    return {
      ...this.A_Error(props),
      ...this.D_ValueChange(props)
    }
  }
  /**
   * Antd.Cascader
   * @param props
   * @returns
   */
  static A_Cascader = (props: RenderAttrProps<any[]>) => {
    return {
      ...this.A_Error(props),
      ...this.D_ValueChange(props)
    }
  }
  /**
   * Antd.Checkbox
   * @param props
   * @returns
   */
  static A_Checkbox = (props: RenderAttrProps<boolean>) => {
    return {
      ...this.A_Error(props),
      checked: props.value,
      onChange: (e: any) => props.setValue(e.target.checked)
    }
  }

  /**
   * Antd.Switch
   * @param props
   * @returns
   */
  static A_Switch = (props: RenderAttrProps<boolean>) => {
    return {
      ...this.A_Error(props),
      checked: props.value,
      onChange: (checked: boolean) => props.setValue(checked)
    }
  }

  /**
   * Antd.ColorPicker
   * @param props
   * @returns
   */
  static A_ColorPicker = (props: RenderAttrProps<string>) => {
    return {
      ...this.A_Error(props),
      value: props.value,
      onChange: (color: Color) => props.setValue(color?.toHex() || '')
    }
  }

  /**
   * Antd.DatePicker 注入时需要以函数形式调用
   * @param props
   * @returns
   */
  static F_A_DatePicker = ({ dayjsFormat = 'YYYY-MM-DD HH:mm:ss' } = {}) => {
    return (props: RenderAttrProps<string>) => {
      return {
        ...this.A_Error(props),
        multiple: false,
        value: props.value ? dayjs(props.value, dayjsFormat) : null,
        onChange: (date: Dayjs) => props.setValue(date.format(dayjsFormat))
      }
    }
  }

  /**
   * Antd.TimePicker, 注入时需要以函数形式调用
   * @param dayjsFormat 时间格式化format 默认:'YYYY-MM-DD HH:mm:ss'
   * @returns
   */
  static F_A_TimePicker = ({ dayjsFormat = 'YYYY-MM-DD HH:mm:ss' } = {}) => {
    return (props: RenderAttrProps<string>) => {
      return {
        ...this.A_Error(props),
        multiple: false,
        value: props.value ? dayjs(props.value, dayjsFormat) : null,
        onChange: (date: Dayjs) => props.setValue(date.format(dayjsFormat))
      }
    }
  }

  /**
   * Antd.DatePicker.multiple多选模式 注入时需要以函数形式调用
   * @param props
   * @returns
   */
  static F_A_DatePickerMult = ({ dayjsFormat = 'YYYY-MM-DD HH:mm:ss' } = {}) => {
    return (props: RenderAttrProps<string[]>) => {
      return {
        ...this.A_Error(props),
        multiple: true,
        showTime: false,
        value: props.value ? props.value?.map((it) => dayjs(it, dayjsFormat)) : ([] as Dayjs[]),
        onChange: (date: Dayjs[]) => props.setValue(date?.map((it) => it.format(dayjsFormat)))
      }
    }
  }

  /**
   * Antd.DatePicker.RangePicker 注入时需要以函数形式调用
   * @param props
   * @returns
   */
  static F_A_DateRangePicker = ({ dayjsFormat = 'YYYY-MM-DD HH:mm:ss' } = {}) => {
    // 元组类型不好匹配/索性不校验了
    return (props: RenderAttrProps<any>) => {
      return {
        ...this.A_Error(props),
        value: props.value ? props.value?.map((it: any) => dayjs(it, dayjsFormat)) : [],
        onChange: (date: any) => props.setValue(date?.map((it: any) => it.format(dayjsFormat)))
      }
    }
  }

  /**
   * Antd.RadioGroup
   * @param props
   * @returns
   */
  static A_RadioGroup = (props: RenderAttrProps<any>) => {
    return {
      ...this.A_Error(props),
      ...this.D_Input(props)
    }
  }
  /**
   * Antd.Select
   * @param props
   * @returns
   */
  static A_Select = (props: RenderAttrProps<any>) => {
    return {
      ...this.A_Error(props),
      ...this.D_ValueChange(props)
    }
  }
  /**
   * Antd.TreeSelect
   * @param props
   * @returns
   */
  static A_TreeSelect = (props: RenderAttrProps<any>) => {
    return {
      ...this.A_Error(props),
      ...this.D_ValueChange(props)
    }
  }

  /**
   * Antd.Select.multiple 多选模式
   * @param props
   * @returns
   */
  static A_SelectMuti = (props: RenderAttrProps<any[]>) => {
    return {
      mode: 'multiple',
      ...this.A_Error(props),
      ...this.D_ValueChange(props)
    }
  }

  /**
   * Antd.Select.multiple 多选模式
   * @param props
   * @returns
   */
  static A_Slider = (props: RenderAttrProps<number>) => {
    return {
      range: false,
      ...this.A_Error(props),
      ...this.D_ValueChange(props)
    }
  }

  /**
   * Antd.Select.multiple 多选模式
   * @param props
   * @returns
   */
  static A_SliderRange = (props: RenderAttrProps<number[]>) => {
    return {
      range: false,
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
