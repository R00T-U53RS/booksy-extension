import { useState } from 'react';
import { Eye, EyeOff, UserPlus, Mail, Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { google } from '@/assets/assets';
import { useLogin } from '@/hooks/useLogin';
import { RegisterFormData } from '@/components/types/login';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register: registerUser, isRegistering, registerError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  const handleGoogleLogin = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    localStorage.setItem('booksy_authenticated', 'true');
    localStorage.setItem('booksy_user_email', 'user@gmail.com');
    localStorage.setItem('booksy_login_method', 'google');
    localStorage.setItem('booksy_login_timestamp', Date.now().toString());
  };

  return (
    <div className='flex flex-col h-full py-6'>
      <div className='flex-1 flex flex-col justify-center max-w-sm mx-auto w-full'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <label
              htmlFor='username'
              className='text-sm font-medium text-foreground'
            >
              Username
            </label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                id='username'
                type='text'
                placeholder='Enter your username'
                {...register('username', { required: 'Username is required' })}
                className={cn(
                  'pl-10',
                  errors.username &&
                    'border-destructive focus-visible:ring-destructive/20'
                )}
                aria-invalid={!!errors.username}
              />
            </div>
            {errors.username && (
              <p className='text-sm text-destructive'>
                {errors.username.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium text-foreground'
            >
              Email
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
                className={cn(
                  'pl-10',
                  errors.email &&
                    'border-destructive focus-visible:ring-destructive/20'
                )}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className='text-sm text-destructive'>{errors.email.message}</p>
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
                {...register('password', { required: 'Password is required' })}
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
              <p className='text-sm text-destructive'>
                {errors.password.message}
              </p>
            )}
          </div>

          {registerError && (
            <div className='p-3 rounded-md bg-destructive/10 border border-destructive/20'>
              <p className='text-sm text-destructive'>
                {registerError?.message ||
                  'Registration failed. Please try again.'}
              </p>
            </div>
          )}

          <Button type='submit' className='w-full' disabled={isRegistering}>
            {isRegistering ? (
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                Creating account...
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <UserPlus className='w-4 h-4' />
                Create Account
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
          disabled={isRegistering}
        >
          {isRegistering ? (
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
              Creating account...
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

export default Register;
