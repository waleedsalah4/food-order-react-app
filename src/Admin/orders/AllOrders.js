import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder } from '../../store/actions/adminActions';
import DashboardTable from '../DashboardTable';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const AllOrders = (porps) => {

    const token = JSON.parse(localStorage.getItem("user-token") ||'{}')
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dispatch = useDispatch();
    const orders = useSelector(state => state.getAlOrders)
    const {allOrders, totalOrders} = orders;
    // console.log(orders)
    // console.log(totalOrders)
    const handelDeleteOrder = (id) => {
      dispatch(deleteOrder(token, id))
    }

    useEffect(()=>{
        dispatch(getAllOrders(page+1,token))
    }, [dispatch, token, page])


    const columns = [
        { id: 'userName', label: 'Name', minWidth: 170 },
        { id: 'userEmail', label: 'Email', minWidth: 100 },
        { id: 'phoneNumber', label: 'Phone Number', minWidth: 170, },
        { id: 'address', label: 'Address', minWidth: 170, },
        
        { id: 'orderDate', label: 'Order Date', minWidth: 170, },
        { id: 'totalPrice', label: 'Total Price', minWidth: 170, },
        { id: 'orderActions', label: 'Actions', minWidth: 170 },
    ]

    return (
        <div>
           <DashboardTable 
            rows={allOrders} 
            columns={columns} 
            page={page} 
            setPage={setPage} 
            count={totalOrders}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          >
            {allOrders.map((row) => {
                // const date = row.createdAt.split('T')[0];
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.customerEmail}</TableCell>
                  <TableCell>{row.customerPhoneNumber}</TableCell>
                  <TableCell>{row.customerAddress}</TableCell>
                  <TableCell>{row.createdAt.split('T')[0]}</TableCell>
                  <TableCell>{row.totalPrice}$</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => handelDeleteOrder(row._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
               
                </TableRow>
              );
            })} 
            </DashboardTable>
            
        </div>
    )
}

export default AllOrders;