import { useState } from 'react';

const RenameChatModal = ({ isOpen, onClose, onSave, currentName }) => {
  const [newName, setNewName] = useState(currentName);

  const handleSave = () => {
    onSave(newName);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Change Chat Name</h2>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new chat name"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default RenameChatModal;
