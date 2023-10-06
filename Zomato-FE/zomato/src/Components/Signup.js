import React, { useState } from 'react';
import  { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../Style/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    user_first_name: '',
    user_last_name: '',
    user_email: '',
    user_password: '',
  });

  const { user_first_name, user_last_name, user_email, user_password } = formData;
  const history=useHistory();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/user/register', {
        user_first_name,
        user_last_name,
        user_email,
        user_password,
      });

      console.log(res.data);
      if (res.data.status === 200) {
              history.push('/Home');
              window.location.reload();
    } }
    catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className='form row-2'>
    <div className='signup col-md-6'>
      <h1 className='sign'>Signup</h1>
      <form  onSubmit={onSubmit}>
        <input
         className='firstname'
          type="text"
          placeholder="First Name"
          name="user_first_name"
          value={user_first_name}
          onChange={onChange}
        />
        <br/>
        <br/>
        <input
        className='lastname'
          type="text"
          placeholder="Last Name"
          name="user_last_name"
          value={user_last_name}
          onChange={onChange}
        />
        <br/>
        <br/>
        <input
        className='mail'
          type="email"
          placeholder="Email"
          name="user_email"
          value={user_email}
          onChange={onChange}
        />
        <br/>
        <br/>
        <input
        className='pass'
          type="password"
          placeholder="Password"
          name="user_password"
          value={user_password}
          onChange={onChange}
        />
        <br/>
        <br/>
        <button type="submit" className='sub'>Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default Signup;