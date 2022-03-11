import { Close } from '@mui/icons-material'
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'

export const PointInfo = ({
  onClose,
  country,
  nameCode,
  coordinates,
  info,
}) => {
  return (
    <Dialog fullScreen open>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {nameCode}
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemText primary={country} secondary={nameCode} />
        </ListItem>
        <Divider />
        {info.map(({ typeCode, textCode, link }) => (
          <ListItem key={typeCode}>
            <ListItemText
              primary={textCode}
              secondary={<a href={link}>{link}</a>}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
