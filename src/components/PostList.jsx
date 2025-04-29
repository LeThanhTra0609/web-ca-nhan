import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="col-12">
        <div className="alert alert-info">
          <i className="bi bi-info-circle-fill me-2"></i>
          Không có bài viết nào.
        </div>
      </div>
    );
  }

  return posts.map((post) => (
    <div key={post.id} className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm bg-dark border-secondary hover-effect">
        <div className="image-wrapper">
          <img
            loading="lazy"
            src={post.thumbnail || '/assets/placeholder.png'}
            className="card-img-top post-thumbnail"
            alt={post.title}
            onError={(e) => {
              e.target.src = '/assets/placeholder.png';
              e.target.alt = 'Ảnh mặc định';
            }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-light">{post.title}</h5>
          <p className="card-text text-light">{post.summary}</p>
          <div className="mt-auto">
            <div className="mb-2">
              {post.tags &&
                post.tags.map((tag) => (
                  <span key={tag} className="badge bg-primary me-1">
                    {tag}
                  </span>
                ))}
            </div>
            <Link to={`/posts/${post.id}`} className="btn btn-primary w-100">
              <i className="bi bi-eye-fill me-2"></i>
              Xem chi tiết
            </Link>
          </div>
        </div>
        <div className="card-footer bg-dark border-secondary">
          <small className="text-light">
            <i className="bi bi-calendar3 me-1"></i>
            {new Date(post.createdAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </small>
        </div>
      </div>
    </div>
  ));
};

export default PostList;
