import { FormInstance } from 'antd';
import _ from 'lodash';
import React, { useEffect } from 'react';
import useQueryParams from './useQueryParams';

export default (formRef: React.RefObject<FormInstance | undefined>) => {
  const queryParams = useQueryParams();

  useEffect(() => {
    if (!_.isEmpty(queryParams)) {
      formRef.current?.setFieldsValue(queryParams);
      formRef.current?.submit();
    }
  }, [queryParams]);
};
