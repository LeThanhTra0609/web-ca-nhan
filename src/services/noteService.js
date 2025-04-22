import axios from 'axios';

// * Định nghĩa URL của API server JSON
const API_URL = 'http://localhost:3001/notes';

// * Hàm lấy danh sách tất cả các ghi chú
export const getNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // * Trả về danh sách ghi chú
  } catch (error) {
    //! Lỗi khi lấy dữ liệu ghi chú
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// * Hàm thêm ghi chú mới
export const addNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data; // * Trả về ghi chú vừa được thêm
  } catch (error) {
    //! Lỗi khi thêm ghi chú mới
    console.error('Error adding note:', error);
    throw error;
  }
};

// * Hàm cập nhật ghi chú theo ID
export const updateNote = async (id, updatedNote) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedNote);
    return response.data; // * Trả về ghi chú sau khi cập nhật
  } catch (error) {
    //! Lỗi khi cập nhật ghi chú
    console.error('Error updating note:', error);
    throw error;
  }
};

// * Hàm xóa ghi chú theo ID
export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    // * Không cần trả về dữ liệu, chỉ cần đảm bảo xóa thành công
  } catch (error) {
    //! Lỗi khi xóa ghi chú
    console.error('Error deleting note:', error);
    throw error;
  }
};
