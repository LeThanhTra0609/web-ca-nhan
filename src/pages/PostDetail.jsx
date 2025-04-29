import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/postService';
import '../styles/Post.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container post-detail-container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-light">Đang tải bài viết...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container post-detail-container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2"
            onClick={() => navigate('/posts')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Quay về trang bài viết
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container post-detail-container py-5">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy bài viết.
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2"
            onClick={() => navigate('/posts')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Quay về trang bài viết
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container post-detail-container py-4">
      <article className="post-article">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-2 post-tag">
                <i className="bi bi-tag me-1"></i>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Nút quay lại - ở cuối bài viết */}
        <div className="text-center mt-5 pt-4 border-top">
          <button
            className="btn btn-outline-primary px-4 py-2"
            onClick={() => navigate('/posts')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Quay về danh sách bài viết
          </button>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
