import { useState } from "react";
import { Home } from "lucide-react";

import { Profile } from "@/components/types/profile";
import Sidebar from "@/components/sidebar/Sidebar";
import Bookmark from "@/components/bookmark/Bookmark";

const App = () => {
  const [profile, setProfile] = useState<Profile>({ id: "home", name: "Home", icon: <Home /> });
  
  return (
    <div className="flex h-[600px] w-[400px]">
      <Sidebar setProfile={setProfile} />
      <Bookmark profile={profile} />
    </div>
  );
};

export default App;
