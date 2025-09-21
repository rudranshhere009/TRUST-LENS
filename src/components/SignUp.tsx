import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SignUpProps {
  onSignUpSuccess: (profile: {
    name: string;
    email: string;
    location: string;
    bio: string;
    photoUrl: string;
  }) => void;
  onSignUpError: (message: string) => void; // New prop for error handling
}

const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess, onSignUpError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      onSignUpError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      onSignUpError('Passwords do not match.');
      return;
    }

    // In a real application, you would send this data to a backend for user registration.
    // For this example, we'll simulate a successful signup and store user data locally.

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (storedUsers.some((user: any) => user.email === email)) {
      onSignUpError('An account with this email already exists. Please login or use a different email.');
      return;
    }

    const newUser = {
      email,
      password, // In a real app, hash this password!
      profile: {
        name,
        email,
        location,
        bio,
        photoUrl: '', // Default empty photo URL
      },
    };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    onSignUpSuccess(newUser.profile);
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div>
        <Label htmlFor="signup-name">Full Name</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <Input
          id="signup-confirm-password"
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-location">Location (Optional)</Label>
        <Input
          id="signup-location"
          type="text"
          placeholder="New York, USA"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="signup-bio">Bio (Optional)</Label>
        <Textarea
          id="signup-bio"
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-md shadow-lg shadow-green-500/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-green-500/70">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
