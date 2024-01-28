import { createSlice } from '@reduxjs/toolkit'

const materialsSlice = createSlice({
    name: 'materials',
    initialState: [],
    reducers: {
        setMaterials: (state, action) => {
            return action.payload
            //.map(item => (item.count))
        }
    }
})

export const { setMaterials } = materialsSlice.actions

export default materialsSlice.reducer

//export const selectCurrentMaterials = (state) => state.materials.value || []