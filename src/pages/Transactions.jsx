import React, { useState } from 'react';
import FilterBar from '../components/transactions/FilterBar';
import TransactionTable from '../components/transactions/TransactionTable';
import AddEditModal from '../components/transactions/AddEditModal';
import DeleteConfirmDialog from '../components/transactions/DeleteConfirmDialog';

const Transactions = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editTxn, setEditTxn] = useState(null);
  const [deleteTxn, setDeleteTxn] = useState(null);

  return (
    <div className="space-y-4 animate-fade-in">
      <FilterBar />
      <TransactionTable
        onAdd={() => setAddOpen(true)}
        onEdit={(txn) => setEditTxn(txn)}
        onDelete={(txn) => setDeleteTxn(txn)}
      />

      <AddEditModal
        isOpen={addOpen || !!editTxn}
        onClose={() => { setAddOpen(false); setEditTxn(null); }}
        editTxn={editTxn}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteTxn}
        onClose={() => setDeleteTxn(null)}
        txn={deleteTxn}
      />
    </div>
  );
};

export default Transactions;
