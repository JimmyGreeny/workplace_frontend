import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewMaterialMutation } from "./materialsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import { useGetUsersQuery } from '../users/usersApiSlice'

const NewMaterialBtn = () => {

    const { username } = useAuth()

    const { data: userId } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            data: data?.ids.map(id => data?.entities[id]).filter(user => user.username === username)[0]._id
        }),
    })
    //Guessing it's better send user id directly with Headers..??
    //console.dir(userId)

    const [addNewMaterial, {
        isError,
        error
    }] = useAddNewMaterialMutation()

    const onAddMaterialRow = async (e) => {
        e.preventDefault()
        await addNewMaterial({ user: userId })
    }

    const errClass = isError ? "errmsg" : "offscreen"

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <tr>
                <td colSpan="6" className="align-middle text-center">
                    <button
                        className="addRow_btn font-weight-bold"
                        onClick={onAddMaterialRow}
                    >
                        +
                    </button>
                </td>
            </tr>
        </>
    )

    return content
}

export default NewMaterialBtn