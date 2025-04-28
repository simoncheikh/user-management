import { useEffect, useRef } from "react";
import { SearchField } from "../../components/atoms/SearchField/searchField";
import { UserCard } from "../../components/organisms/UserCard/userCard";
import { getUsersApi } from "../../api/users/getUsersApi";
import { useSessionStore } from "../../stores/sessionStore/sessionStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteUser } from "../../api/users/deleteUsersApi";
import { QueryKeys } from "../../constants/query-keys";
import { userData } from "./userManagement.type";
import { LoadingPage } from "../../components/molecules/Loading/LoadingPage";

export const UserManagement = () => {
    const navigate = useNavigate();
    const searchRef = useRef<string>(""); 
    const timeoutRef = useRef<number | null>(null);
    const queryClient = useQueryClient();

    const { data = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users", searchRef.current], 
        queryFn: () => getUsersApi(searchRef.current),
        enabled: useSessionStore.getState().isAuthenticated(), 
    });

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
        },
        onError: (error) => {
            console.error("Error deleting user", error);
        },
    });

    const onSubmit = (userID: string) => {
        deleteUserMutation.mutate({ id: userID });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            if (searchRef.current !== value) {
                searchRef.current = value;
                refetch(); 
            }
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (isLoading || deleteUserMutation.isPending) {
        return (
            <LoadingPage label={deleteUserMutation.isPending ? "Deleting User..." : "Loading..."} />
        );
    }

    return (
        <div className="bg-white dark:bg-dark min-h-screen flex flex-col">
            <div className="p-[1%] flex flex-col gap-[20px]">
                <div className="w-[300px]">
                    <SearchField onSearchChange={handleSearchChange} />
                </div>

                {isError && <div className="text-red-500">{(error as Error).message}</div>}

                {!isLoading && data.length === 0 && (
                    <div>{searchRef.current ? "No users match your search." : "No users found."}</div>
                )}

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
                                    navigate(`/dashboard/edit/${value.id}`, { state: { userId: value.id, value } });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
