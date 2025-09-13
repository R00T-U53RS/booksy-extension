import { useState } from 'react';
import { Eye, EyeOff, LogIn, Mail, Lock, Bookmark } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { google } from '@/assets/assets';
import {
  LoginProps,
  LoginFormData,
  LoginFormErrors,
} from '@/components/types/login';

const Login = ({ onLogin }: LoginProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): string[] => {
    const issues: string[] = [];

    if (password.length < 8) {
      issues.push('at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      issues.push('one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      issues.push('one lowercase letter');
    }
    if (!/\d/.test(password)) {
      issues.push('one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      issues.push('one special character');
    }

    return issues;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors: LoginFormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordIssues = validatePassword(formData.password);
      if (passwordIssues.length > 0) {
        newErrors.password = `Password must contain ${passwordIssues.join(', ')}`;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        localStorage.setItem('booksy_authenticated', 'true');
        localStorage.setItem('booksy_user_email', formData.email);
        localStorage.setItem('booksy_login_timestamp', Date.now().toString());

        onLogin();
      } catch (_error) {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      localStorage.setItem('booksy_authenticated', 'true');
      localStorage.setItem('booksy_user_email', 'user@gmail.com');
      localStorage.setItem('booksy_login_method', 'google');
      localStorage.setItem('booksy_login_timestamp', Date.now().toString());

      onLogin();
    } catch (_error) {
      setErrors({ general: 'Google login failed. Please try again.' });
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col h-[600px] w-[400px] bg-background p-6'>
      <div className='text-center mb-6'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
            <Bookmark className='w-6 h-6 text-primary-foreground' />
          </div>
          <h2 className='text-xl font-bold text-foreground'>Booksy</h2>
        </div>
        <h1 className='text-lg font-bold text-foreground mb-1'>Welcome Back</h1>
        <p className='text-muted-foreground text-sm'>
          Sign in to access your bookmarks
        </p>
      </div>

      <div className='flex-1 flex flex-col justify-center max-w-sm mx-auto w-full'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium text-foreground'
            >
              Email Address
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={cn(
                  'pl-10',
                  errors.email &&
                    'border-destructive focus-visible:ring-destructive/20'
                )}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className='text-sm text-destructive'>{errors.email}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='password'
              className='text-sm font-medium text-foreground'
            >
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                className={cn(
                  'pl-10 pr-10',
                  errors.password &&
                    'border-destructive focus-visible:ring-destructive/20'
                )}
                aria-invalid={!!errors.password}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
              >
                {showPassword ? (
                  <EyeOff className='w-4 h-4' />
                ) : (
                  <Eye className='w-4 h-4' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-sm text-destructive'>{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <div className='p-3 rounded-md bg-destructive/10 border border-destructive/20'>
              <p className='text-sm text-destructive'>{errors.general}</p>
            </div>
          )}

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                Signing in...
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <LogIn className='w-4 h-4' />
                Sign In
              </div>
            )}
          </Button>
        </form>

        <div className='relative my-4'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-border' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or</span>
          </div>
        </div>

        <Button
          type='button'
          variant='outline'
          className='w-full mb-4'
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
              Signing in...
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <img src={google} alt='Google' className='w-4 h-4' />
              Continue with Google
            </div>
          )}
        </Button>
      </div>

      <div className='text-center text-xs text-muted-foreground'>
        Join thousands of users who trust Booksy for bookmark management
      </div>
    </div>
  );
};

export default Login;
