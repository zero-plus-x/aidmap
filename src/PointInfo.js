import { Close } from '@mui/icons-material'
import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { useTranslation } from './useTranslation'

export const PointInfo = ({
  onClose,
  country,
  nameCode,
  coordinates,
  info,
}) => {
  const t = useTranslation()

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
            {t(nameCode)}
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemText primary={t(country)} secondary={t(nameCode)} />
        </ListItem>
        <Divider />
        {info.map(({ typeCode, textCode, link }) => (
          <ListItem key={typeCode}>
            <ListItemText
              primary={t(textCode)}
              secondary={<a href={link}>{link}</a>}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
