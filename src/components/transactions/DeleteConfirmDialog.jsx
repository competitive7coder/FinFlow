import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import useAppStore from '../../context/AppContext';

const DeleteConfirmDialog = ({ isOpen, onClose, txn }) => {
  const deleteTransaction = useAppStore((s) => s.deleteTransaction);

  const handleConfirm = () => {
    if (txn) deleteTransaction(txn.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Transaction" maxWidth="max-w-sm">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="p-3 rounded-full bg-rose-500/15">
            <AlertTriangle size={24} className="text-rose-400" />
          </div>
        </div>
        <div>
          <p className="text-slate-300 text-sm">
            Are you sure you want to delete{' '}
            <span className="text-white font-semibold">"{txn?.description}"</span>?
          </p>
          <p className="text-slate-500 text-xs mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button variant="danger" onClick={handleConfirm} className="flex-1">Delete</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmDialog;
