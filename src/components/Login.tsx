import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginProps {
  onLoginSuccess: (profile: {
    name: string;
    email: string;
    location: string;
    bio: string;
    photoUrl: string;
  }) => void;
  onLoginError: (message: string) => void; // New prop for error handling
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onLoginError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      onLoginError('Please fill in all fields.');
      return;
    }

    // In a real application, you would send these credentials to a backend for authentication.
    // For this example, we'll check against locally stored user data.
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find(
      (user: any) => user.email === email && user.password === password
    );

    if (foundUser) {
      onLoginSuccess(foundUser.profile); // Use the stored user's full profile
    } else {
      onLoginError('Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="test@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-md shadow-lg shadow-green-500/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-green-500/70">
        Login
      </Button>
    </form>
  );
};

export default Login;
