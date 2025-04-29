const PostSort = ({ sortOrder, onSortChange }) => {
  return (
    <select
      className="form-select bg-dark text-light border-secondary"
      value={sortOrder}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="Tất cả">Sắp xếp</option>
      <option value="Mới nhất">Mới nhất</option>
      <option value="Cũ nhất">Cũ nhất</option>
    </select>
  );
};

export default PostSort;
