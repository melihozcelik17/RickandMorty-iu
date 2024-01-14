// // src/redux/favoriteSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from './store';

// interface FavoriteState {
//   list: string[]; // Örnek olarak sadece karakter isimlerini içeren bir liste
// }

// const initialState: FavoriteState = {
//   list: [],
// };

// const favoriteSlice = createSlice({
//   name: 'favorite',
//   initialState,
//   reducers: {
//     addFavorite: (state, action: PayloadAction<string>) => {
//       state.list.push(action.payload);
//     },
//     removeFavorite: (state, action: PayloadAction<string>) => {
//       state.list = state.list.filter((character) => character !== action.payload);
//     },
//   },
// });

// export const { addFavorite, removeFavorite } = favoriteSlice.actions;
// export const selectFavoriteList = (state: RootState) => state.favorite.list;

// export default favoriteSlice.reducer;
