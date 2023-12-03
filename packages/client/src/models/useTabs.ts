import { history } from '@umijs/max';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type TableItem = {
  key: string;
  label: string;
  path: string;
};

const useTabs = create(
  combine(
    {
      tabItems: [] as TableItem[],
      activeKey: undefined as string | undefined,
    },
    (set, get) => ({
      pushTab: (item: TableItem) => {
        const { tabItems } = get();
        if (!tabItems.find((tab) => tab.key === item.key)) {
          set({
            tabItems: get().tabItems.concat(item),
          });
        }
      },
      closeTab(key: string) {
        const { activeKey, tabItems } = get();
        const newTabItems = tabItems.filter((item) => item.key !== key);
        set({
          tabItems: newTabItems,
        });
        if (key === activeKey) {
          const newPath = newTabItems[0]?.path;
          history.push(newPath);
        }
      },
      clearTabs: () => {
        set({
          tabItems: [],
        });
      },
      setActiveKey: (key: string) => {
        set({
          activeKey: key,
        });
      },
      isKeyInTabItems: (key: string) => {
        return !!get().tabItems.find((tab) => tab.key === key);
      },
    }),
  ),
);

export default useTabs;
