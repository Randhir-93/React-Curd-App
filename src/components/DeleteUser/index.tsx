import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';

const DeleteUser = (props: any) => {
    
    const handleClose = (e: any) => {
        props.setActiveModal({ active: false });
    };

    const handleSubmit = (e: any) => {
        props.deleteUser(props.currentUser.id);
    }

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Delete user</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {props.currentUser.first_name} {props.currentUser.last_name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteUser;