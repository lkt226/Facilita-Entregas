'use client';

import css from './layout.module.scss'

import store from '@/app/store'
import { Provider } from 'react-redux'

import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <main id={css["main"]}>
        {children}
      </main>
      <Toaster />
    </Provider>
  );
}
