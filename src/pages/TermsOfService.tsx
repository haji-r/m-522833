
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Check, AlertTriangle, ExternalLink, Scale, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Welcome to ShazBot. By accessing our website, you agree to be bound by these Terms of Service.
              Please read them carefully before using our services.
            </p>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                If you do not agree with any part of these terms, you may not access or use our services.
              </p>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <ExternalLink className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Use of Our Services</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                You may use our services only as permitted by these terms and any applicable laws or regulations. 
                Our services may change from time to time without prior notice.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Acceptable Use
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Access content for personal, non-commercial use</li>
                      <li>Share content using our sharing features</li>
                      <li>Post comments that comply with our guidelines</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      Prohibited Use
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Reproduce or distribute content without permission</li>
                      <li>Use automated systems to access our services</li>
                      <li>Post harmful, offensive, or illegal content</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Intellectual Property</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                The content on our website, including text, graphics, logos, icons, images, audio clips, digital downloads, and data compilations, 
                is the property of ShazBot or its content suppliers and is protected by international copyright laws. 
              </p>
              <p className="mt-4">
                You may not use, reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, 
                store, or transmit any of the material on our website, except as follows:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Your computer may temporarily store copies of such materials incidental to your accessing and viewing those materials.</li>
                <li>You may store files that are automatically cached by your web browser for display enhancement purposes.</li>
                <li>If we provide desktop, mobile, or other applications for download, you may download a single copy to your computer or mobile device.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">User Contributions</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                Our website may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin boards, and other interactive features 
                that allow users to post, submit, publish, display, or transmit content or materials.
              </p>
              <p className="mt-4">
                All user contributions must comply with the content standards set out in these Terms of Service. Any contribution you post to the site will be 
                considered non-confidential and non-proprietary. By providing any user contribution, you grant us and our affiliates and service providers the 
                right to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material.
              </p>
            </section>
            
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Disclaimers and Limitations of Liability</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. 
                CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. SHAZBOT AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME.
              </p>
              <p className="mt-4">
                SHAZBOT AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, 
                SOFTWARE, PRODUCTS, SERVICES, AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH 
                INFORMATION, SOFTWARE, PRODUCTS, SERVICES, AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND.
              </p>
            </section>
            
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Contact Information</h2>
              </div>
              <Separator className="mb-4" />
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-md mt-4">
                <p><strong>Email:</strong> terms@thejournal.com</p>
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

export default TermsOfService;
