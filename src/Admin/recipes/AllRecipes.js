import React, { useEffect, useState } from 'react';
import { getRecipes } from '../../store/actions';
import { deleteRecipe } from '../../store/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import DashboardTable from '../DashboardTable';
import { TableRow, TableCell, Container, Button, makeStyles, Avatar, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import AddRecipe from './AddRecipe';
import Alerts from '../../components/UI/Alert';import EditRecipe from './EditRecipe';
;

const useStyles = makeStyles(()=>({
    btn: {
        textAlign: 'center',
        marginTop: '3rem'
    }
}))

const AllRecipes = (porps) => {
    const token = JSON.parse(localStorage.getItem('user-token' || '{}'))
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [getItem, setGetItem] = useState(null)

    const classes = useStyles();
    const dispatch = useDispatch();
    const recipesList = useSelector(state => state.recipe)
    const { recipes, totalRecipes} = recipesList;

    const deleted = useSelector(state => state.deletedItem);
    const {errorDelete} = deleted;

    const sentRecipe = useSelector(state => state.createItems);
    const {error} = sentRecipe; //for add
    
    
    
    //----------------------------------------------------
    //add
    const showModal = () => {
        setModalOpen(true)
    }
    const hideModal = () => {
        setModalOpen(false)
    }

    //edit
    const showEditModal = (item) => { 
        setGetItem(item)
        setEditModalOpen(true) 
    }
    const hideEditModal = () => { setEditModalOpen(false) }
    //----------------------------------------------------

    const handelDeleteRecipe = (id) => {
        dispatch(deleteRecipe(token, id))
    }
  
    useEffect(() => {
        dispatch(getRecipes((page + 1)))
    }, [dispatch, page])


    const columns = [
        { id: 'recipe', label: 'Recipe', minWidth: 170 },
        { id: 'recipeName', label: 'Recipe Name', minWidth: 170 },
        { id: 'recipeCategory', label: 'Recipe Category', minWidth: 170 },
        { id: 'recipeCook', label: 'Recipe Cooking Time', minWidth: 170 },
        { id: 'recipePrice', label: 'Recipe Price', minWidth: 170 },
        { id: 'Actions', label: 'Actions', minWidth: 170 },
    ]
    return (
        <div>
            <DashboardTable 
                rows={recipes} 
                columns={columns} 
                page={page} 
                setPage={setPage} 
                count={totalRecipes}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            >
            {recipes.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>
                    <Avatar alt="Remy Sharp" src={row.imageCover} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.cookingTime} min</TableCell>
                  <TableCell>{row.price}$</TableCell>
                  <TableCell>
                  <IconButton aria-label="delete" onClick={() => handelDeleteRecipe(row._id)}>
                      <Delete />
                    </IconButton>
                      <IconButton aria-label="edit" onClick={() => showEditModal(row)}>
                            <EditIcon />
                        </IconButton>
                  </TableCell>
               
                </TableRow>
              );
            })} 
            </DashboardTable>
            <Container className={classes.btn}>
                <Button variant='contained' color='primary' onClick={showModal}>
                    Add Recipe
                </Button>
            </Container>

            {modalOpen && <AddRecipe onCloseModal={hideModal} />}

            {editModalOpen && <EditRecipe 
                onCloseModal={hideEditModal} 
                item={getItem} 
                recipeInCurrPage={page} 
            />}

            {errorDelete && <Alerts severity='error'>{errorDelete}</Alerts>}
            {/* for delet */}

            {error && <Alerts severity='error'>{error}</Alerts>}
            {/* for add */}
        </div>
    )
}

export default AllRecipes;