import React from "react";
import container from "../Components/container/container";

// import PostCard from "../Components/PostCard/PostCard";
import dataservice from "../Appwrite/config";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import Postcard from '../../src/Components/Postcard'
const Allposts = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    dataservice
      .getAllposts([])
      .then((res) => {
        setPosts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <container>
        <div>
          {posts.map((post) => (
            <div>
              <PostCard key={post.$id} post={post} />
            </div>
          ))}
        </div>
      </container>
    </div>
  );
};

export default Allposts;
