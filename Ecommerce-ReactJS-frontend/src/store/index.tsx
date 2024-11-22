import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// import { configureStore } from '@reduxjs/toolkit';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { 
//   // ThunkMiddleware is included by default in configureStore, 
//   // but we're importing it for clarity
//  // ThunkMiddleware,
//   // ThunkAction and Action are used for typing async actions
//   ThunkAction,
//   Action 
// } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';

// /**
//  * Redux Store Configuration
//  * 
//  * This file sets up the Redux store with the necessary middleware and reducers.
//  * RTK (Redux Toolkit) simplifies the store setup process by:
//  * 1. Automatically setting up the Redux DevTools Extension
//  * 2. Including thunk middleware by default
//  * 3. Enabling ImmerJS for immutable state updates
//  * 4. Combining reducers automatically
//  */

// // Configure the Redux store with our reducers and middleware
// export const store = configureStore({
//   // Define all reducers the store should use
//   reducer: {
//     cart: cartReducer,
//     // Add other reducers here as needed
//   },
//   // While middleware is included automatically, we can customize it if needed
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       // Configuration options for the middleware
    
//       // Enable runtime checks in development
//       thunk: true,
//       immutableStateInvariant: true,
//     }),
//   // Enable Redux DevTools in development
//   devTools: process.env.NODE_ENV !== 'production',
// });

// // Extract type information from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// /**
//  * Custom type for Thunk actions in your application
//  * This helps with typing async action creators
//  * 
//  * Usage example:
//  * export const myAsyncAction = (): AppThunk => async dispatch => {
//  *   // Your async logic here
//  * };
//  */
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,        // The return type of the thunk function
//   RootState,         // The state of your store
//   unknown,           // Any extra argument middleware might inject
//   Action<string>     // Basic type of actions
// >;

// /**
//  * Custom hooks for TypeScript usage
//  * These hooks provide type safety when using useDispatch and useSelector
//  * 
//  * Import these in your components instead of the basic hooks from react-redux
//  */


// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;