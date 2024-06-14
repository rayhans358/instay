import { useContext, useState } from "react";
import { UserContext } from "../../services/context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import { logoutUser } from "../../services/api/auth";
import PlacesPage from "../Place/PlacesPage";
import AccountNavbar from "../../components/Navbar/AccountNavbar/AccountNavbar";

const ProfilePage = () => {
  let { subpage } = useParams();
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  async function handleLogout() {
    await logoutUser();
    setRedirect("/");
    setUser(null);
    alert("Log Out Successfully");
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNavbar />

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h3 className="text-xl mb-2 text-bold">Your Profile</h3>
          <div className="overflow-x-auto max-w-xs mx-auto">
            <table className="table-auto w-full text-left">
              <tbody>
                <tr>
                  <td className="py-2 px-4 flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Full Name :
                  </td>
                  <td className="py-2 px-4">{user?.name}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    Email :
                  </td>
                  <td className="py-2 px-4">{user?.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="bg-primary py-2 mt-4 text-white rounded-full" style={{ width: "65%" }} onClick={handleLogout}>Log Out</button>
        </div>
      )}

      {subpage === "places" && (
        <PlacesPage />
      )}
    </div>
  );
};

export default ProfilePage;