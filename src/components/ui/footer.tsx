import Link from "next/link";
import Image from "next/image";
import mylogo from "@/../public/logo_t.png";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

const footerNavigation = [
  { name: "Catalog", href: DASHBOARD_PAGES.CARLIST, current: false },
  { name: "Market", href: DASHBOARD_PAGES.MARKETPLACE, current: false },
  { name: "About", href: DASHBOARD_PAGES.ABOUT, current: false },
];

export default function Footer() {
  return (
    <div className="footer">
      <div className="navigation">
        <div className="frame">
          <Image 
            alt="AUTOSTOP"
            src={mylogo}
            width={32}
            draggable={false}
          />
          <div className="text-wrapper">AutoStop</div>
        </div>

        <div className="menu-item">
          <div className="menu">
            {footerNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={`div ${item.current ? 'active' : 'inactive'}`}
                >
                  {item.name}
                </Link>
              ))}
          </div>
          

        </div>
      </div>

      <div className="frame-2">
        <p className="p">© AutoStop 2024. All rights reserved</p>
      </div>
    </div>
  );
};