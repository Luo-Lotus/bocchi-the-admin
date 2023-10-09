import { FC } from 'react';

export type ComponentProps<T extends FC<any>, P = Parameters<T>[0]> = P;
