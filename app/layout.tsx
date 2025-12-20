import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Note Hub',
  description:
    'View and manage all your notes in one place. Keep track of tasks, ideas, meetings, and personal thoughts effortlessly.',
  openGraph: {
    title: 'Note Hub',
    description:
      'View and manage all your notes in one place. Keep track of tasks, ideas, meetings, and personal thoughts effortlessly.',
    url: 'https://08-zustand-k51s5autg-v1talii23s-projects.vercel.app/notes/filter/all',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
          <div id="modal"></div>
        </TanStackProvider>
      </body>
    </html>
  );
}
