import { useParams } from 'react-router-dom';
import { getUser } from "../../Api";
import { useQuery } from "@tanstack/react-query";
import {Link} from 'react-router-dom';
import {Box, Divider, Button, Typography, Avatar, Container} from '@mui/material';
import "./style.css";

const UserDetails = () => {

    const {id} = useParams();
    const { isLoading, isError, error, data, isFetching } = useQuery(["user"], async () => {
        const res = await getUser(id);
        return res?.data?.data;
    });

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}>Loading...</Box>;

    if(isError) {
        if (error instanceof Error) return <Typography>{error.message}</Typography>
        else return <Typography>Unexpected error</Typography>
    }
    
    return (
        <Container maxWidth="xs" className='user-details'>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 1}}>
                <Avatar alt={data.first_name} src={data.avatar} sx={{ width: 80, height: 80 }}/>
            </Box>
            <Divider />
            <Box className='info'>
                <Typography className="row">
                    <label>First Name:</label>
                    <label>{data.first_name}</label>
                </Typography>
                <Typography className="row">
                    <label>Last Name:</label>
                    <label>{data.last_name}</label>
                </Typography>
                <Typography className="row">
                    <label>Email:</label>
                    <label>{data.email}</label>
                </Typography>
            </Box>
            <Link to="/" className="back-link"><Button variant="contained">Back</Button></Link>
        </Container>
    )
}

export default UserDetails;