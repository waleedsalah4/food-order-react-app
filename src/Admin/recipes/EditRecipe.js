import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { editRecipe } from '../../store/actions/adminActions';
import { Typography, Container, makeStyles} from "@material-ui/core";
import Modal from '../../components/UI/Modal';

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


const EditRecipe = (props) => {
    const { item, recipeInCurrPage } = props;
    const token = JSON.parse(localStorage.getItem('user-token' || '{}'))
    const dispatch = useDispatch();
    const classes = useStyles();  
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        
        let formdata = new FormData();
        formdata.append("name", data.recipeName);
        formdata.append("price", data.price);
        formdata.append("cookingTime", data.cockingTime);
        formdata.append("category", data.category);
        let ingredient = data.items.map(item => item.name);
        for(var i = 0; i < ingredient.length; i++){
            formdata.append("ingredients", ingredient[i])
        }
        if(data.pic.length !== 0 ){
            formdata.append("imageCover", data.pic[0]);

            dispatch(editRecipe(token, item._id, formdata, recipeInCurrPage+1));

            props.onCloseModal();
        } else {
            dispatch(editRecipe(token, item._id, formdata, recipeInCurrPage+1));

            props.onCloseModal();
        }
    //   console.log(data, item._id)
    }

    return(
        <Modal onClose={props.onCloseModal}>
           <Container className={classes.container}>
                <Typography component="h1" variant="h5">
                    Edit Recipe
                </Typography>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.form}>
                        <div>
                            <div>
                                <label>Name</label>
                                <input {...register("recipeName", { required: true })}  defaultValue={item.name}/>
                                {errors.recipeName && <p>This is required</p>}
                            </div>

                            <div>
                                <label>Price</label>
                                <input {...register("price", { required: true })} defaultValue={item.price} />
                                {errors.price && <p>This is required</p>}
                            </div>

                            <div>
                                <label>Category</label>
                                <input {...register("category", { required: true })} defaultValue={item.category}/>
                                {errors.category && <p>This is required</p>}
                            </div>

                            <div>
                                <label>Cocking Time</label>
                                <input {...register("cockingTime", { required: true })} defaultValue={item.cookingTime} />
                                {errors.cockingTime && <p>This is required</p>}
                            </div>
                                
                            <div>
                                <label>Update Recipe Image</label>
                                <input {...register("pic")} type='file'>
                                </input>
                                {/* {errors.pic && <p>This is required</p>} */}
                            </div>
                        </div>
                        <div>
                            <h4>Ingredients</h4>
                            <div>
                            {item.ingredients.map((ingredient, index) => {
                                return (
                                    <div key={ingredient}>
                                        <input 
                                            {...register(`items.${index}.name`)} defaultValue={ingredient}
                                        />
                                    </div>
                                    );
                                })}

                            </div> 
                        </div>
                    </div>
                    <input type='submit' className={classes.btn} />
                </form>
            </Container>
            {/* {error && <Alerts severity='error'>{error}</Alerts>} */}
        </Modal>
    )
}

export default EditRecipe;