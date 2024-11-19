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
    <html className="h-full bg-gray-100">
      <body className={`h-full`}>
        <div className="wrapper">
          <div className="content">
            <Header/>
            {children}
          </div>
          <div className="footer">
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  );
}
