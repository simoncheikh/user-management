import { ActionBtn } from '../../atoms/ActionBtn/ActionBtn';
import { IconBtn } from '../../atoms/IconBtn/iconBtn';
import moonIcon from '../../../assets/moon.png';
import { useState } from 'react';
import { SideBar } from '../SideBar/sideBar';
import menuIcon from '../../../assets/menu.png';
import { useSessionStore } from '../../../stores/sessionStore/sessionStore';
import { useThemeStore } from '../../../stores/themeStore/themeStore';
import { ActionBtnVariant } from '../../atoms/ActionBtn/ActionBtn.type';
import { NavBarProps } from './NavBar.type';


export const NavBar = ({ CreateOnClick }: NavBarProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const setLoggedIn = useSessionStore((s) => s.setIsLoggedIn)
    const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
                    <ActionBtn label='Create User' variant={ActionBtnVariant.PRIMARY} onClick={CreateOnClick} />
                    <ActionBtn label="Logout" variant={ActionBtnVariant.DANGER} onClick={() => setLoggedIn(false)} />
                    <IconBtn img={moonIcon} onClick={toggleDarkMode} />
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