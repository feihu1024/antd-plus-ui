/*
 * @Author       : wangfeihu
 * @Date         : 2023-05-17 08:41:25
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-06-13 11:00:21
 * @Description  : 基于antd的Select组件
 */
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { BaseSelectRef } from 'rc-select/lib/BaseSelect';

export type DSelectProps = Omit<SelectProps, 'options' | 'onSearch' | 'loading'> & {
  /** antd的onSearch属性，onSearch有效时showSearch自动为true */
  // eslint-disable-next-line no-unused-vars
  onSearch?: (params?: any) => Promise<DefaultOptionType[] | any[]>;
  /** antd的options属性，可以是一个options数组，或一个返回等价options数组的promise */
  options?: DefaultOptionType[] | DSelectProps['onSearch'];
  /** antd的loading属性，是否显示加载中：传入数字表示延迟加载,单位毫秒，0等同于false */
  loading?: boolean | number;
  /** 是否开启防抖： true表示800毫秒，true表示默认值，false或0表示不开启 */
  debounce?: boolean | number;
};

// 获取延时时间，默认800ms，true代表默认时间,false代表0
function getDelayTime(value?: boolean | number, defaultValue = 800) {
  if (value === true) {
    return defaultValue;
  } else if (value === false) {
    return 0;
  } else {
    return typeof value === 'number' ? Number(value) || 0 : defaultValue;
  }
}

// 获取默认本地搜索方法
function getFilterOption(showSearch, filterOption, fieldNames) {
  if (filterOption) {
    return filterOption;
  } else {
    return showSearch && ((value, option) => option[fieldNames.label]?.includes(value));
  }
}

function InternalSelect(props: DSelectProps, ref: React.Ref<BaseSelectRef>) {
  const {
    className = '',
    popupClassName = '',
    fieldNames,
    searchValue,
    filterOption,
    options: initOptions,
    onSearch,
    loading: initLoading,
    debounce = false,
    ...otherProps
  } = props;

  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(typeof initLoading === 'boolean' ? initLoading : true);

  const _className = `'d-select' ${className}`;
  const _popupClassName = `d-select-dropdown ${popupClassName}`;

  const debounceRef = useRef<any>(null); // 防抖处理引用
  const loadingRef = useRef<{ timer: any; status: 'loading' | 'done' }>({
    timer: null,
    status: 'done',
  });
  const loadingParamsRef = useRef<any>(null); // 数据加载同步处理引用

  const _fieldNames = { label: 'label', value: 'value', children: 'children', ...fieldNames };

  const _showSearch = !!onSearch;

  const _debounce = getDelayTime(debounce);
  const _loadingState = getDelayTime(initLoading, 600);

  const _loading = typeof initLoading === 'boolean' ? initLoading : loading;

  const _filterOption = getFilterOption(!_showSearch, filterOption, _fieldNames);

  const getOptions = useMemo(
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    () => (typeof initOptions === 'function' ? initOptions : (params?: any): Promise<DefaultOptionType[] | any[]> => Promise.resolve(initOptions || [])),
    [initOptions],
  );

  const updateOptions = (fun: DSelectProps['onSearch'], value?: string) => {
    // 设置加载中状态
    if (_loadingState > 0) {
      loadingRef.current.status = 'loading';
      clearTimeout(loadingRef.current.timer);
      loadingRef.current.timer = setTimeout(() => {
        if (loadingRef.current.status === 'loading') {
          setLoading(true);
        }
      }, _loadingState);
    }

    // 记录请求参数,清空options
    loadingParamsRef.current = value;
    setOptions([]);

    // 发起请求
    fun?.(value)
      .then((response) => {
        if (loadingParamsRef.current === value) {
          setOptions(response);
          setLoading(false);
          loadingRef.current.status = 'done';
        }
      })
      .catch(() => {
        if (loadingParamsRef.current === value) {
          setLoading(false);
          loadingRef.current.status = 'done';
        }
      });
  };

  const _onSearch = (value) => {
    if (onSearch) {
      if (_debounce > 0) {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          updateOptions(onSearch, value);
        }, _debounce);
      } else {
        updateOptions(onSearch, value);
      }
    }
  };

  useEffect(() => updateOptions(getOptions, searchValue), [getOptions, searchValue]);

  return (
    <Select
      allowClear={true}
      filterOption={_filterOption}
      showSearch={_showSearch}
      searchValue={searchValue}
      {...otherProps}
      ref={ref}
      className={_className}
      popupClassName={_popupClassName}
      fieldNames={_fieldNames}
      onSearch={_showSearch ? _onSearch : undefined}
      loading={_loading}
      options={options}
    />
  );
}

const DSelect = forwardRef(InternalSelect);
export default DSelect;
