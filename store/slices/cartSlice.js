import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items:[],
  customizedItems:[],
  itemsCarpentery:[],
  totalAmount:0,
  totalAmountcarpentery:0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addToCart: (state, action) => {
      state.totalAmount+= action.payload.price
      state.items ?
      state.items = [...state.items, action.payload.item]
      :   state.items = [  action.payload.item]
      localStorage.setItem('CartPriceTotal',JSON.stringify(state.totalAmount))
      localStorage.setItem('CartItems',JSON.stringify(state.items))
    },
    clear: (state,action) => {
        state.totalAmount = 0
        state.items = []
        state.customizedItems = []
        localStorage.setItem('CartPriceTotal',JSON.stringify(state.totalAmount))
        localStorage.setItem('CartItems',JSON.stringify(state.items))
        localStorage.setItem('CartCustomizeItems',JSON.stringify(state.customizedItems))

    },
    updateFromLocalStorage: (state,action) => {
        state.totalAmount = JSON.parse(localStorage.getItem('CartPriceTotal'))
        state.items =   localStorage.getItem('CartItems')
        state.items = JSON.parse(state.items )
        state.customizedItems=   localStorage.getItem('CartCustomizeItems')
        state.customizedItems= JSON.parse(state.customizedItems )

        state.totalAmountcarpentery = JSON.parse(localStorage.getItem('carpenteryCartPriceTotal'))
        state.itemsCarpentery =   localStorage.getItem('carpenteryCartItems')
        state.itemsCarpentery = JSON.parse(state.itemsCarpentery )

        
    },
    addToCarpenterShopCart: (state,action) => {
        state.itemsCarpentery = [...state.itemsCarpentery, action.payload.item]
        state.totalAmountcarpentery+= action.payload.item.unitPrice * action.payload.item.amount
        

    },
    addItem: (state,action) => {
      if(state.items&&state.items.find(el => el.id === action.payload.id))
      {
        let indeex = state.items.findIndex(el => el.id === action.payload.id)

        state.items[indeex].amount = state.items[indeex].amount*1 + action.payload.amount*1

       

        state.totalAmount= state.totalAmount +action.payload.price*action.payload.amount
        localStorage.setItem('CartPriceTotal',JSON.stringify(state.totalAmount))
        localStorage.setItem('CartItems',JSON.stringify(state.items))
      }else{
        state.items = [...state.items, {
          id: action.payload.id,
          name: action.payload.name,
          price:action.payload.price,
          amount:action.payload.amount,
          imgSrc:action.payload.imgSrc
          
        }]
        state.totalAmount+= action.payload.price*action.payload.amount
        localStorage.setItem('CartPriceTotal',JSON.stringify(state.totalAmount))
        localStorage.setItem('CartItems',JSON.stringify(state.items))

      }
      

    },

    addCustomizedItem: (state,action) => {
      const tmpId = action.payload.id+action.payload.name+action.payload.width+action.payload.lenght+action.payload.high+action.payload.material
   
   if(state.customizedItems&&state.customizedItems.find(el =>   (el.id === tmpId   )))
      {
        let indeex = state.customizedItems.findIndex(el => el.id === tmpId  )

        state.customizedItems[indeex].amount = state.customizedItems[indeex].amount*1 + action.payload.amount*1

       

        state.totalAmount= state.totalAmount +action.payload.price*action.payload.amount
        localStorage.setItem('CartPriceTotal',JSON.stringify(state.totalAmount))
        localStorage.setItem('CartCustomizeItems',JSON.stringify(state.customizedItems))

        console.log('dodaje 2')
      }else{

        if(state.customizedItems){
          state.customizedItems = [...state.customizedItems, {
            id: action.payload.id+action.payload.name+action.payload.width+action.payload.lenght+action.payload.high+action.payload.material,
            name: action.payload.name,
            price:action.payload.price,
            width:action.payload.width,
            lenght:action.payload.lenght,
            high:action.payload.high,
            material:action.payload.material,
            amount:action.payload.amount,
            imgSrc:action.payload.imgSrc
            
          }]
        }else{
          state.customizedItems = [  {
            id: action.payload.id+action.payload.name+action.payload.width+action.payload.lenght+action.payload.high+action.payload.material,
            name: action.payload.name,
            price:action.payload.price,
            width:action.payload.width,
            lenght:action.payload.lenght,
            high:action.payload.high,
            material:action.payload.material,
            amount:action.payload.amount,
            imgSrc:action.payload.imgSrc
            
          }]
        }
       
        state.totalAmount= state.totalAmount +action.payload.price*action.payload.amount
        localStorage.setItem('CartPriceTotal',JSON.stringify(state.totalAmount))
        localStorage.setItem('CartCustomizeItems',JSON.stringify(state.customizedItems))
        console.log('dodaje 3')
      }
      
    
      

    },
    modifyAmounCustomizedProdInCart:(state,action) => {
      let indeex = state.customizedItems.findIndex(el => el.id === action.payload.id)
      if(action.payload.amount > 0){
       state.customizedItems[indeex].amount = action.payload.amount*1
      

      }else{
       state.customizedItems.splice(indeex,1)

      }

      let newTotalAmount = 0
      state.items.forEach(element => {
       newTotalAmount += element.price*element.amount
       
      });

      state.customizedItems.forEach(element => {
       newTotalAmount += element.price*element.amount
       
      });

      state.totalAmount = newTotalAmount
      localStorage.setItem('CartPriceTotal',JSON.stringify(state.totalAmount))
      localStorage.setItem('CartItems',JSON.stringify(state.items))
      localStorage.setItem('CartCustomizeItems',JSON.stringify(state.customizedItems))
    },

    modifyAmounInCart: (state,action) => {
      let indeex = state.items.findIndex(el => el.id === action.payload.id)
       if(action.payload.amount > 0){
        state.items[indeex].amount = action.payload.amount*1
       

       }else{
        state.items.splice(indeex,1)

       }

       let newTotalAmount = 0
       state.items.forEach(element => {
        newTotalAmount += element.price*element.amount
        
       });

       state.customizedItems.forEach(element => {
        newTotalAmount += element.price*element.amount
        
       });

       state.totalAmount = newTotalAmount
       localStorage.setItem('CartPriceTotal',JSON.stringify(state.totalAmount))
       localStorage.setItem('CartItems',JSON.stringify(state.items))
      

  },


  },
})

// Action creators are generated for each case reducer function
export const { addToCart,clear,updateFromLocalStorage,addToCarpenterShopCart,addItem,modifyAmounInCart,modifyAmounCustomizedProdInCart,addCustomizedItem } = cartSlice.actions

export default cartSlice.reducer