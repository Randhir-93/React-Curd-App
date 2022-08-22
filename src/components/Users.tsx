import {useInfiniteQuery} from '@tanstack/react-query';
import UserCard from './UserCard';
import React, { Fragment, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {Box,Button}  from '@mui/material';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import ToastMessage from './ToastMessage';
import {useMutation} from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import Container from '@mui/material/Container';
import {
    getUsers,
    getCreatedUser,
    getUpdatedUser,
    getDeletedUser
  } from "../Api";
import { Stack } from '@mui/system';
import User from '../Interface/User';

const fetchUsers = async ({pageParam = 1}) => {
    const res = await getUsers(pageParam);
    return res.data;
}

export const Users = () => {
    const queryClient = useQueryClient();
    const [activeModal, setActiveModal] = useState({ name: "", active: false });
    const [toastMessage, setToastMessage] = useState({ show: false, message: "",  severity: ''});
    const [currentUser, setCurrentUser] = useState({
        id: null,
        avatar: '',
        first_name: "",
        last_name: "",
        email: ""
    });

    const { ref, inView } = useInView();
    const {isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery(
        ['users'],
        fetchUsers,
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.page < lastPage.total_pages) {
                    return pages.length +1;
                } else {
                    return undefined;
                }
            }
        }
    )

    const createMutation = useMutation(getCreatedUser);
    const updateMutation = useMutation(getUpdatedUser);
    const deleteMutation = useMutation(getDeletedUser);


    useEffect(() => {
        if (inView) {
          fetchNextPage()
        }
    }, [inView])
    
    const handleDeleteUser = (user: User) => {
        setModal("delete-user");
        setCurrentUser({...currentUser, ...user});
    }

    const handleEditUser = (user: User) => {
        setModal("update-user");
        setCurrentUser({...currentUser, ...user});
    }

    // Setting up Modal
    const setModal = (modal: string) => {
        setActiveModal({ name: modal, active: true });
    };

    const OnApiEroor = (message: string) => {
        setToastMessage({
            show: true,
            message: message,
            severity: 'error'
        })
    }

    const createUser = async (newUser: User) => {
        setActiveModal({ name: '', active: false });
        const addUserIntoList = (pages: Array<any>, result: User) => {
            let lastPage = pages[pages.length - 1] || [];
            lastPage?.data.push(result);
            return pages;
        }

        createMutation.mutate(newUser, {
            onSuccess: (res) => {
                const result = res.data;
                queryClient.setQueryData(['users'], (data: any) => ({
                    pages: addUserIntoList(data.pages, result),
                    pageParams: data.pageParams
                }))
                setToastMessage({
                    show: true,
                    message: "User has been crated successfully",
                    severity: 'success'
                })
            },
            onError: (error: any) => {
                OnApiEroor(error?.message)
            }
        });
    }

    const updateUser = async (updatedUser: User) => {
        setActiveModal({ name: '', active: false });

        const updateUserInfo = (pages: Array<any>) => {
            pages.forEach(page => {
                let foundIndex = page.data.findIndex((user: User) => user.id === updatedUser.id);
                if(foundIndex > -1) {
                    page.data[foundIndex] = updatedUser;
                }
            });
            return pages;
        }

        updateMutation.mutate(updatedUser, {
            onSuccess: () => {
                queryClient.setQueryData(['users'], (data:any) => ({
                    pages: updateUserInfo(data.pages),
                    pageParams: data.pageParams
                }))
                setToastMessage({
                    show: true,
                    message: "User has been updated successfully",
                    severity: 'success'
                })
            },
            onError: (error: any) => {
                OnApiEroor(error?.message)
            }
        });
    };

    const deleteUser = async (id: number) => {
        setActiveModal({ name: '', active: false });

        const removeUser = (pages: Array<any>) => {
            pages.forEach((page) => page.data = page.data.filter((user: User) => user.id !== id))
            return pages;
        }

        deleteMutation.mutate(id, {
            onSuccess: () => {
                queryClient.setQueryData(['users'], (data:any) => ({
                    pages: removeUser(data.pages),
                    pageParams: data.pageParams
                }))
                setToastMessage({
                    show: true,
                    message: "User has been deleted successfully",
                    severity: 'success'
                })
            },
            onError: (error: any) => {
                OnApiEroor(error?.message)
            }
        });
    };

    const hideToasetMessage = () => {
        setToastMessage({...toastMessage, 'show': false});
    }

    if(isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}>Loading...</Box>
    }
    if(isError) {
        if (error instanceof Error) return <h2>{error.message}</h2>
        else return <h2>Unexpected error</h2>
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'sticky', top: '70px'}}>
                <Button variant="contained" onClick={() => setModal('create-user')}>Add User</Button>
            </Box>
            <Stack spacing={{ md: 1 }} alignItems="center">
                {data.pages.map((page, i) => (
                    <Fragment key={i}>
                    {page.data.map((user: User) => (
                        <UserCard user={user} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} key={user.id}/>
                    ))}
                    </Fragment>
                ))}
            </Stack>
            {hasNextPage 
                ?
                <Box sx={{ display: 'flex', justifyContent: 'center' }} ref={ref}>
                    {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'}
                </Box>
                :
                null
            }
            {activeModal.active && (
                <Fragment>
                    {activeModal.name === "create-user" && (
                        <CreateUser
                            createUser={createUser}
                            setActiveModal={setActiveModal}
                        />
                    )}
                    {activeModal.name === "update-user" && (
                        <UpdateUser
                            currentUser={currentUser}
                            updateUser={updateUser}
                            setActiveModal={setActiveModal}
                        />
                    )}
                    {activeModal.name === "delete-user" && (
                        <DeleteUser
                            currentUser={currentUser}
                            deleteUser={deleteUser}
                            setActiveModal={setActiveModal}
                        />
                    )}
                </Fragment>
            )}
            {toastMessage.show && (<ToastMessage message={toastMessage.message} severity={toastMessage.severity} onClose={hideToasetMessage}/>)}
        </Container>
    )
}