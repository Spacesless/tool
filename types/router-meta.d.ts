/**
 * @description 扩展ruoter-meta的类型 此处必须要export {} 不然找不到类型
 */
declare module 'vue-router' {
	interface RouteMeta {
		order: number;
    icon: string;
    title: string;
    description?: string;
    same?: string[];
	}
}

export {}
