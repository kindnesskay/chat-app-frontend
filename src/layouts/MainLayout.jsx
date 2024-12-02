import Navbar from "../components/Navbar";
import LeftPannel from "../components/LeftPannel";
import RightPannel from "../components/RightPannel";
import ThirdPannel from "../components/ThirdPannel";
import { Navigate, Outlet } from "react-router";
import { useUser } from "../../context/AppContext";
export default function MainLayout() {
  const { user } = useUser();

  if (user === null) {
    return <Navigate to="/login" />;
  }
  if (user !== null && user !== undefined)
    return (
      <>
        <main className="flex bg-gray-100 h-screen gap-2 p-0">
          <Navbar />
          <section className="w-full flex h-full pt-20">
            <aside className="min-w-64 max-w-sm w-[15%]  overflow-y-auto max-xl:hidden">
              <LeftPannel />
            </aside>
            <aside className="flex-1 overflow-y-auto flex justify-center">
              <Outlet />
            </aside>
            <section className=" min-w-64 max-w-md w-[20%] h-full overflow-y-auto relative overflow-x-hidden max-2xl:hidden py-4">
              <ThirdPannel />
            </section>
            <aside className=" min-w-64 max-w-lg w-[205] h-full overflow-y-auto relative overflow-x-hidden max-lg:hidden py-4">
              <RightPannel />
            </aside>
          </section>
        </main>
      </>
    );
}
