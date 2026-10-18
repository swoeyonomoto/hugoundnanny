import { Fragment } from 'react';

export function GuideRichText({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part,index) => part.startsWith('**') ? <b key={index}>{part.slice(2,-2)}</b> : part.startsWith('*') ? <em key={index}>{part.slice(1,-1)}</em> : <Fragment key={index}>{part}</Fragment>)}</>;
}