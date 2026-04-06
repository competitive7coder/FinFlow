import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import useAppStore from '../../context/AppContext';
import { categories, statusOptions } from '../../data/mockData';

const defaultForm = {
  date: '',
  description: '',
  category: 'Food',
  type: 'Expense',
  amount: '',
  status: 'Completed',
};

const AddEditModal = ({ isOpen, onClose, editTxn = null }) => {
  const { addTransaction, editTransaction } = useAppStore();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(editTxn ? { ...editTxn, amount: String(editTxn.amount) } : defaultForm);
      setErrors({});
    }
  }, [isOpen, editTxn]);

  const validate = () => {
    const e = {};
    if (!form.date) e.date = 'Date is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Valid amount required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const txn = { ...form, amount: Number(form.amount) };
    if (editTxn) {
      editTransaction(editTxn.id, txn);
    } else {
      addTransaction(txn);
    }
    onClose();
  };

  const field = (label, key, type = 'text', rest = {}) => (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className={`w-full bg-slate-900/60 border rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all
          ${errors[key] ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-700 focus:border-emerald-500/50 focus:ring-emerald-500/20'}`}
        {...rest}
      />
      {errors[key] && <p className="text-rose-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  const select = (label, key, options) => (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      <select
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editTxn ? 'Edit Transaction' : 'Add Transaction'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {field('Date', 'date', 'date')}
          {field('Amount (₹)', 'amount', 'number', { placeholder: '0', min: '1' })}
        </div>
        {field('Description', 'description', 'text', { placeholder: 'e.g. Monthly Salary, Grocery...' })}
        <div className="grid grid-cols-2 gap-3">
          {select('Category', 'category', categories)}
          {select('Type', 'type', ['Income', 'Expense'])}
        </div>
        {select('Status', 'status', statusOptions)}
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            {editTxn ? 'Update' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditModal;
