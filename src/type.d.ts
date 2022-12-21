declare interface StackParamList extends Record<string, Record<string, string | boolean | number | undefined> | undefined> {}

declare module '@env' {
  export const devApiUrl: string;
  export const staginApiUrl: string;
  export const prodApiUrl: string;
  export const devVideoUri: string;
  export const devImageUri: string;
  export const devGifUri: string;
  export const socketUrl: string;
}
