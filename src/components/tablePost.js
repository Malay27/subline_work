import React from "react";

const TablePost = ({ allPosts, handleEditPost, handleDeletePost }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Comments</th>
            <th>Likes</th>
            <th>Author</th>
            <th>CreatedAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPosts.map((post) => (
            <tr key={post.id}>
              {Object.keys(post).map((key) => (
                <td key={key}>{post[key]}</td>
              ))}
              <td>
                <select
                  onChange={(e) => {
                    const action = e.target.value;
                    if (action === "edit") {
                      handleEditPost(post);
                    } else if (action === "delete") {
                      handleDeletePost(post.id);
                    }
                  }}
                >
                  <option value="">Actions</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePost;
