import { history } from '@umijs/max';
import queryString from 'query-string';
import { useMemo } from 'react';

export default () => {
  const queryParams = useMemo(
    () => queryString.parse(history.location.search),
    [history.location.search],
  );

  return queryParams;
};
