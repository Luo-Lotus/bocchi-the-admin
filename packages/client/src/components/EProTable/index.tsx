import {
  ParamsType,
  ProColumns,
  ProTable,
  ProTableProps,
} from '@ant-design/pro-components';
import { useMemo } from 'react';
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

export const formatTableColumns = <T extends ProColumns<any, any>>(
  columns: T[],
): T[] => {
  const defaultEColumn = COLUMN_VALUE_TYPE_MAP['default'];
  return columns.map((item) => {
    const extendsColumn = COLUMN_VALUE_TYPE_MAP[item.valueType as string];
    return {
      ...(extendsColumn || defaultEColumn),
      ...item,
    };
  });
};

const EProTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: EProTableProps<DataType, Params, ValueType>,
) => {
  const newColumns = useMemo(
    () => formatTableColumns(props.columns || []),
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

export default EProTable;
