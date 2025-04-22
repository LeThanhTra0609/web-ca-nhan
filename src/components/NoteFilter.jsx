import React from 'react';

// * Component lọc ghi chú theo loại
// ? Nhận vào props: filterType (loại hiện tại đang lọc), setFilterType (hàm để cập nhật loại lọc)
const NoteFilter = ({ filterType, setFilterType }) => {
  return (
    <div className="filter-section">
      <div className="row align-items-center">
        <div className="col-md-4 mb-2 mb-md-0">
          {/* * Nhãn cho dropdown lọc */}
          <label htmlFor="noteFilter" className="form-label mb-0">
            Lọc theo loại:
          </label>

          {/* * Dropdown chọn loại lọc ghi chú */}
          <select
            id="noteFilter"
            className="form-select"
            value={filterType} // * Giá trị đang được chọn
            onChange={(e) => setFilterType(e.target.value)} // * Cập nhật loại lọc khi chọn mới
          >
            {/* * Các tuỳ chọn lọc theo loại ghi chú */}
            <option value="all">📋 Tất cả</option>
            <option value="reminder">✅ Nhắc nhở</option>
            <option value="plan">📅 Kế hoạch</option>
            <option value="deadline">⏰ Deadline</option>
            <option value="important">⚠️ Quan trọng</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NoteFilter; // * Export component để sử dụng ở nơi khác
