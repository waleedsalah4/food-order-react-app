import React, {useRef} from "react";
import { useDispatch } from "react-redux";
import { postCategory } from "../../store/actions/adminActions";
import { Typography,TextField, Button, Container, makeStyles} from "@material-ui/core";
import Modal from '../../components/UI/Modal';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '25px 10px'
    },
    btn: {
        marginRight: '2rem',
    },
  }))

const AddCategory = (props) => {
    const token = JSON.parse(localStorage.getItem('user-token' || '{}'))
    const classes = useStyles();    
    const categoryRef = useRef();
    const dispatch = useDispatch();
    // console.log(sentCategory)

    const handleSubmit = (e) => {
        e.preventDefault();
        const categoryName = categoryRef.current.value;
        if(categoryName !== '' && categoryName.length >=3 && categoryName.length <=25){
            // console.log(token, categoryName)
            dispatch(postCategory(token, categoryName))
            props.onCloseModal()
            //dispatch(getGategory())
        }
    }

    return(
        <Modal onClose={props.onCloseModal}>
            <Container className={classes.container}>
                <Typography component="h1" variant="h5">
                    Add New Category 
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField 
                        id="category" 
                        label="category Name" 
                        variant="outlined"
                        margin="normal"             
                        helperText="name must be between 3 and 25 chars"
                        inputRef={categoryRef} 
                    />
                    <div>
                        <Button
                            variant="contained"
                            type="submit"
                            className={classes.btn}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            submit
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={props.onCloseModal}
                        >
                            close
                        </Button>
                    </div>
                </form>
            </Container>
        </Modal>
    )
} 

export default AddCategory;