import { ActionBtn } from '../../atoms/ActionBtn/ActionBtn';
import { IconBtn } from '../../atoms/IconBtn/iconBtn';
import moonIcon from '../../../assets/moon.png';
import { SideBarProps } from './SideBar.type';
import { ActionBtnVariant } from '../../atoms/ActionBtn/ActionBtn.type';
import { useThemeStore } from '../../../stores/themeStore/themeStore';
import { useSessionStore } from '../../../stores/sessionStore/sessionStore';

export const SideBar = ({
    isOpen,
    onClose,
    CreateOnClick,
}: SideBarProps) => {
    const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);
    const setLoggedIn = useSessionStore((s) => s.setIsLoggedIn)

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
                        <IconBtn img={moonIcon} onClick={toggleDarkMode} />
                    </div>
                </div>

                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <ActionBtn
                                label='Create User'
                                variant={ActionBtnVariant.PRIMARY}
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
                                variant={ActionBtnVariant.DANGER}
                                width='full'
                                onClick={() => setLoggedIn(false)}
                            />
                        </li>

                    </ul>
                </nav>
            </div>
        </>
    );
};