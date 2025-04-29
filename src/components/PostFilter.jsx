const PostFilter = ({ selectedTag, onFilterChange, availableTags }) => {
  return (
    <select
      className="form-select bg-dark text-light border-secondary"
      value={selectedTag}
      onChange={(e) => onFilterChange(e.target.value)}
    >
      <option value="Tất cả">Tất cả bài viết</option>
      {availableTags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
};

export default PostFilter;
