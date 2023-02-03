import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id:null,
  name:null,
  email:null,
  headline:null,
  image:null,
  likeId:[],
  categoryId:[],
  friendId:[],
  PostId:[],
  educationId:[],
  experienceId:[],
  skillId:[],
  projectId:[],
  linkId:[],
  location:null,

}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      CreateId:(state,action)=>{
        return {
          ...state,
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          categoryId:action.payload.categoryId,
          image:  action.payload.image,
          friendId: [...action?.payload?.friendId],
          PostId: action.payload.PostId,
          headline:action.payload.headline,
          experienceId:action.payload.experienceId,
          educationId:action.payload.educationId,
          skillId:action.payload.skillId,
          projectId:action.payload.projectId,
          linkId:action.payload.linkId,
          location:action.payload.location,
        }
      },
      updateCategory:(state,action)=>{
        return{
          ...state,
          categoryId:action.payload,
        }
      },
      reset:(state,action)=>{
        return initialState;
      }
  },
})

// Action creators are generated for each case reducer function
export const {CreateId,updateCategory,reset} = UserSlice.actions

export default UserSlice.reducer