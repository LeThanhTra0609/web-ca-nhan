import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../services/postService';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import PostFilter from '../components/PostFilter';
import PostSort from '../components/PostSort';
import '../styles/Post.css';

const Posts = () => {
  const [state, setState] = useState({
    posts: [],
    isLoading: true,
    error: null,
  });

  const [selectedTag, setSelectedTag] = useState('Tất cả');
  const [sortOrder, setSortOrder] = useState('Tất cả');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setState({ posts: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          posts: [],
          isLoading: false,
          error: 'Không thể tải danh sách bài viết. Vui lòng thử lại sau.',
        });
      }
    };

    fetchPosts();
  }, []);

  const { posts, isLoading, error } = state;

  // Lọc bài viết theo tag
  const filteredPosts =
    selectedTag === 'Tất cả'
      ? posts
      : posts.filter((post) => post.tags.includes(selectedTag));

  // Sắp xếp bài viết theo createdAt
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOrder === 'Mới nhất') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === 'Cũ nhất') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  // Lấy danh sách tất cả tags duy nhất
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  if (isLoading)
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-light">Danh sách bài viết</h2>
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm bg-dark border-secondary">
                <div className="skeleton-img bg-secondary"></div>
                <div className="card-body d-flex flex-column">
                  <div className="skeleton-title bg-secondary"></div>
                  <div className="skeleton-text bg-secondary"></div>
                  <div className="mt-auto">
                    <div className="skeleton-tags bg-secondary"></div>
                    <div className="skeleton-button bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger mt-4 container">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-light">Danh sách bài viết</h2>
        <div className="d-flex gap-3">
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-dark border-secondary text-light">
              <i className="bi bi-funnel"></i>
            </span>
            <PostFilter
              selectedTag={selectedTag}
              onFilterChange={setSelectedTag}
              availableTags={allTags}
            />
          </div>

          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-dark border-secondary text-light">
              <i className="bi bi-sort-down"></i>
            </span>
            <PostSort sortOrder={sortOrder} onSortChange={setSortOrder} />
          </div>
        </div>
      </div>

      <div className="row">
        <PostList posts={sortedPosts} />
      </div>
    </div>
  );
};

export default Posts;
