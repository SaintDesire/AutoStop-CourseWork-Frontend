import Layout from "@/components/ui/layout";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";

export default function Dashboard() {
    return (
        <Layout>
            <Link href={DASHBOARD_PAGES.MARKETPLACE_CAR_ADD} className="p-4 bg-black h-fit text-white rounded-2xl">
                Add Car
            </Link>

        </Layout>
    )
}