export interface ToolItem {
  'name': string;
  'path': string;
  'description'?: string
}

export interface CategoryItem {
  'name': string;
  'path': string;
  'icon': string;
  'description'?: string;
  'children': Array<ToolItem>
}

export type ToolCategory = Array<CategoryItem>
