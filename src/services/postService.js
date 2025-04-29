import axios from 'axios';

// Định nghĩa URL của API server JSON
const API_URL = 'http://localhost:3001/posts';

// Hàm lấy danh sách tất cả các bài viết
export const getAllPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Hàm lấy bài viết theo ID
export const getPostById = async (id) => {
  if (!id) {
    throw new Error('Post ID is required');
  }

  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// Hàm thêm bài viết mới
export const addPost = async (post) => {
  try {
    const response = await axios.post(API_URL, post);
    return response.data;
  } catch (error) {
    console.error('Error adding new post:', error);
    throw error;
  }
};

// Hàm cập nhật bài viết theo ID
export const updatePost = async (id, updatedPost) => {
  if (!id) {
    throw new Error('Post ID is required for update');
  }

  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedPost);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

// Hàm xóa bài viết theo ID
export const deletePost = async (id) => {
  if (!id) {
    throw new Error('Post ID is required for deletion');
  }

  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Trả về ID của bài viết đã xóa
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

// Xuất tất cả các hàm để có thể import riêng lẻ
export default {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
