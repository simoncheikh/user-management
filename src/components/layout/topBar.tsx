import '../../styles/components/layout/topBar.module.css';
import { ActionBtn } from '../common/actionBtn';
import { IconBtn } from '../common/iconBtn';
import moonIcon from '../../assets/moon.png';
import { useState } from 'react';

interface Props {
    CreateOnClick: () => void;
    setIsDarkMode: (value: boolean) => void
    isDarkMode: boolean
}

export const TopBar = ({ CreateOnClick, setIsDarkMode, isDarkMode = true }: Props) => {

    return (
        <>
            <div className='bg-primary top-0 text-white px-4 py-5 transition-colors flex items-center justify-between'>
                <div className='text-[30px]'>User Management</div>
                <div className='flex gap-5'>
                    <ActionBtn label='Create User' variant='primary' onClick={CreateOnClick} />
                    <ActionBtn label="Logout" variant='danger' />
                    <IconBtn img={moonIcon} onClick={() => setIsDarkMode(!isDarkMode)} />
                </div>
            </div>
        </>
    );
};
