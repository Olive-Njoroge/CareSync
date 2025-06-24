import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Login = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1000);
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-semibold text-slate-800">
          Doctor Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@healthpal.com"
              required
              className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Register here
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;