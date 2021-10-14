import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { cartActions, useTotalQuantity } from '../src/services/cartSlice'

const success = () => {

    // const dispatch = useDispatch() 

    // useEffect(() => {
    //     dispatch(cartActions.addItem({quantity: 0}))
    // },[])
    return (
        <div>
            success
        </div>
    )
}

export default success
