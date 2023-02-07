declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
