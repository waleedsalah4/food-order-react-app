import React, { useRef } from "react";
// import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editCategory } from "../../store/actions/adminActions";
import { Typography, Button, Container, makeStyles} from "@material-ui/core";
import Modal from '../../components/UI/Modal';
// import Alerts from '../../components/UI/Alert';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '25px 10px'
    },
    form: {
        padding: '0.5rem',
        '& input': {
            borderRadius: '4px',
            border: '1px solid #3f51b5',
            padding: '10px 15px',
            marginBottom: '7px',
            marginTop: '5px',
            fontSize: '20px',
        },
    },
    title: {
        textAlign: 'center',
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px 110px',
        marginTop: '2rem',
    },
  }))

const EditCategory = (props) => {
    const {item} = props;
    const token = JSON.parse(localStorage.getItem('user-token' || '{}'))
    const classes = useStyles();   
    const dispatch = useDispatch();
    const categoryName = useRef();
    // const { control, handleSubmit } = useForm();
   
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const categoryNameValue = categoryName.current.value;
        // console.log(categoryNameValue)


        dispatch(editCategory(token, item._id, categoryNameValue))
        props.onCloseModal();
          
    };

    return(
        <Modal onClose={props.onCloseModal}>
            <Container className={classes.container}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                        Edit Category 
                    </Typography>
                    <form noValidate onSubmit={handleSubmit} className={classes.form}>
                        {/* {item.length > 0 ? item.map(i =><div key={i._id}>
                            <input type='text' defaultValue={i.name} ref={categoryName} />
                        </div> 
                        ) : ''} */}
                        <div>
                            <input type='text' defaultValue={item.name} ref={categoryName} />
                        </div>
                        <div className={classes.btn}>
                            <Button
                                variant="contained"
                                type="submit"
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
            {/* {error && <Alerts severity='error'>{error}</Alerts>} */}
        </Modal>
    )
} 

export default EditCategory;