import { SelectMenuGroupType } from "./types";

export const dummyMenuItems: SelectMenuGroupType[] = [
  {
    groupLabel: "Recent",
    showSeparator: true,
    items: [
      {
        label: "Option 1",
        value: "option1",
        subLabel: "Recently used",
      },
      {
        label: "Option 2",
        value: "option2",
        subLabel: "Recently used",
      },
    ],
  },
  {
    groupLabel: "All Options",
    items: [
      {
        label: "Option 3",
        value: "option3",
      },
      {
        label: "Option 4",
        value: "option4",
      },
      {
        label: "Option 5",
        value: "option5",
        subMenu: [
          {
            label: "Sub Option 5.1",
            value: "suboption5-1",
          },
          {
            label: "Sub Option 5.2",
            value: "suboption5-2",
          },
        ],
      },
    ],
  },
];
