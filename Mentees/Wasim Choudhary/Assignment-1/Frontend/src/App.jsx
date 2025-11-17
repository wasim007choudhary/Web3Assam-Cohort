import { useEffect, useState } from 'react';
import { fetchUser, updateUser } from './api/api';
import UserForm from './components/UserForm';
import UserView from './components/UserView';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const data = await fetchUser();
      setUser(data)
    } catch (e) {
      setErr(e.message || 'Loading failed, Please Try Again!');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(payload) {
    setErr(null);
    setSuccess(null);
    try {
      const res = await updateUser(payload);
      setSuccess('Successfully Updated!');
      await load();

      setTimeout(() => setSuccess(null, 3500));
    } catch (e) {
      setErr(e.message);
    }
    
  }

  useEffect(() => {
    load();
  }, []);

  return (
   <div className="container"> 
      <h1>Web3Assam Winter-Cohart2025 Assignment-1</h1>
     
      {loading && <p>Loading user...</p>}
      {err && <div className="error">Error: {err}</div>}
      {success && <div className="success">{success}</div>}

      {!loading && user && (
        <>
          <UserView user={user} />
              <div className="divider"></div>
          <UserForm user={user} onSubmit={handleUpdate} />
        </>
      )}
    </div>
  );
}