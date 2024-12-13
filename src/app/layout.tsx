import type { Metadata } from "next";
import { Source_Code_Pro, DM_Sans } from 'next/font/google'
import "./globals.css";
import Header from '../components/ui/header'
import Footer from '../components/ui/footer'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sourceCodePro',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dmSans',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "AUTOSTOP Главная страница",
  icons: "logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${sourceCodePro.variable} ${dmSans.variable}`}>
      <body>
          <header>
            <Header/>
          </header>
          <article>
            {children}
          </article>
          <footer>
            <Footer/>
          </footer>
          
      </body>
    </html>
  );
}
