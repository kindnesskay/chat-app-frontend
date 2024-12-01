import { Outlet, Navigate } from "react-router";
import { useUser } from "../../context/AppContext";

export default function AuthLayout() {
  const { user } = useUser();
  if (user !== null && user !== undefined) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <nav className="w-full h-16 flex justify-between items-center px-8">
        <button>Logo</button>
      </nav>
      <section className="w-full ">
        <Outlet />
      </section>
    </>
  );
}
