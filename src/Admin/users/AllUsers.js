import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from '../../store/actions/adminActions';

import DashboardTable from '../DashboardTable';

import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';

import EditUser from './EditUser';
// import Alerts from '../../components/UI/Alert';


const AllUsers = (porps) => {
    
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [getItemID, setGetItemID] = useState(null)
  
  const showEditModal = (id) => { 
    setGetItemID(id)
    setEditModalOpen(true) 
  }
  const hideEditModal = () => { setEditModalOpen(false) }

    const token = JSON.parse(localStorage.getItem("user-token") ||'{}')
    const dispatch = useDispatch();
    

    useEffect(()=> {
        dispatch(getUsers(token, page+1))
        // page +1 because matrial ui start with 0
    }, [dispatch, token, page])
    
    const allUsers = useSelector(state => state.getAllUsers);
    const {users, totalUsers} = allUsers;
    
    const handelDeleteUser = (id) => {
      dispatch(deleteUser(token, id))
    }

    const columns = [
        { id: 'userName', label: 'Name', minWidth: 170 },
        { id: 'userEmail', label: 'Email', minWidth: 100 },
        { id: 'userRole', label: 'role', minWidth: 170, },
        
        { id: 'userActions', label: 'Actions', minWidth: 170 },
    ]

    return (
        <div>
            <DashboardTable 
              rows={users} 
              columns={columns}
              page={page} 
              setPage={setPage} 
              count={totalUsers}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            >
            {users.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => handelDeleteUser(row._id)}>
                        <Delete />
                    </IconButton>
                      <IconButton aria-label="edit" onClick={() => showEditModal(row._id)}>
                            <EditIcon />
                        </IconButton>
                  </TableCell>
               
                </TableRow>
              );
            })} 
            </DashboardTable>

            {editModalOpen && <EditUser onCloseModal={hideEditModal} id={getItemID} userInCurrPage={page} />}
            {/*i am sending page in this  modal so when edit user i will dispatch all users again with the same page that user was in  */}
        </div>
    )
}

export default AllUsers;

/*the reason for not updating the pagination when delete an item is that count={totalUsers} 
i didn't update total Users when delete an item 

unlike on category i send category.length and category get updated every time you delete
*/
