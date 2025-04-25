import { useState } from "react";
import { SearchField } from "../../components/atoms/SearchField/searchField";
import { UserCard } from "../../components/organisms/UserCard/userCard";
import { getUsersApi } from "../../api/users/getUsersApi";
import { useThemeStore } from "../../stores/themeStore/themeStore";
import { useSessionStore } from "../../stores/sessionStore/sessionStore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const UserManagement = () => {
    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: getUsersApi,
        enabled: useSessionStore.getState().isAuthenticated(),
    });

    const [searchUser, setSearchUser] = useState("");
    const navigate = useNavigate()
    const isDarkMode = useThemeStore((s) => s.isDarkMode);

    return (
        <div
            className={`${isDarkMode ? "bg-dark" : "bg-white"
                } dark:bg-dark min-h-screen flex flex-col`}
        >
            <div className="p-[1%] flex flex-col gap-[20px]">
                <div className="w-[300px]">
                    <SearchField onSearchChange={(e) => setSearchUser(e.target.value)} />
                </div>

                {isLoading && <div>Loading users...</div>}
                {isError && <div className="text-red-500">{(error as Error).message}</div>}
                {!isLoading && data.length === 0 && <div>No users found.</div>}

                <div className="flex flex-wrap gap-[21px]">
                    {data.map((value) => (
                        <div
                            key={value.id}
                            className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-16px)] min-w-[200px]"
                        >
                            <UserCard
                                onDelete={() => console.log("nothing")} {...value}
                                dateofBirth={value.dateOfBirth}
                                onEdit={() => {
                                    navigate(`/dashboard/edit/${value.id}`, { state: { userId: value.id } })
                                }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
