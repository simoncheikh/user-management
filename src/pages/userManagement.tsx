import { useState } from "react";
import { SearchField } from "../components/common/searchField";
import { TopBar } from "../components/layout/topBar";
import { UserCard } from "../components/ui/userCard";
import { Container } from "../components/layout/container";

export const UserManagement = () => {
    interface userData {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        status: string;
        birthDate: string;
    }

    const [userData, setUserData] = useState<userData[]>([
        { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", status: "active", birthDate: "1990-05-15" },
        { id: 2, firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", status: "inactive", birthDate: "1985-10-22" },
        { id: 3, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", status: "active", birthDate: "1993-07-01" },
    ]);

    const [isContainerOpen, setIsContainerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUser, setEditUser] = useState<userData | null>(null);
    const [searchUser, setSearchUser] = useState("")
    const [isDarkMode, setIsDarkMode] = useState(false)

    const handleAddUser = (newUserData: {
        firstName: string;
        lastName: string;
        status: string;
        email: string;
        birthDate: string;
    }) => {
        const newUser = {
            ...newUserData,
            id: userData.length + 1
        };
        setUserData(prev => [...prev, newUser]);
        setIsContainerOpen(false)
    };

    const onDeleteUser = (id: number) => {
        setUserData(prev => prev.filter(user => user.id !== id));
    }

    const handleEditUser = (updatedUserData: {
        firstName: string;
        lastName: string;
        status: string;
        email: string;
        birthDate: string;
    }) => {
        if (!editUser) return;

        const updatedUsers = userData.map(user =>
            user.id === editUser.id ? { ...user, ...updatedUserData } : user
        );

        setUserData(updatedUsers);
        setEditUser(null);
        setIsEditing(false);
        setIsContainerOpen(false);
    };

    const handleCreateUserClick = () => {
        setIsEditing(false);
        setEditUser(null);
        setIsContainerOpen(true);
    };

    const searchedUsers = userData.filter(user =>
        `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchUser?.toLowerCase())
    );

    return (
        <div className={`${isDarkMode == true ? "bg-gray-700" : "bg-white"} min-h-screen flex flex-col`}>
            <TopBar CreateOnClick={handleCreateUserClick} setIsDarkMode={(e: boolean) => setIsDarkMode(e)} isDarkMode={isDarkMode} />
            <div className="p-[1%] flex flex-col gap-[20px]">
                <div className="w-[300px]">
                    <SearchField onSearchChange={setSearchUser} />
                </div>

                <div className="flex flex-wrap gap-[21px]">
                    {searchedUsers.map((value) => (
                        <div
                            key={value.id}
                            className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-16px)] min-w-[200px]"
                        >
                            <UserCard
                                {...value}
                                onEdit={() => {
                                    setEditUser(value);
                                    setIsEditing(true);
                                    setIsContainerOpen(true);
                                }}
                                onDelete={() => onDeleteUser(value.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {isContainerOpen && (
                <>
                    <div className="fixed inset-0 bg-gray-800/80 z-40" />
                    <Container
                        cancelOnClick={() => {
                            setIsContainerOpen(false);
                            setIsEditing(false);
                            setEditUser(null);
                        }}
                        onSubmit={isEditing ? handleEditUser : handleAddUser}
                        label={isEditing ? "Edit User" : "Create New User"}
                        initialValues={editUser || undefined}
                    />
                </>
            )}
        </div>
    );
};
