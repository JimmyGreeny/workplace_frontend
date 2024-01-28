import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
//import { invoicesApiSlice } from '../invoice/invoicesApiSlice'
//import { materialsApiSlice } from '../invoice/materialsApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        //store.dispatch(invoicesApiSlice.util.prefetch('getInvoices', 'invoicesList', { force: true }))
        //store.dispatch(materialsApiSlice.util.prefetch('getMaterials', 'materialsList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
