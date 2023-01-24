import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import style from './Index.module.scss'
import axios from 'axios';
import base_url from '../../utils/connection';
import Post from './Post';
import { doc,getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/fireconnect";

const Feed = () => {
  const user = useSelector((state)=>state.user);
  const [postId,setPostId] = useState([]);
  const [allPost,setAllPost] = useState([]);

  useEffect(()=>{
    if(user._id!==null && allPost.length===0){
      async function getFreindsPostId(){
        let arr =[];
        // console.log(user);
        await Promise.all(user.friendId.map(async(id)=>{
          const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allPostsId`);
          arr.push(...res.data.result.PostId);
        }))

        setPostId([...arr]);
        }
      getFreindsPostId();
    }
  },[user]);

  useEffect(()=>{
    if(user._id!==null){
      async function getFreindsPost(){
        let arr =[];
        await Promise.all(postId.map(async(id)=>{
          const docRef = doc(db, "posts", id);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            const res = docSnap.data();
            res.id = id;
            arr.push(res);
          }
        }))
        setAllPost(arr);
      }
      getFreindsPost();
    }
  },[postId]);

  return (
    <div className={style.feedFrame}>
      {
        allPost.map((post,idx)=>(
          <Post key={"post"+idx} post={post}/>
        ))
      }
     
    </div>
  )
}

export default Feed;