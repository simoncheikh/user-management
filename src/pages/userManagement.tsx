import { useState } from "react";
import { SearchField } from "../components/atoms/searchField";
import { NavBar } from "../components/molecules/NavBar";
import { UserCard } from "../components/organisms/userCard";
import { Container } from "../components/molecules/container";

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
        { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", status: "locked", birthDate: "1988-10-22" },
        { id: 3, firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", status: "active", birthDate: "1995-02-10" },
        { id: 4, firstName: "Bob", lastName: "Martin", email: "bob.martin@example.com", status: "locked", birthDate: "1980-08-05" },
        { id: 5, firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", status: "active", birthDate: "1992-11-30" },
        { id: 6, firstName: "David", lastName: "Lee", email: "david.lee@example.com", status: "locked", birthDate: "1987-07-14" },
        { id: 7, firstName: "Eve", lastName: "Green", email: "eve.green@example.com", status: "active", birthDate: "1993-09-21" },
        { id: 8, firstName: "Frank", lastName: "White", email: "frank.white@example.com", status: "active", birthDate: "1994-01-25" },
        { id: 9, firstName: "Grace", lastName: "Black", email: "grace.black@example.com", status: "locked", birthDate: "1985-03-17" },
        { id: 10, firstName: "Hannah", lastName: "Purple", email: "hannah.purple@example.com", status: "active", birthDate: "1996-12-03" },
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
            <NavBar CreateOnClick={handleCreateUserClick} setIsDarkMode={(e: boolean) => setIsDarkMode(e)} isDarkMode={isDarkMode} />
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
