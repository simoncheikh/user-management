import { ActionBtn } from '../atoms/actionBtn';
import { IconBtn } from '../atoms/iconBtn';
import moonIcon from '../../assets/moon.png';

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
    CreateOnClick: () => void;
    setIsDarkMode: (value: boolean) => void;
    isDarkMode: boolean;
}

export const SideBar = ({
    isOpen,
    onClose,
    CreateOnClick,
    setIsDarkMode,
    isDarkMode
}: SideBarProps) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-white/80 bg-opacity-50 z-40 sm:hidden"
                    onClick={onClose}
                />
            )}

            <div className={`
                fixed top-0 left-0 h-full w-64 bg-primary text-white p-4 
                transform transition-transform duration-300 ease-in-out z-50
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                sm:translate-x-0 sm:relative
            `}>
                <div className='flex justify-between'>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold">Menu</h1>
                    </div>
                    <div>
                        <IconBtn
                            img={moonIcon}
                            onClick={() => setIsDarkMode(!isDarkMode)}
                        />
                    </div>
                </div>

                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <ActionBtn
                                label='Create User'
                                variant='primary'
                                onClick={() => {
                                    CreateOnClick();
                                    onClose();
                                }}
                                width='full'
                            />
                        </li>
                        <li>
                            <ActionBtn
                                label="Logout"
                                variant='danger'
                                width='full'
                            />
                        </li>

                    </ul>
                </nav>
            </div>
        </>
    );
};