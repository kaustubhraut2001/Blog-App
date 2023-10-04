import React from "react";
import { useState, useEffect } from "react";
import dataservice from "../Appwrite/config";
import container from "../Components/container/container";
import Postcard from '../../src/Components/Postcard'
const Home = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    dataservice
      .getPosts()
      .then((res) => {
        setPosts(res.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (posts.length === 0) {
    return (
      <div>
        <container>
          <div>
            <div>
              <h1>Login to Read the Posts</h1>
            </div>
          </div>
        </container>
      </div>
    );
  }

  return (
    <div>
      <container>
        <div>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </container>
    </div>
  );
};

export default Home;
