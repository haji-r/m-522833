
import React from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, UserRound, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About ShazBot</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We're committed to developing secure AI by keeping it completely offline, free from external influences, and intentionally designed to align with your company's specific needs.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    Founded in 2025, ShazBot aims to bridge the gap between AI and security by providing 
                    in-depth models centered specifically for your business, it learns and grows solely for you.
                  </p>
                  <p className="text-muted-foreground">
                    We believe that a secure AI and thoughtful technology can make the world better, and we're 
                    committed to sharing knowledge that helps make that possible.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Person working on design" 
                    className="rounded-lg shadow-lg w-full h-auto" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <BookOpen className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Knowledge Sharing</CardTitle>
                    <CardDescription>
                      We believe in the free exchange of ideas and insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We're committed to making valuable information accessible to everyone, 
                      regardless of their background or experience level.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <UserRound className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Human-Centered</CardTitle>
                    <CardDescription>
                      People come first in everything we do
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We focus on designing models and technology that can enhance human lives
                      and create positive experiences for users.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Info className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Integrity</CardTitle>
                    <CardDescription>
                      We're committed to honesty and transparency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our content is created with care and research, and we always 
                      cite our sources and acknowledge diverse perspectives.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Team Member 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src="../../../src/assets/images/jim-large.jpg"
                      alt="Jim Boekel" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl">Jim Boekel</h3>
                  <p className="text-primary mb-2">Founder & Chief Executive Officer</p>
                  <p className="text-muted-foreground text-sm">
                  Jim Boekel is a business, cybersecurity, and technology leader with a 25-year track record of delivering results. His career spans Defence, government, and industry, where he has led high-performing teams, scaled businesses, and built strategic initiatives that drive real-world impact.
                  </p>
                </div>
                
                {/* Team Member 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src="../../../src/assets/images/tom-large.jpg" 
                      alt="Tom Kazan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl">Tom Kazan</h3>
                  <p className="text-primary mb-2">Founder & Director</p>
                  <p className="text-muted-foreground text-sm">
                  Tom Kazan is a leader in relationship intelligence and human tradecraft, specialising in the intersection of human behaviour, security, and emerging technology. His career has been defined by one objective, understanding individuals. How they think, decide, and operate. How interactions create leverage, expose vulnerabilities, and dictate outcomes. His expertise is built on years of frontline experience in national security, intelligence, and high-stakes decision-making.
                  </p>
                </div>
                
                {/* Team Member 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src="../../../src/assets/images/adam-large.png"
                      alt="Adam Haskard" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl">Adam Haskard</h3>
                  <p className="text-primary mb-2">Founder & Director</p>
                  <p className="text-muted-foreground text-sm">
                  Adam Haskard operates at the intersection of cybersecurity, robotics, and emerging technology, specialising in securing complex cyber-physical systems. His career spans Defence, industry, and academia, with a focus on delivering practical, high-impact solutions that enhance security and resilience in contested environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-muted-foreground mb-8">
                Connect with fellow engineers, designers, researchers, and technology enthusiasts who share your passion for 
                innovation and creativity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="mr-2 h-4 w-4" />
                  <Link to="/community">Explore Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
