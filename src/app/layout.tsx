import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/ui/header'
import Footer from '../components/ui/footer'


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
    <html >
      <body>
        <div className="wrapper">
          <div className="content gradient-bg">
            <Header/>
            {children}
          </div>
          <div>
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  );
}
