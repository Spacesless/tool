declare module 'element-plus/dist/locale/zh-cn.mjs'

declare module 'rgbaster' {
  interface Opts {
    ignore?: string[];
    scale?: number;
    skipTransparentPixels?: boolean;
  }
  function analyze(src: string, opts?: Opts): Promise<{
    color: string;
    count: number;
  }[]>;
  export = analyze
}

declare module 'svgo/dist/svgo.browser.js' {
  import svgo from 'svgo'
  export const optimize: typeof svgo.optimize
}
