import { useState } from 'react';

export default function UserForm({ user, onSubmit }) {
    const [form, setForm] = useState({ name: user.name || '', email: user.email || '', devRole: user.devRole || '' })
    const [busy, setBusy] = useState(false);
    const [localErr, setLocalErr] = useState(null);

    function updateField(k, v) {
        setForm(prev => ({ ...prev, [k]: v }));
    }

    function validate() {
        if (!form.name.trim()) return 'Name cannot be kept Empty.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email address!';
        if (!form.devRole.trim()) return 'Developer role cannot be empty.';
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLocalErr(null);
        const v = validate();
        if (v) {
            setLocalErr(v);
            return;
        }
        setBusy(true);
        try {
            await onSubmit(form);
        } finally {
            setBusy(flase);
        }
    }
    return (
         <form onSubmit={handleSubmit}>
      <h2 className="edit-user-title">Edit User</h2>


      {localErr && <div className="error">{localErr}</div>}

      <div className="field">
        <label>Name</label>
        <input
          value={form.name}
         onChange={(e) => {
  const value = e.target.value;

  //  only letters + spaces allowed
  if (/^[A-Za-z\s]*$/.test(value)) {
    updateField('name', value);
  }
}}
        />
      </div>

      <div className="field">
        <label>Email</label>
        <input
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
        />
      </div>

      <div className="field">
        <label>Developer-Role</label>
        <input
          value={form.devRole}
         onChange={(e) => {
  const value = e.target.value;

  //  only letters + spaces allowed
  if (/^[A-Za-z\s]*$/.test(value)) {
    updateField('devRole', value);
  }
}}
        />
      </div>

      <button type="submit" disabled={busy}>
        {busy ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
       
}