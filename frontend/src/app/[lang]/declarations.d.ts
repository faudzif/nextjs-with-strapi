declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

interface Window {
  dataLayer: any,
  grecaptcha:any
}