import { useEffect, useState } from 'react';
import { ActionBtn } from '../../atoms/ActionBtn/ActionBtn';
import { IconBtn } from '../../atoms/IconBtn/iconBtn';
import moonIcon from '../../../assets/moon.png';
import { SideBar } from '../SideBar/SideBar';
import menuIcon from '../../../assets/menu.png';
import { useSessionStore } from '../../../stores/sessionStore/sessionStore';
import { useThemeStore } from '../../../stores/themeStore/themeStore';
import { ActionBtnVariant } from '../../atoms/ActionBtn/ActionBtn.type';
import { NavBarProps } from './NavBar.type';
import { useNavigate, useLocation } from 'react-router';
import { showToast } from '../../atoms/Toast/toast';

export const NavBar = ({ notification, setNotification, CreateOnClick }: NavBarProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const clearSession = useSessionStore((s) => s.clearSession);
    const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const navigate = useNavigate();
    const location = useLocation();

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        showToast(`Dark mode ${useThemeStore.getState().isDarkMode ? 'disabled' : 'enabled'}`);
    };

    const handleLogout = () => {
        clearSession();
        showToast('Logged out successfully');
        navigate('/login');
    };

    const isDashboardNew = location.pathname === '/dashboard/new' || location.pathname.startsWith('/dashboard/edit/');

    useEffect(() => {
        if (notification) {
            showToast(notification.message, notification.type);
            setNotification(null);
        }
    }, [notification, setNotification]);

    return (
        <>
            <div className='bg-primary top-0 text-white px-4 py-5 transition-colors flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='sm:hidden'>
                        <IconBtn
                            img={menuIcon}
                            onClick={toggleSidebar}
                        />
                    </div>
                    <div className='text-[30px]'>
                        {isDashboardNew
                            ? location.pathname === '/dashboard/new'
                                ? "Create User"
                                : "Update User"
                            : "User Management"}
                    </div>
                </div>

                <div className='hidden sm:flex gap-5'>
                    {isDashboardNew ? null : (
                        <ActionBtn
                            label='Create User'
                            variant={ActionBtnVariant.PRIMARY}
                            onClick={() => navigate("/dashboard/new")}
                        />
                    )}
                    <ActionBtn label="Logout" variant={ActionBtnVariant.DANGER} onClick={handleLogout} />
                    <IconBtn img={moonIcon} onClick={handleToggleDarkMode} />
                </div>
            </div>

            <div className='sm:hidden'>
                <SideBar
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                    CreateOnClick={CreateOnClick}
                />
            </div>
        </>
    );
};