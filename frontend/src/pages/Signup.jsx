import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password, phoneNumber, age);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone number" />
      <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age (optional)" />
      <button type="submit">Sign up</button>
    </form>
  );
}