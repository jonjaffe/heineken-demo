import type { AppProps } from 'next/app'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import { ContextMenu } from '@builder.io/personalization-context-menu';

builder.init(builderConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <ContextMenu />
  </>
}
