import type { MaterialDefinition } from "../../types/material";

export const tableMaterial: MaterialDefinition = {
  name: "Table",
  displayName: "Table",
  description: "A responsive table for displaying structured data in rows and columns.",
  category: "data",
  icon: "Table",
  defaultProps: {
    showHeader: true,
    columns: ["Col 1", "Col 2", "Col 3"],
    rowCount: 2,
  },
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "showHeader",
      label: "Header",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 1,
    },
    {
      key: "columns",
      label: "Columns",
      type: "json",
      defaultValue: ["Col 1", "Col 2", "Col 3"],
      group: "Slots",
      order: 2,
    },
    {
      key: "rowCount",
      label: "Rows",
      type: "number",
      defaultValue: 2,
      group: "Slots",
      order: 3,
    },
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
      comment: "Apply to the Table root element.",
    },
    {
      key: "comment",
      label: "Comment",
      type: "textarea",
      group: "Documentation",
      order: 20,
    },
  ],
};

export const tableHeaderMaterial: MaterialDefinition = {
  name: "TableHeader",
  displayName: "Table Header",
  description: "The header section of a Table, containing column headings.",
  category: "data",
  icon: "ArrowUpToLine",
  supportsChildren: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};

export const tableBodyMaterial: MaterialDefinition = {
  name: "TableBody",
  displayName: "Table Body",
  description: "The body section of a Table, containing data rows.",
  category: "data",
  icon: "AlignJustify",
  supportsChildren: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};

export const tableRowMaterial: MaterialDefinition = {
  name: "TableRow",
  displayName: "Table Row",
  description: "A single row within a Table header or body.",
  category: "data",
  icon: "Rows3",
  supportsChildren: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};

export const tableHeadMaterial: MaterialDefinition = {
  name: "TableHead",
  displayName: "Table Head",
  description: "A column header cell within a TableHeader row.",
  category: "data",
  icon: "ArrowDownToLine",
  supportsChildren: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};

export const tableCellMaterial: MaterialDefinition = {
  name: "TableCell",
  displayName: "Table Cell",
  description: "A data cell within a TableBody row.",
  category: "data",
  icon: "Square",
  supportsChildren: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};
