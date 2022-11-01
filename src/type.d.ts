declare interface StackParamList extends Record<string, Record<string, string> | undefined> {}

declare module '@env' {
  export const devApiUrl: string;
  export const staginApiUrl: string;
  export const prodApiUrl: string;
  export const devUri: string;
}
