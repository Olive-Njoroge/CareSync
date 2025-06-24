import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Signup = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    licenseNumber: '',
    specialization: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-semibold text-slate-800">
          Doctor Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700 font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Dr. John Smith"
                required
                className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="doctor@healthpal.com"
                required
                className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licenseNumber" className="text-slate-700 font-medium">
                Medical License
              </Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleChange('licenseNumber', e.target.value)}
                placeholder="MD123456"
                required
                className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-slate-700 font-medium">
                Specialization
              </Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => handleChange('specialization', e.target.value)}
                placeholder="Cardiology"
                required
                className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter password"
                required
                className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Confirm password"
                required
                className="h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Signup;