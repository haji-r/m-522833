
import React, { useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthProvider";
import { useSignInUserMutation, useLazyFetchMeQuery } from "../services/users";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Define the form validation schema
const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters.' }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignIn: React.FC = () => {
  // Initialize the form
  const navigate = useNavigate();
  const { user, signin, accessToken } = useContext(AuthContext);
  const [ signInUser, {data, error, isLoading} ] = useSignInUserMutation();
  const [ fetchMe, {}] = useLazyFetchMeQuery();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data: SignInFormValues) => {
    // Here you would typically handle the actual signin process
    var bodyFormData = new FormData();
    bodyFormData.append('username', data.email);
    bodyFormData.append('password', data.password);
    try {
      signInUser(bodyFormData).then(response => {
        const responseData = response.data;
        localStorage.setItem('accessToken', responseData.access_token);

        fetchMe().then(response => {

          if(response.error && response.error.status == 401) {
            localStorage.removeItem('accessToken');
            navigate("/sign-in");
            return
          }

          localStorage.setItem('user', JSON.stringify(response.data));
          toast.success('Sign in successful!', {
            description: `Welcome back, ${response.data.first_name}`,
          });

          setTimeout(() => {
            signin(response.data.access_token, confirm);
          }, 1000);
        })

      });
    } catch (error) {
      console.info(error)
    }    
  };

  const confirm = () => {
    window.location.href = '/shazbot';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container flex items-center justify-center py-8 md:mt-20 md:mb-20">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            { error && (
              <CardDescription className="text-center">
                { error.data.detail }
              </CardDescription>
            )}

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-[var(--muted)]">
                Don't have an account?{' '}
                <Link to="/sign-up" className="underline text-primary hover:text-primary/80">
                  Sign Up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
