export interface ToolItem {
  'name': string,
  'path': string
  'description': string
}

export type ToolCategory = Array<{
  'name': string,
  'path': string
  'description': string
  'children': Array<ToolItem>
}>
