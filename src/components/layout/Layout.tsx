import { Outlet } from 'react-router';
import { NavBar } from '../molecules/NavBar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <NavBar />
            <main className="container mx-auto px-4 py-8">
                <Outlet /> 
            </main>
        </div>
    );
};

export default Layout;