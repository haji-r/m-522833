
import React from 'react';
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
import { useLazyFetchUserQuery, useCreateUserMutation } from '../services/users';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Define the form validation schema
const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' })
    .max(50, { message: 'First name must not exceed 50 characters.' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' })
    .max(50, { message: 'Last name must not exceed 50 characters.' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const [ createUser, {data, error, isLoading} ] = useCreateUserMutation();

  // Initialize the form
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data: SignUpFormValues) => {
    const formParams = {
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      email: data.email,
      role: 'user',
      avatar: ''
    }
    try {
      await createUser(formParams).then((response) => {
        if (response?.data) {
          toast.success('Account created successfully!', {
            description: `Welcome, ${data.firstName}! Your account has been created.`,
          });      
        }
      });
    } catch (error) {
      console.error(error)
    }
  };

  if(isLoading) {
    toast.success('Validating information!', {
      description: "We're validating your information...",
    });
  };

  if(error) {
    toast.success('Error sign up!', {
      description: "Encountered an error while creating your account.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container flex items-center justify-center py-8 md:mt-20 md:mb-20">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
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
                        <FormDescription>
                          Password must be at least 4 characters with uppercase, lowercase and numbers.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-[var(--muted)]">
                Already have an account?{' '}
                <Link to="/sign-in" className="underline text-primary hover:text-primary/80">
                  Sign in
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

export default SignUp;
