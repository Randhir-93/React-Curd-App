import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Avatar
} from '@mui/material';
import {Link} from 'react-router-dom';
import User from '../../Interface/User';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// Styles
import "./style.css";

interface Props {
  user: User;
  handleEditUser: Function;
  handleDeleteUser: Function;
}

export default function ActorCard({user, handleEditUser, handleDeleteUser}:Props ) {
  return (
    <Card className='card' variant="outlined">
      <CardContent>
        <Link to={`users/${user.id}`} className="detail-link">
          <Avatar alt="Remy Sharp" src={user.avatar} />
          <Box ml={2}>
            <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
            <Typography fontSize={14}>{user.email}</Typography>
          </Box>
        </Link>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleEditUser(user)}><EditIcon fontSize="small"/></IconButton>
        <IconButton onClick={() => handleDeleteUser(user)}><DeleteIcon fontSize="small"/></IconButton>
      </CardActions>
    </Card>
  );
}
