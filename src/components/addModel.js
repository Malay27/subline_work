import axios from "axios";
import React, { useState } from "react";

const AddModel = ({ handleAddEntry, handleShowModel, selectedPost }) => {
  const [formData, setFormData] = useState({
    id: selectedPost ? selectedPost.id : "",
    title: selectedPost ? selectedPost.title : "",
    comments: selectedPost ? selectedPost.comments : 0,
    likes: selectedPost ? selectedPost.likes : 0,
    author: selectedPost ? selectedPost.author : "",
    createdAt: selectedPost ? selectedPost.createdAt : new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPost) {
      axios
        .patch(`http://localhost:3000/posts/${formData.id}`, formData)
        .then((response) => {
          handleShowModel();
        })
        .catch((error) => {
          console.error("Error updating entry:", error);
        });
    } else {
      axios
        .post("http://localhost:3000/posts", formData)
        .then((response) => {
          handleAddEntry(response.data);
          handleShowModel();
        })
        .catch((error) => {
          console.error("Error adding entry:", error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        ></input>
        <input
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Comments"
        ></input>
        <input
          name="likes"
          value={formData.likes}
          onChange={handleChange}
          placeholder="Likes"
        ></input>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
        ></input>
        <button>{selectedPost?"Edit Post":"Add new one"}</button>
      </form>
    </div>
  );
};

export default AddModel;
