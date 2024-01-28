import { createSlice } from '@reduxjs/toolkit'

const PriceSlice = createSlice({
    name: 'price',
    initialState: [],
    reducers: {
        setPrice: (state, action) => {
            return action.payload
            //.map(item => (item.count))
        }
    }
})

export const { setPrice } = PriceSlice.actions

export default PriceSlice.reducer

//export const selectCurrentMaterials = (state) => state.materials.value || []