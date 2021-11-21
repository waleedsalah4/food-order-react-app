import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postRecipe } from "../../store/actions/adminActions";

import { Typography,IconButton, Container, makeStyles} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px 10px',

        '& label': {
            display: 'block',
            fontSize: '14px',
        },
        '& input': {
            borderRadius: '4px',
            border: '1px solid #3f51b5',
            padding: '10px 15px',
            marginBottom: '7px',
            marginTop: '5px',
            fontSize: '14px',
        },
        '& p': {
            display: 'block',
            color: 'red',
            fontSize: '12px',
            margin: '0'
        }
    },
    btn: {
        textAlign: 'center',
        width: '9rem',
        height: '2.5rem',
        marginTop: '2rem',
        padding: '0.5rem',
        borderRadius: '1rem',
        border: 'none',
        backgroundColor: '#3f51b5',
        color: 'white',
        fontsize: '17px'
    },
  }))

const AddRecipe = (props) => {
    const token = JSON.parse(localStorage.getItem('user-token' || '{}'))
    const classes = useStyles();    
    const dispatch = useDispatch();
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            items: [{ ingredient: "" }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });



    const onSubmit = (data) => {
        let formdata = new FormData();
        formdata.append("name", data.recipeName);
        formdata.append("price", data.price);
        formdata.append("cookingTime", data.cockingTime);
        formdata.append("imageCover", data.pic[0]);
        formdata.append("category", data.category);
        let ingredient = data.items.map(item => item.name);
        for(var i = 0; i < ingredient.length; i++){
            formdata.append("ingredients", ingredient[i])
        }
      
        dispatch(postRecipe(token, formdata))
        props.onCloseModal();
    }

    return(
        <Modal onClose={props.onCloseModal}>
            <Container className={classes.container}>
                <Typography component="h1" variant="h5">
                    Add New Recipe
                </Typography>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.form}>
                        <div>
                            <div>
                                <label>Name</label>
                                <input {...register("recipeName", { required: true })} />
                                {errors.recipeName && <p>This is required</p>}
                            </div>

                            <div>
                                <label>Price</label>
                                <input {...register("price", { required: true })} />
                                {errors.price && <p>This is required</p>}
                            </div>

                            <div>
                                <label>Category</label>
                                <input {...register("category", { required: true })} />
                                {errors.category && <p>This is required</p>}
                            </div>

                            <div>
                                <label>Cocking Time</label>
                                <input {...register("cockingTime", { required: true })} />
                                {errors.cockingTime && <p>This is required</p>}
                            </div>
                                
                            <div>
                                <label>Uploade Recipe Image</label>
                                <input {...register("pic", { required: true })} type='file'>
                                {/* <img src='./upload-image.jpg' alt='upload image' /> */}
                                </input>
                                {errors.pic && <p>This is required</p>}
                            </div>
                        </div>
                        <div>
                            <h4>Ingredients</h4>
                            <div>
                            {fields.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <input 
                                            {...register(`items.${index}.name`)}
                                        />
                                        <IconButton aria-label="delete" onClick={() => remove(index)}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                    );
                                })}
                            </div> 
                            <IconButton aria-label="Add" onClick={() => append({})}>
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                    <input type='submit' className={classes.btn} />
                </form>
            </Container>
            {/* {error && <Alerts severity='error'>{error}</Alerts>} */}
        </Modal>
    )
} 

export default AddRecipe;