import { useState } from "react";
import { SearchField } from "../../components/atoms/SearchField/searchField";
import { UserCard } from "../../components/organisms/UserCard/userCard";
import { getUsersApi } from "../../api/users/getUsersApi";
import { useSessionStore } from "../../stores/sessionStore/sessionStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteUser } from "../../api/users/deleteUsersApi";
import { QueryKeys } from "../../constants/query-keys";
import { userData } from "./userManagement.type";
import { LoadingPage } from '../../components/molecules/Loading/LoadingPage'

export const UserManagement = () => {
    const [searchUser, setSearchUser] = useState("");
    const navigate = useNavigate()


    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: getUsersApi,
        enabled: useSessionStore.getState().isAuthenticated(),
    });
    const queryClient = useQueryClient()

    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onMutate: async ({ id }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.USERS] });

            queryClient.setQueryData([QueryKeys.USERS], (old: userData[] = []) => {
                return old.filter((it) => it.id !== id);
            });
        },
        onSuccess: async () => {
            console.log("User deleted successfully");
            await queryClient.invalidateQueries({ queryKey: ["users"] });
            await queryClient.refetchQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.error("Error deleting user", error);
        }
    });

    const onSubmit = (userID: string) => {
        deleteUserMutation.mutate({ id: userID });
    };

    if (isLoading || deleteUserMutation.isPending) {
        return <LoadingPage label={deleteUserMutation.isPending ? "Deleting User..." : "Loading..."} />;
    }
    return (
        <div
            className={`bg-white dark:bg-dark min-h-screen flex flex-col`}
        >
            <div className="p-[1%] flex flex-col gap-[20px]">
                <div className="w-[300px]">
                    <SearchField onSearchChange={(e) => setSearchUser(e.target.value)} />
                </div>
                {isError && <div className="text-red-500">{(error as Error).message}</div>}
                {!isLoading && data.length === 0 && <div>No users found.</div>}

                <div className="flex flex-wrap gap-[21px]">
                    {data.map((value) => (
                        <div
                            key={value.id}
                            className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-16px)] min-w-[200px]"
                        >
                            <UserCard
                                {...value}
                                onDelete={() => onSubmit(value.id)}
                                dateofBirth={value.dateOfBirth}
                                onEdit={() => {
                                    navigate(`/dashboard/edit/${value.id}`, { state: { userId: value.id, value } })
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
