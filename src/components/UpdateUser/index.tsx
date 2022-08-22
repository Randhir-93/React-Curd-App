import React, { useState } from "react";
import {UserFrom} from '../UserForm';
import User from '../../Interface/User';

interface Props {
    currentUser: User;
    setActiveModal: Function;
    updateUser: Function;
}

const UpdateUser = (props: Props) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        props.setActiveModal({ active: false });
    };

    const handleSubmit = (userFormData: any) => {
        props.updateUser(userFormData);
    }

    return (
        <UserFrom
            user={props.currentUser}
            open={open}
            formTitle="Update user details"
            submitBtnText="Update"
            handleClose={handleClose}
            handleSubmit={handleSubmit}   
        />
    )
}

export default UpdateUser;