import { ActionBtn } from '../../atoms/ActionBtn/ActionBtn';
import { IconBtn } from '../../atoms/IconBtn/iconBtn';
import moonIcon from '../../../assets/moon.png';
import { useCallback, useState } from 'react';
import { SideBar } from '../SideBar/SideBar';
import menuIcon from '../../../assets/menu.png';
import { useSessionStore } from '../../../stores/sessionStore/sessionStore';
import { useThemeStore } from '../../../stores/themeStore/themeStore';
import { ActionBtnVariant } from '../../atoms/ActionBtn/ActionBtn.type';
import { NavBarProps } from './NavBar.type';
import { useNavigate } from 'react-router';


export const NavBar = ({ CreateOnClick }: NavBarProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const clearSession = useSessionStore((s) => s.clearSession)
    const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const navigate = useNavigate()

    const handleToggleDarkMode = useCallback(() => {
        toggleDarkMode();
    }, [toggleDarkMode]);

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
                    <div className='text-[30px]'>User Management</div>
                </div>

                <div className='hidden sm:flex gap-5'>
                    <ActionBtn label='Create User' variant={ActionBtnVariant.PRIMARY} onClick={() => navigate("/dashboard/new")} />
                    <ActionBtn label="Logout" variant={ActionBtnVariant.DANGER} onClick={() => clearSession()} />
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