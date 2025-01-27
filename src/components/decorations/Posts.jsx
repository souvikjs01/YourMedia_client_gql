import React from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import client from '../../Apollo'
import { useState } from 'react'
import { useEffect } from 'react'
import PostsOnFeed from './PostsOnFeed'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Posts() {
    const userId = localStorage.getItem('userId').toString();
    const FEED_GRAPHQL_QUERY =  gql`
    query GetPosts($userId: String!) {
      user(id: $userId) {
        Feed{
            id
            message
            user{
                id
                username
            }
            createdAt
            likes{
                id
                username
            }
            Comments{
                comment
                commenter{
                    username
                }
            }
        }
      }
    }
  `;
    const { loading, error, data } = useQuery(FEED_GRAPHQL_QUERY,{variables: {userId: userId},} ,{ client });

    useEffect(() => {
        if (loading) {
          console.log('Loading...');
        } else if (error) {
          console.error('Error:', error);
        } else {
          console.log('Data:', data);
        }
      }, [loading, error, data]);

  return (
    <div style={{margin: 'auto'}}>
      
      <div style={{marginTop: '100px', maxWidth: '550px', margin: '30px'}} >
      {loading && 
      
      <Stack spacing={2}>
      
      
      
      <Stack direction="row" spacing={2}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="rounded" width={150} height={50} margin={10}/>
      </Stack>
      
      <Skeleton variant="rounded" width={300} height={160} />

      <Stack direction="row" spacing={2}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="rounded" width={150} height={50} margin={10}/>
      </Stack>
      
      <Skeleton variant="rounded" width={300} height={160} />

      <Stack direction="row" spacing={2}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="rounded" width={150} height={50} margin={10}/>
      </Stack>
      
      <Skeleton variant="rounded" width={300} height={160} />
      
      
      
    </Stack>
    
    }
    </div>
    
      {error && <p>Error: {error.message}</p>}
      {/* <PostsOnFeed/> */}
      {data &&
        data.user &&
        data.user.Feed &&
        data.user.Feed.map((post, index) => {
          const userLikedPost = post.likes.some((like) => like.id === userId);

          return (
            <div key={index}>
              <PostsOnFeed
                name={post.user.username}
                postId={post.id}
                post={post.message}
                time={post.createdAt}
                likes={post.likes.length}
                comments={post.Comments.length}
                userLiked={userLikedPost ? 1 : 0}
              />
            </div>
          );
        })}
    </div>
  )
}
