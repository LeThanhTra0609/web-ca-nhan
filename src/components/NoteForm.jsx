import React, { useState, useEffect } from 'react';

const NoteForm = ({ note, onSave, onCancel }) => {
  // * Khởi tạo state mặc định cho form ghi chú
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'reminder',
    tags: [],
    deadline: '',
    completed: false,
  });

  // * State để xử lý input tag
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    // * Nếu có note truyền vào (chế độ chỉnh sửa), thì gán giá trị form tương ứng
    if (note) {
      setFormData({
        ...note,
        deadline: note.deadline ? note.deadline.slice(0, 16) : '', // * Cắt chuỗi ISO cho datetime-local
      });
    }
  }, [note]);

  // * Xử lý khi người dùng thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // * Thêm tag vào danh sách nếu không rỗng
  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  // * Xóa tag theo index
  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // * Submit form và định dạng lại deadline nếu có
  const handleSubmit = (e) => {
    e.preventDefault();
    const noteToSave = {
      ...formData,
      deadline: formData.deadline ? `${formData.deadline}:00.000Z` : null,
    };
    onSave(noteToSave);
  };

  return (
    <div
      className="card mb-4"
      style={{ backgroundColor: '#252526', borderColor: '#3e3e42' }}
    >
      <div className="card-body">
        <h5 className="card-title text-light">
          {note?.id ? 'Chỉnh sửa ghi chú' : 'Thêm ghi chú mới'}
        </h5>

        <form onSubmit={handleSubmit}>
          {/* * Trường nhập tiêu đề */}
          <div className="mb-3">
            <label className="form-label text-light">Tiêu đề *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề ghi chú"
              required
              style={{ color: '#f0f0f0' }}
            />
          </div>

          {/* * Trường nhập nội dung ghi chú */}
          <div className="mb-3">
            <label className="form-label text-light">Nội dung</label>
            <textarea
              className="form-control bg-dark text-light border-secondary"
              rows="3"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Nhập nội dung ghi chú (tùy chọn)"
              style={{ color: '#f0f0f0' }}
            />
          </div>

          {/* * Thêm và hiển thị các tag */}
          <div className="mb-3">
            <label className="form-label text-light">Tags</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Nhập tag và bấm Thêm"
                style={{ color: '#f0f0f0' }}
              />
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={handleAddTag}
              >
                Thêm
              </button>
            </div>

            {/* * Danh sách tag đang có */}
            <div className="d-flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary text-light">
                  #{tag}
                  <button
                    type="button"
                    className="ms-2 btn-close btn-close-white"
                    onClick={() => handleRemoveTag(index)}
                    aria-label="Remove"
                  />
                </span>
              ))}
            </div>
          </div>

          {/* * Chọn loại ghi chú & hạn chót */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label text-light">Loại</label>
              <select
                className="form-select bg-dark text-light border-secondary"
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={{ color: '#f0f0f0' }}
              >
                <option value="reminder">Nhắc nhở</option>
                <option value="plan">Kế hoạch</option>
                <option value="deadline">Deadline</option>
                <option value="important">Quan trọng</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label text-light">
                Hạn chót (không bắt buộc)
              </label>
              <input
                type="datetime-local"
                className="form-control bg-dark text-light border-secondary"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                style={{ color: '#f0f0f0' }}
              />
            </div>
          </div>

          {/* * Checkbox đánh dấu hoàn thành, chỉ hiển thị khi chỉnh sửa */}
          {note?.id && (
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="completedCheck"
                checked={formData.completed}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    completed: e.target.checked,
                  }))
                }
              />
              <label
                className="form-check-label text-light"
                htmlFor="completedCheck"
              >
                {formData.completed ? '✅ Đã hoàn thành' : '☑️ Chưa hoàn thành'}
              </label>
              <small className="form-text text-muted ms-2 d-block">
                {formData.completed
                  ? 'Bỏ chọn để đánh dấu chưa hoàn thành'
                  : 'Chọn để đánh dấu đã hoàn thành'}
              </small>
            </div>
          )}

          {/* * Các nút thao tác */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={onCancel}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              {note?.id ? 'Cập nhật' : 'Lưu ghi chú'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
