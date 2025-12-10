import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    role: 'receiver', // Default role
  });

  const navigate = useNavigate();

  const { name, email, password, city, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', formData);
      
      // Save the token immediately so they are logged in
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data)); // Save name/email for later
      
      alert('Registration Successful!');
      navigate('/'); // Go to Dashboard
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <input 
          type="text" placeholder="Full Name" name="name" 
          value={name} onChange={handleChange} required 
        />
        
        <input 
          type="email" placeholder="Email Address" name="email" 
          value={email} onChange={handleChange} required 
        />
        
        <input 
          type="password" placeholder="Password" name="password" 
          value={password} onChange={handleChange} required 
        />
        
        <input 
          type="text" placeholder="City" name="city" 
          value={city} onChange={handleChange} required 
        />
        
        <select name="role" value={role} onChange={handleChange}>
          <option value="receiver">I need help (Receiver)</option>
          <option value="helper">I want to help (Helper)</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;