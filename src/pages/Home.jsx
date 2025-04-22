import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import NoteFilter from '../components/NoteFilter';
import NoteForm from '../components/NoteForm';
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from '../services/noteService';
import '../styles/Home.css';

const Home = () => {
  // * State lưu danh sách ghi chú
  const [notes, setNotes] = useState([]);

  // * State lọc loại ghi chú (all | reminder | personal | ...)
  const [filterType, setFilterType] = useState('all');

  // * Hiển thị form thêm/sửa ghi chú
  const [showForm, setShowForm] = useState(false);

  // * Ghi chú hiện đang được chỉnh sửa
  const [currentNote, setCurrentNote] = useState(null);

  // * Trạng thái loading khi lấy dữ liệu
  const [loading, setLoading] = useState(true);

  // * Trạng thái lỗi khi gọi API
  const [error, setError] = useState(null);

  // * Lấy danh sách ghi chú khi component được mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // TODO: Thêm ghi chú mới
  const handleAddNote = () => {
    setCurrentNote({
      title: '',
      content: '',
      type: 'reminder',
      tags: [],
      deadline: '',
      completed: false,
    });
    setShowForm(true);
  };

  // TODO: Sửa ghi chú
  const handleEditNote = (note) => {
    setCurrentNote(note);
    setShowForm(true);
  };

  // TODO: Lưu ghi chú mới hoặc đã chỉnh sửa
  const handleSaveNote = async (noteData) => {
    try {
      let savedNote;

      if (noteData.id) {
        // * Nếu có id => cập nhật ghi chú
        savedNote = await updateNote(noteData.id, noteData);
        setNotes(
          notes.map((note) => (note.id === noteData.id ? savedNote : note))
        );
      } else {
        // * Nếu chưa có id => thêm mới ghi chú
        savedNote = await addNote({
          ...noteData,
          createdAt: new Date().toISOString(),
        });
        setNotes([...notes, savedNote]);
      }

      // * Sau khi lưu xong thì ẩn form và reset ghi chú hiện tại
      setShowForm(false);
      setCurrentNote(null);
    } catch (err) {
      // ! WARNING: Lỗi khi lưu ghi chú
      setError(err.message);
    }
  };

  // TODO: Xoá ghi chú
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      // ! WARNING: Lỗi khi xoá ghi chú
      setError(err.message);
    }
  };

  // TODO: Đánh dấu hoàn thành / chưa hoàn thành
  const handleToggleComplete = async (id) => {
    try {
      const noteToUpdate = notes.find((note) => note.id === id);
      const updatedNote = {
        ...noteToUpdate,
        completed: !noteToUpdate.completed,
      };

      await updateNote(id, updatedNote);
      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    } catch (err) {
      // ! WARNING: Lỗi khi cập nhật trạng thái hoàn thành
      setError(err.message);
    }
  };

  // * Lọc danh sách ghi chú theo filterType
  const filteredNotes =
    filterType === 'all'
      ? notes
      : notes.filter((note) => note.type === filterType);

  // * Trạng thái đang tải
  if (loading)
    return <div className="container my-4 text-light">Đang tải...</div>;

  // ! Trạng thái lỗi
  if (error)
    return <div className="container my-4 text-danger">Lỗi: {error}</div>;

  return (
    <div className="container my-4 home-page">
      {/* * Tiêu đề và nút thêm ghi chú */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-light">📌 Ghi chú cá nhân</h2>
        <button className="btn btn-add-note" onClick={handleAddNote}>
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
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Thêm mới
        </button>
      </div>

      {/* * Hiển thị lỗi nếu có */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* * Bộ lọc loại ghi chú */}
      <NoteFilter filterType={filterType} setFilterType={setFilterType} />

      {/* * Hiển thị form nếu đang trong chế độ thêm/sửa */}
      {showForm && (
        <NoteForm
          note={currentNote}
          onSave={handleSaveNote}
          onCancel={() => {
            setShowForm(false);
            setCurrentNote(null);
          }}
        />
      )}

      {/* * Danh sách các ghi chú */}
      <div className="note-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditNote}
            />
          ))
        ) : (
          // * Trường hợp không có ghi chú phù hợp
          <div className="col-12 text-center text-light py-4">
            {filterType === 'all'
              ? 'Chưa có ghi chú nào'
              : `Không có ghi chú loại ${filterType}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
