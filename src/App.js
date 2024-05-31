import React, { useState } from 'react';
import TreeNode from './TreeNode';
import './TreeNode.css';

const initialTree = {
  id: 1,
  title: 'Root',
  children: [],
  isRoot: true,
};

let nextId = 2;

const App = () => {
  const [tree, setTree] = useState(initialTree);

  const handleAddChild = (parentId) => {
    const addNode = (node) => {
      if (node.id === parentId) {
        node.children.push({ id: nextId, title: `Node ${nextId}`, children: [] });
        nextId++;
      } else {
        node.children.forEach(addNode);
      }
    };

    const newTree = JSON.parse(JSON.stringify(tree));
    addNode(newTree);
    setTree(newTree);
  };

  const handleDelete = (nodeId) => {
    const deleteNode = (node) => {
      const index = node.children.findIndex((child) => child.id === nodeId);
      if (index > -1) {
        node.children.splice(index, 1);
      } else {
        node.children.forEach(deleteNode);
      }
    };

    const newTree = JSON.parse(JSON.stringify(tree));
    deleteNode(newTree);
    setTree(newTree);
  };

  const handleEdit = (nodeId, newTitle) => {
    const editNode = (node) => {
      if (node.id === nodeId) {
        node.title = newTitle;
      } else {
        node.children.forEach(editNode);
      }
    };

    const newTree = JSON.parse(JSON.stringify(tree));
    editNode(newTree);
    setTree(newTree);
  };

  const handleReset = () => {
    setTree(initialTree);
    nextId = 2;
  };

  return (
      <div className="app-container">
        <TreeNode
            node={tree}
            onAddChild={handleAddChild}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onReset={handleReset}
        />
      </div>
  );
};

export default App;