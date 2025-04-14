import { useEffect, useState } from "react";
import { SearchField } from "../../components/atoms/SearchField/searchField";
import { UserCard } from "../../components/organisms/UserCard/userCard";
import { Container } from "../../components/molecules/Container/container";
import { getUsersApi } from "../../api/getUsersApi/getUsersApi";
import { userData } from "./userManagement.type";

export const UserManagement = () => {
    const [userData, setUserData] = useState<userData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isContainerOpen, setIsContainerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUser, setEditUser] = useState<userData | null>(null);
    const [searchUser, setSearchUser] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const users = await getUsersApi(searchUser);
            setUserData(users);
        } catch (err: any) {
            setError(err.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, [searchUser]);

    // const handleAddUser = (newUserData: {
    //     firstName: string;
    //     lastName: string;
    //     status: string;
    //     email: string;
    //     dateOfBirth: string;
    // }) => {
    //     const newUser = {
    //         ...newUserData,
    //         id: userData.length + 1,
    //     };
    //     setUserData((prev) => [...prev, newUser]);
    //     setIsContainerOpen(false);
    // };


    const onDeleteUser = (id: number) => {
        setUserData((prev) => prev.filter((user) => user.id !== id));
    };

    // const handleEditUser = (updatedUserData: {
    //     firstName: string;
    //     lastName: string;
    //     status: string;
    //     email: string;
    //     dateOfBirth: string;
    // }) => {
    //     if (!editUser) return;

    //     const updatedUsers = userData.map((user) =>
    //         user.id === editUser.id ? { ...user, ...updatedUserData } : user
    //     );

    //     setUserData(updatedUsers);
    //     setEditUser(null);
    //     setIsEditing(false);
    //     setIsContainerOpen(false);
    // };

    // const handleCreateUserClick = () => {
    //     setIsEditing(false);
    //     setEditUser(null);
    //     setIsContainerOpen(true);
    // };

    return (
        <div
            className={`${isDarkMode ? "bg-gray-700" : "bg-white"
                } min-h-screen flex flex-col`}
        >
            <div className="p-[1%] flex flex-col gap-[20px]">
                <div className="w-[300px]">
                    <SearchField onSearchChange={setSearchUser} />
                </div>

                {loading && <div>Loading users...</div>}
                {error && <div className="text-red-500">{error}</div>}

                {!loading && userData.length === 0 && (
                    <div className="text-gray-500">No users found.</div>
                )}

                <div className="flex flex-wrap gap-[21px]">
                    {userData.map((value) => (
                        <div
                            key={value.id}
                            className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-16px)] min-w-[200px]"
                        >
                            <UserCard
                                {...value}
                                dateofBirth={value.dateOfBirth}
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
                        label={isEditing ? "Edit User" : "Create New User"}
                        initialValues={editUser || undefined}
                    />
                </>
            )}
        </div>
    );
};
