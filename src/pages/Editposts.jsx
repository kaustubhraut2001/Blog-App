import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import container from "../Components/container/container";
import PostForm from "../Components/Post-Form/PostForm";
import dataservice from "../Appwrite/config";
import { useState } from "react";

const Editposts = () => {
  const [post, setPost] = useState();
  const {} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dataservice
        .getpost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          navigate("/");
        });
    }
  }, [slug, navigate]);

  return post ? (
    <div>
      <container>
        <PostForm post={post} />
      </container>
    </div>
  ) : null;
};

export default Editposts;
