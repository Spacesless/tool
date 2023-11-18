export interface ToolItem {
  id: string;
  name: string;
  path: string;
  description?: string;
  version?: string;
  updateTime?: string;
}

export interface CategoryItem {
  name: string;
  path: string;
  icon: string;
  description?: string;
  children: Array<ToolItem>
}

export type ToolCategory = Array<CategoryItem>
