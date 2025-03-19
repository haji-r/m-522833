
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Clock, Eye, Users, Server } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              At ShazBot, we value your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website 
              or use our services.
            </p>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Information We Collect</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                We collect information that you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, fill out a form, or communicate with us. This information may include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Personal identifiers (name, email address)</li>
                <li>Account credentials</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
              <p className="mt-4">
                We also automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Providing and maintaining our services</li>
                <li>Improving and personalizing user experience</li>
                <li>Communicating with you about our services</li>
                <li>Sending periodic emails and newsletters</li>
                <li>Responding to your inquiries and requests</li>
                <li>Monitoring and analyzing usage patterns</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Information Sharing</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as described below:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>With service providers who perform functions on our behalf</li>
                <li>If required by law or to protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Data Security</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information. 
                However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
                and updating the "Last updated" date at the top of this policy. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-md mt-4">
                <p><strong>Email:</strong> privacy@thejournal.com</p>
                <p><strong>Address:</strong> 123 Publishing Street, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
