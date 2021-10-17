import { createTheme, ThemeProvider, CssBaseline, makeStyles, Box, Container } from '@material-ui/core';
import Alerts from '../components/UI/Alert';


const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.3rem',
    marginTop: '75px',
  },
  btn: {
    fontWeight: 500,
    fontSize: '0.875rem',
    fontFamily:' "Roboto","Helvetica","Arial","sans-serif"',
    lineHeight: 1.5,
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    minWidth: '64px',
    padding: '6px 16px',
    borderRadius: '4px',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    width: '100%',
    marginTop: '24px',
    marginBottom: '16px'
  },
}))

const theme = createTheme();

const FormWrapper = (props) => {
    const classes = useStyles()
    const {error, severity, children} = props;
    return(
        <ThemeProvider theme={theme}>
            {error && <Alerts severity={severity}>{error}</Alerts>}
            <Container component="main" maxWidth="xs" className={classes.main}>
                <CssBaseline />
                <Box
                    sx={{
                    marginTop: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
        >
                {children}
                </Box>
            </Container>
    </ThemeProvider>
    )
}

export default FormWrapper;
