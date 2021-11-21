import React, { useEffect, useState } from 'react';
import { getGategory } from '../../store/actions';
import { deleteCategory } from '../../store/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import DashboardTable from '../DashboardTable';
import { TableRow, TableCell, Container, Button, makeStyles, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';

import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
// import Modal from '../../components/UI/Modal'
import Alerts from '../../components/UI/Alert';;

const useStyles = makeStyles(()=>({
    btn: {
        textAlign: 'center',
        marginTop: '3rem'
    },
    action: {
        marginRight: '3rem',
        background: 'none',
    }
}))





const AllCategories = (porps) => {

    const token = JSON.parse(localStorage.getItem('user-token' || '{}'))
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [getItem, setGetItem] = useState(null)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const classes = useStyles();
    const dispatch = useDispatch();

    const categories = useSelector(state => state.category)
    const {category} = categories;

    const showAddModal = () => { setAddModalOpen(true) }
    const hideAddModal = () => { setAddModalOpen(false) }

    const showEditModal = (item) => { 
        setGetItem(item)
        setEditModalOpen(true) 
    }
    const hideEditModal = () => { setEditModalOpen(false) }

    const handelDeleteCagtegory = (id) => {
        dispatch(deleteCategory(token, id))
    }

    useEffect(()=> {
        dispatch(getGategory())
    }, [dispatch])

  
    //for showing error if post category failed
    const sentCategory = useSelector(state => state.createItems) 
    const {error} = sentCategory;
   

    const columns = [
        { id: 'categoryName', label: 'Category', minWidth: 170 },
        { id: 'Actions', label: 'Actions', minWidth: 170 },
    ]

    return (
        <div>
            <DashboardTable 
                rows={category} 
                columns={columns}
                page={page} 
                setPage={setPage} 
                count={category.length}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            >
            {category.map((row) => {
                // const date = row.createdAt.split('T')[0];
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                        <IconButton aria-label="delete" onClick={() => handelDeleteCagtegory(row._id)} className={classes.action}>
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
                <Button variant='contained' color='primary' onClick={showAddModal}>
                    Add Category
                </Button>
            </Container>

            {addModalOpen && <AddCategory onCloseModal={hideAddModal} />}
            {editModalOpen && <EditCategory onCloseModal={hideEditModal} item={getItem} />}

            
            {error && <Alerts severity='error'>{error}</Alerts>}
        </div>
    )
}

export default AllCategories;