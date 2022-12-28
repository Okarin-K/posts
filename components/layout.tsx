import Head from 'next/head';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Head>
                <title>Okarin</title>
                <link rel="icon" href="/daidai.jpeg" />
            </Head>
            {children}
        </>
    );
}
