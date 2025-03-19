
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent. We'll get back to you soon!");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">    
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  Have questions about our content or interested in collaboration? 
                  We'd love to hear from you. Fill out the form or reach out directly 
                  using the contact information below.
                </p>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Email Us</CardTitle>
                      <CardDescription>contact@shazbot.com</CardDescription>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Call Us</CardTitle>
                      <CardDescription>02 6183 6567</CardDescription>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Office Location</CardTitle>
                      <CardDescription>9/26 IPSWICH STREET, FYSHWICK ACT AUSTRALIA 2609</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    We'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="min-h-[120px]"
                        placeholder="What would you like to tell us?"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
