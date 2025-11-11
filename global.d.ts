export {};

declare global {
  interface Window {
    Landbot?: LandbotGlobal;
  }

  interface LandbotGlobal {
    Popup?: new (options: { configUrl: string }) => any;
    Livechat?: new (options: { configUrl: string }) => any;
    [key: string]: any; // para cubrir otros constructores que agreguen
  }
}
