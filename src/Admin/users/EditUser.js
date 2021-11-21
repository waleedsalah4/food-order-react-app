import React, {useEffect, useRef} from "react";
import Modal from '../../components/UI/Modal';
import { editUser } from "../../store/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { getItemsById } from "../../store/actions/adminActions";

// import { useForm, Controller } from "react-hook-form";

import { Typography, Button, Container, makeStyles, CircularProgress} from "@material-ui/core";

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
        '& input, & select': {
            borderRadius: '4px',
            border: '1px solid #3f51b5',
            padding: '10px 15px',
            marginBottom: '7px',
            marginTop: '5px',
            fontSize: '20px',
        },
    },
    loader: {
        textAlign: 'center'
    },
    btnConatiner: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px 110px',
        marginTop: '2rem',
    },
  }))


const EditUser =(props) => {
    const {id, userInCurrPage} = props;
    console.log(id)
    const token = JSON.parse(localStorage.getItem("user-token") ||'{}')
    const classes = useStyles();
    const dispatch = useDispatch()
    // const { control, register, handleSubmit } = useForm();
    const userName = useRef();
    const userEmail = useRef();
    const userRole = useRef();
    
    useEffect(()=> {
        dispatch(getItemsById(token,id, 'user'))
    },[dispatch,token, id])
    
    const user = useSelector(state => state.itemById)
    const {item, loading} = user;
    // console.log(item)
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const userNameValue = userName.current.value;
        const userEmailValue = userEmail.current.value;
        const userRoleValue = userRole.current.value;
        let userData = {
            name: userNameValue,
            email: userEmailValue,
            role: userRoleValue
        }
        dispatch(editUser(token, id, userData ,userInCurrPage+1))
        props.onCloseModal()
    };

    return(
        <Modal onClose={props.onCloseModal}>
            <Container className={classes.container}>
                {loading && <CircularProgress color="primary" className={classes.loader} />}
                {!loading && <div>
                    <Typography component="h1" variant="h5" className={classes.loader}>
                        Edit User
                    </Typography>
                    <form noValidate onSubmit={handleSubmit} className={classes.form}>
                        <div>
                            {/* <Controller
                                name="name"
                                control={control}
                                defaultValue={item.name}
                                rules={{ required: true }}
                                render={({ field }) => <TextField {...field} variant='outlined' margin='normal' />}
                            /> */}
                            <input type='text' defaultValue={item.name} ref={userName} />
                        </div>
                        <div>
                            {/* <Controller
                                name="email"
                                control={control}
                                defaultValue={item.email}
                                rules={{ required: true }}
                                render={({ field }) => <TextField {...field} variant='outlined' margin='normal' />}
                            /> */}
                            <input type='email' defaultValue={item.email} ref={userEmail} />
                        </div>
                        <div>
                            {/* <select {...register("role", { required: true })} defaultValue={item.role}> */}
                            <select defaultValue={item.role} ref={userRole}>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </select>
                        </div>
                        <div className={classes.btnConatiner}>
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
                </div>}
            </Container>
        </Modal>
    )
}

export default EditUser;