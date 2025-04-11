import '../../styles/components/layout/topBar.module.css';
import { ActionBtn } from '../atoms/actionBtn';
import { IconBtn } from '../atoms/iconBtn';
import moonIcon from '../../assets/moon.png';
import { useState } from 'react';
import { SideBar } from './sideBar';
import menuIcon from '../../assets/menu.png';

interface Props {
    CreateOnClick: () => void;
    setIsDarkMode: (value: boolean) => void;
    isDarkMode: boolean;
}

export const NavBar = ({ CreateOnClick, setIsDarkMode, isDarkMode = true }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                    <ActionBtn label='Create User' variant='primary' onClick={CreateOnClick} />
                    <ActionBtn label="Logout" variant='danger' />
                    <IconBtn img={moonIcon} onClick={() => setIsDarkMode(!isDarkMode)} />
                </div>
            </div>
            <div className='sm:hidden'>
                <SideBar
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                    CreateOnClick={CreateOnClick}
                    setIsDarkMode={setIsDarkMode}
                    isDarkMode={isDarkMode}
                />
            </div>
        </>
    );
};