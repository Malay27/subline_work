import "./App.css";
import AddModel from "./components/addModel";
import TablePost from "./components/tablePost";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [allPosts, setAllPosts] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddEntry = (newEntry) => {
    setAllPosts([...allPosts, newEntry]);
  };

  const handleShowModel = () => {
    setShowModel(!showModel);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowModel(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = allPosts.filter((post) => {
    return Object.values(post).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setAllPosts(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allPosts]);

  const handleDeletePost = (postId) => {
    axios
      .delete(`http://localhost:3000/posts/${postId}`)
      .then(() => {
        const updatedPosts = allPosts.filter((post) => post.id !== postId);
        setAllPosts(updatedPosts);
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <br/>
      <button onClick={() => setShowModel(!showModel)}>Add New Entries</button>

      {showModel && (
        <AddModel
          handleAddEntry={handleAddEntry}
          handleShowModel={handleShowModel}
          selectedPost={selectedPost}
        />
      )}

      <TablePost
        allPosts={filteredPosts}
        handleEditPost={handleEditPost}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
}

export default App;
