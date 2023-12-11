import {
  ParamsType,
  ProColumns,
  ProFormColumnsType,
  ProTable,
  ProTableProps,
} from '@ant-design/pro-components';
import _ from 'lodash';
import { ComponentProps, useMemo } from 'react';
import { COLUMN_VALUE_TYPE_MAP } from './constants';

type EProTableProps<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
> = ProTableProps<DataType, Params, ValueType> & {
  columns?: (ProColumns<DataType, ValueType> & {
    valueType?: any & ProColumns<DataType, ValueType>['valueType'];
  })[];
};

export type SchemaType<T> = ProColumns<T> & ProFormColumnsType<T>;

export const formatTableColumns = <T extends ProColumns<any, any>>(
  columns: T[],
  applyCustomWidth = false,
): T[] => {
  const defaultEColumn = COLUMN_VALUE_TYPE_MAP['default'];

  return columns.map((item) => {
    const extendsColumn = COLUMN_VALUE_TYPE_MAP[item.valueType as string];
    const customColumn = extendsColumn || defaultEColumn;
    return {
      ...customColumn,
      ...item,
      width: applyCustomWidth ? customColumn.width : item.width,
      fieldProps: {
        ...(extendsColumn?.fieldProps || {}),
        ...item.fieldProps,
      },
      valueType: extendsColumn?.valueType || item.valueType,
    };
  });
};

/** 对ProTable的Request属性进行封装 */
export const commonRequest =
  (
    queryFn: (...arg: any[]) => any,
  ): ComponentProps<typeof ProTable<any>>['request'] =>
  async (params, sorter, filter) => {
    const result = await queryFn({
      page: {
        current: params.current!,
        pageSize: params.pageSize!,
      },
      filter: _.omit(params, ['pageSize', 'current']),
      sort: _.mapValues(sorter, (value) => value?.split('end')[0]),
    });
    return {
      data: result.data,
      total: result.count,
      success: !!result,
    };
  };

const EProTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: EProTableProps<DataType, Params, ValueType>,
) => {
  const newColumns = useMemo(
    () => formatTableColumns(props.columns || [], true),
    [props.columns],
  );

  const tableWidth = useMemo(
    () =>
      newColumns.reduce<number>(
        (acc, next) => acc + (next?.width as number),
        0,
      ),
    [newColumns],
  );

  return (
    <ProTable {...props} columns={newColumns} scroll={{ x: tableWidth }} />
  );
};

export { ProProvider } from '@ant-design/pro-components';

export default EProTable;
