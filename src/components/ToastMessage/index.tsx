import React, { useState } from "react";
import {Snackbar, Alert}  from '@mui/material';


interface Props {
    severity: any;
    message: string;
    onClose: () => void;
}

const ToastMessage = (props: Props) => {
    const [showSucessToaster, setShowSucessToaster] = useState(true);

    const closeHandler = () => {
        setShowSucessToaster(false);
        props.onClose();
    }

    return (
        <Snackbar open={showSucessToaster} autoHideDuration={2000} onClose={closeHandler} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={closeHandler} severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default ToastMessage;