import React, { useState } from "react";
import {UserFrom} from '../UserForm';
import User from '../../Interface/User';

interface Props {
    setActiveModal: Function;
    createUser: Function;
}

const CreateUser = (props: Props) => {
    const [open, setOpen] = useState(true);
    const initialData:User = { id: null, first_name: "", last_name: "", email: "" };

    const handleClose = () => {
        setOpen(false);
        props.setActiveModal({ active: false });
    };

    const handleSubmit = (userFormData:any) => {
        props.createUser(userFormData);
    }

    return (
        <UserFrom
            user={initialData}
            open={open}
            formTitle="Add new user"
            submitBtnText="Create"
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        />
    )
}

export default CreateUser;