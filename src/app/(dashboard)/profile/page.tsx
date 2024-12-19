import Sidebar from "@/components/ui/dashboard/profile/sideBar";
import ProfileCard from "@/components/ui/dashboard/profile/profileCard"
import ProfileForm from "@/components/ui/dashboard/profile/profileForm";
import Layout from "@/components/ui/layout";

export default function ProfilePage() {
    return (
      <Layout>
        <div className="profile-page-container">
          <Sidebar />
          <div className="profile-content">
            <ProfileCard
              name="Alexa Rawles"
              email="alexarawles@gmail.com"
              avatarUrl="/images/avatar.jpg"
            />
            <ProfileForm />
          </div>
        </div>
      </Layout>
    );
  }