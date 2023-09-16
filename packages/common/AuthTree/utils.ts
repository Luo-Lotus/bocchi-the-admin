import _ from 'lodash';

type Auth = {
  name?: string;
  code: number;
};

export const getFlattedAuthList = (AuthTree: any) => {
  const result: Auth[] = [];
  const traverse = (node: any, parentName?: string) => {
    if (node.code) {
      result.push({
        code: node.code,
        name: node.name,
      });
    }

    const otherNode = _.omit(node, 'name', 'code');
    Object.values(otherNode).forEach((item) => {
      traverse(item, node.nameConcat && parentName);
    });
  };
  traverse(AuthTree);
  return result;
};
