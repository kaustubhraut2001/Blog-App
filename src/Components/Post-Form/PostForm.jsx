import React, { useCallback, useEffect } from "react";
import {useForm}  from "react-hook-form";

import {RTE , container , Button , Logo , dataservice} from '../index'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "",
      },
    });

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.UserData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? dataservice.uploadfile(data.image[0]) : null;
      if (file) {
        dataservice.deletfile(post.featuredimage);
      }
      const postdata = await dataservice.updatepost(post._id, {
        ...data,
        featuredimage: file ? file.$id : undefine,
      });

      if (postdata) {
        navigate(`/posts/${postdata.$id}`);
      }
    } else {
      const uploadfile = data.image[0]
        ? dataservice.uploadfile(data.image[0])
        : null;
      if (uploadfile) {
        const fileid = uploadfile.$id;
        data.featuredimage = fileid;
        const dbpost = await dataservice.createpost({
          ...data,
          userID: user.$id,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const slugtransform = useCallback((value) => {
    if (value) {
      const slug = value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-");
      return slug;
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subsctiption = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugtransform(value.title, {
            shouldValidate: true,
          })
        );
      }
    });
    return () => subsctiption.unsubscribe();
  }, [watch, slugtransform, setValue]);
  return <div>PostForm</div>;
};

export default PostForm;
