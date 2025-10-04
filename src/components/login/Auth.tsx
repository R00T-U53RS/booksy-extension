import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bookmark } from 'lucide-react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  return (
    <div className='flex flex-col h-[600px] w-[400px] bg-background'>
      <div className='p-6 pb-4'>
        <div className='flex items-center justify-center gap-2 mb-6'>
          <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
            <Bookmark className='w-6 h-6 text-primary-foreground' />
          </div>
          <h2 className='text-xl font-bold text-foreground'>Booksy</h2>
        </div>

        <Tabs defaultValue='login' className='flex-1 flex flex-col'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='login'>Login</TabsTrigger>
            <TabsTrigger value='register'>Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value='login' className='flex-1 m-0'>
            <Login />
          </TabsContent>

          <TabsContent value='register' className='flex-1 m-0'>
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
