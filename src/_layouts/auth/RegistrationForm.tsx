// RegistrationForm.js
import { useState } from 'react';
import { Button, Form, Input } from './LoginForm';

const RegistrationForm = () => {
  const [input, setInput] = useState({
    uname: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Your registration logic here
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <Form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Username"
          name="uname"
          value={input.uname}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={input.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          placeholder="Phone number"
          name="phone"
          value={input.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Register</Button>
      </Form>
    </>
  );
};

export default RegistrationForm;
