import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Alert
} from '@mui/material';
import User from '../../Interface/User';
import React, { useState } from "react";

interface UserFormProps {
    user: User;
    open: boolean;
    formTitle: string
    submitBtnText: string;
    handleClose: () => void;
    handleSubmit: (state: User) => void;
}

export const UserFrom = (props: UserFormProps) => {
    const [state, setState] = useState(props.user);
    const [validationError, setValidationError] = useState(false);

    const onInputChange = (e:any) => {
        const { name, value } = e.target;
        setValidationError(false);
        setState({ ...state, [name]: value });
    };

    const onSubmit = () => {
        const {first_name, last_name, email} = state;
        if(!first_name || !last_name || !email) {
            setValidationError(true);
            return;
        }
        props.handleSubmit(state);
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>{props.formTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    User form
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="first_name"
                    name="first_name"
                    label="First name"
                    type="text"
                    fullWidth
                    required
                    variant="standard"
                    value={state.first_name}
                    onChange={onInputChange}
                />
                <TextField
                    margin="dense"
                    id="last_name"
                    name="last_name"
                    label="Last name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.last_name}
                    onChange={onInputChange}
                />
                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    variant="standard"
                    value={state.email}
                    onChange={onInputChange}
                />
                {validationError && (<Alert severity="error">Please fill all the required fields</Alert>)}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={props.handleClose}>Cancel</Button>
                <Button variant="contained" onClick={onSubmit}>{props.submitBtnText}</Button>
            </DialogActions>
        </Dialog>
    )
}