import type { Metadata } from "next";
import { Source_Code_Pro } from 'next/font/google'
import "./globals.css";
import Header from '../components/ui/header'
import Footer from '../components/ui/footer'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sourceCodePro',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})

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
    <html className={`${sourceCodePro.className}`}>
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
