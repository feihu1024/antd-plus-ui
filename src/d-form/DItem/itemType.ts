/*
 * @Author       : wangfeihu
 * @Date         : 2023-07-12 16:46:29
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-07-20 16:34:49
 * @Description  : DItem的类型声明
 */
import {
  AutoCompleteProps,
  ButtonProps,
  CascaderProps,
  CheckboxProps,
  DatePickerProps,
  DividerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  MentionProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderSingleProps,
  SwitchProps,
  TimePickerProps,
  TransferProps,
  TreeSelectProps,
  UploadProps,
} from 'antd';
import { HTMLAttributes, ReactNode } from 'react';

import { RangePickerProps } from 'antd/lib/date-picker';
import { PasswordProps, TextAreaProps } from 'antd/lib/input';

import { DCascaderProps } from '../../d-cascader';
import { DInputProps } from '../../d-input';
import { DSelectProps } from '../../d-select';
import { DTreeSelectProps } from '../../d-tree-select';
import { DUploadProps } from '../../d-upload';

type DItemBaseProps = {
  /** label标签文本,同antd Form.Item的label,只能是string */
  label?: string;
  /** name标签文本,同antd Form.Item的name */
  name?: string;
  /** Form.Item 的其他属性 */
  formItemProps?: FormItemProps;
};

/** 自定义渲染的DItem */
type CustomItemProps = DItemBaseProps &
  HTMLAttributes<HTMLElement> & {
    /** 渲染类型 */
    renderType?: 'custom' | 'other';
    /** 自定义渲染函数 */
    // eslint-disable-next-line no-unused-vars, no-use-before-define
    render?: (props: any, formItemProps: FormItemProps, allProps?: DItemProps) => ReactNode;
    children?: ReactNode;
    [key: string]: any;
  };

type DInputItemProps = { renderType?: 'dInput' } & DItemBaseProps & DInputProps;
type InputItemProps = { renderType?: 'input' } & DItemBaseProps & InputProps;
type TextAreaItemProps = { renderType?: 'textArea' } & DItemBaseProps & TextAreaProps;
type PasswordItemProps = { renderType?: 'password' } & DItemBaseProps & PasswordProps;
type InputNumberItemProps = { renderType?: 'inputNumber' } & DItemBaseProps & InputNumberProps;
type AutoCompleteItemProps = { renderType?: 'autoComplete' } & DItemBaseProps & AutoCompleteProps;
type DSelectItemProps = { renderType?: 'dSelect' } & DItemBaseProps & DSelectProps;
type SelectItemProps = { renderType?: 'select' } & DItemBaseProps & SelectProps;
type DCascaderItemProps = { renderType?: 'dCascader' } & DItemBaseProps & DCascaderProps;
type CascaderItemProps = { renderType?: 'cascader' } & DItemBaseProps & CascaderProps;
type DTreeSelectItemProps = { renderType?: 'dTreeSelect' } & DItemBaseProps & DTreeSelectProps;
type TreeSelectItemProps = { renderType?: 'treeSelect' } & DItemBaseProps & TreeSelectProps;
type DatePickerItemProps = { renderType?: 'datePicker' } & DItemBaseProps & DatePickerProps;
type TimePickerItemProps = { renderType?: 'timePicker' } & DItemBaseProps & TimePickerProps;
type RangePickerItemProps = { renderType?: 'rangePicker' } & DItemBaseProps & RangePickerProps;
type MentionItemProps = { renderType?: 'mentions' } & DItemBaseProps & MentionProps;
type CheckboxItemProps = { renderType?: 'checkbox' } & DItemBaseProps & CheckboxProps;
type RadioItemProps = { renderType?: 'radio' } & DItemBaseProps & RadioProps;
type RateItemProps = { renderType?: 'rate' } & DItemBaseProps & RateProps;
type SliderItemProps = { renderType?: 'slider' } & DItemBaseProps & SliderSingleProps;
type SwitchItemProps = { renderType?: 'switch' } & DItemBaseProps & SwitchProps;
type TransferItemProps = { renderType?: 'transfer' } & DItemBaseProps & TransferProps<any>;
type UploadItemProps = { renderType?: 'upload' } & DItemBaseProps & UploadProps;
type DUploadItemProps = { renderType?: 'dUpload' } & DItemBaseProps & DUploadProps;
type ButtonItemProps = { renderType?: 'button' } & DItemBaseProps & ButtonProps;
type DividerItemProps = { renderType?: 'divider' } & DItemBaseProps & DividerProps;

export type DItemProps =
  | CustomItemProps
  | DInputItemProps
  | InputItemProps
  | TextAreaItemProps
  | PasswordItemProps
  | InputNumberItemProps
  | AutoCompleteItemProps
  | DSelectItemProps
  | SelectItemProps
  | DCascaderItemProps
  | CascaderItemProps
  | DTreeSelectItemProps
  | TreeSelectItemProps
  | DatePickerItemProps
  | TimePickerItemProps
  | RangePickerItemProps
  | MentionItemProps
  | CheckboxItemProps
  | RadioItemProps
  | RateItemProps
  | SliderItemProps
  | SwitchItemProps
  | TransferItemProps
  | UploadItemProps
  | DUploadItemProps
  | ButtonItemProps
  | DividerItemProps;
