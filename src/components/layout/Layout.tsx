import { Outlet } from "react-router";
import { NavBar } from "../molecules/NavBar/NavBar";
const Layout = () => {

    return (
        <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200`}>
            <NavBar CreateOnClick={() => console.log("nothing")} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
