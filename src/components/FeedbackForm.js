import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Fab,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { submitForm } from '../utils'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from '../hooks/useTranslation'

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
  zIndex: 1400,
}

export const FeedbackForm = () => {
  const t = useTranslation()
  const [isOpen, setIsOpen] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [isSubmitted, setIsSubmitted] = useState()
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const handleSubmit = async (event) => {
    setIsSubmitting(true)
    await submitForm(event, { message })
    setIsSubmitted(true)
    setMessage('')
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsSubmitting(false)
    setIsSubmitted(false)
    setMessage('')
  }

  return (
    <>
      {!isOpen && (
        <Fab color="primary" aria-label="edit" sx={fabStyle} onClick={() => setIsOpen(true)}>
          <EditIcon />
        </Fab>
      )}
      {isOpen && (
        <Dialog fullScreen open>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" noWrap>
                {t('report_error_title')}
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ padding: '10px 20px' }}>
            {isSubmitted && (
              <Typography variant="h6">{t('report_error_success_message')}</Typography>
            )}
            {!isSubmitted && (
              <>
                <Typography variant="h6">{t('report_error_description')}</Typography>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { width: '100%', maxWidth: '700px', margin: '20px 0' },
                  }}
                  noValidate
                  autoComplete="off"
                  action="https://script.google.com/macros/s/AKfycbwQpXb7dGqtWWQa3hF2mzUfIp75ZY-tBpe02ztLwKWI29Y6ttHCuvUwXMTByR1UIGAgrQ/exec"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    name="message"
                    label={t('report_error_message')}
                    multiline
                    maxRows={15}
                    value={message}
                    onChange={handleChange}
                  />
                  <Box>
                    <Button variant="contained" type="submit" disabled={isSubmitting}>
                      {t('report_error_send')}
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Dialog>
      )}
    </>
  )
}
