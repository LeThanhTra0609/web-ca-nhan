import React from 'react';
import '../styles/Home.css';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

// * Component NoteCard hiển thị một thẻ ghi chú với đầy đủ thông tin
// * Props: note (object), onDelete (func), onToggleComplete (func), onEdit (func)
const NoteCard = ({ note, onDelete, onToggleComplete, onEdit }) => {
  // * Destructuring thông tin từ note
  const { id, title, content, type, tags, deadline, completed } = note;

  // * Định nghĩa nhãn và class CSS cho từng loại ghi chú
  const typeLabels = {
    reminder: { label: 'Nhắc nhở', class: 'type-reminder' },
    plan: { label: 'Kế hoạch', class: 'type-plan' },
    deadline: { label: 'Deadline', class: 'type-deadline' },
    important: { label: 'Quan trọng', class: 'type-important' },
  };

  // * Hàm định dạng ngày deadline sang định dạng HH:mm dd/MM/yyyy tiếng Việt
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'HH:mm dd/MM/yyyy', { locale: vi });
  };

  return (
    <div className="card note-card">
      <div className="card-body">
        {/* * Hiển thị loại ghi chú với màu sắc tương ứng */}
        <div className={`type-label ${typeLabels[type]?.class || ''}`}>
          {typeLabels[type]?.label || 'Ghi chú'}
        </div>

        {/* * Tiêu đề ghi chú */}
        <h5 className="card-title">{title}</h5>

        {/* * Nội dung ghi chú nếu có */}
        {content && <p className="card-text">{content}</p>}

        {/* * Danh sách tag nếu có */}
        {tags?.length > 0 && (
          <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag-badge">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* * Hiển thị deadline nếu có */}
        {deadline && (
          <p className="card-text deadline-text">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span className="text-danger">
              Hạn chót: {formatDate(deadline)}
            </span>
          </p>
        )}

        {/* * Trạng thái hoàn thành của ghi chú */}
        <p className="card-text status-text">
          <strong className={completed ? 'text-success' : 'text-warning'}>
            {completed ? '✅ Đã hoàn thành' : '🕒 Chưa hoàn thành'}
          </strong>
        </p>

        {/* * Các hành động: đánh dấu hoàn thành, sửa, xóa */}
        <div className="card-actions">
          <div>
            <button
              className="btn-action btn-check"
              onClick={() => onToggleComplete(id)}
              title={
                completed
                  ? 'Đánh dấu chưa hoàn thành'
                  : 'Đánh dấu đã hoàn thành'
              }
            >
              {completed ? '↩️ Hoàn tác' : '✔️ Hoàn thành'}
            </button>
            <button
              className="btn-action btn-edit"
              onClick={() => onEdit(note)}
              title="Chỉnh sửa"
            >
              ✏️ Sửa
            </button>
          </div>
          <button
            className="btn-action btn-delete"
            onClick={() => onDelete(id)}
            title="Xóa ghi chú"
          >
            🗑️ Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
