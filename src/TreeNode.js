import React, { useState } from 'react';
import { FaPlus, FaMinus, FaEdit, FaSave, FaUndo } from 'react-icons/fa';

const TreeNode = ({ node, onAddChild, onDelete, onEdit, onReset }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(node.title);

    const handleAddChild = () => {
        onAddChild(node.id);
    };

    const handleDelete = () => {
        onDelete(node.id);
    };

    const handleEdit = () => {
        if (isEditing) {
            onEdit(node.id, newTitle);
        }
        setIsEditing(!isEditing);
    };

    const handleReset = () => {
        onReset();
    };

    return (
        <div className="tree-node">
            <div className="node-content">
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={{ marginRight: '5px' }}
                    />
                ) : (
                    <span className="node-title">{node.title}</span>
                )}
                <button onClick={handleAddChild} className="icon-button"><FaPlus /></button>
                <button onClick={handleDelete} className="icon-button"><FaMinus /></button>
                <button onClick={handleEdit} className="icon-button">{isEditing ? <FaSave /> : <FaEdit />}</button>
                {node.isRoot && <button onClick={handleReset} className="icon-button"><FaUndo /></button>}
            </div>
            <div className="children-container">
                {node.children.map((child) => (
                    <TreeNode
                        key={child.id}
                        node={child}
                        onAddChild={onAddChild}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onReset={onReset}
                    />
                ))}
            </div>
        </div>
    );
};

export default TreeNode;