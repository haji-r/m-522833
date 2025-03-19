
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ChartBar, Download, MoveRight, Search } from "lucide-react";

const RESEARCH_PAPERS = [
  {
    title: "The Impact of Design Systems on User Experience",
    authors: "Dr. Samantha Chen, Michael Robertson",
    date: "June 2023",
    abstract: "This study examines how design systems influence user experience across digital platforms. We analyze 50 websites before and after implementing cohesive design systems.",
    category: "UX Design",
    icon: <Book className="h-5 w-5" />
  },
  {
    title: "Interactive Data Visualization Techniques for Complex Datasets",
    authors: "Dr. James Wilson, Emma Thompson, Ph.D.",
    date: "October 2023",
    abstract: "Our research explores innovative approaches to visualizing multi-dimensional data. We present three new techniques for making complex data more accessible.",
    category: "Data Visualization",
    icon: <ChartBar className="h-5 w-5" />
  },
  {
    title: "User Behavior Analysis: Patterns and Insights from E-commerce Platforms",
    authors: "Dr. Aisha Johnson, David Park",
    date: "January 2024",
    abstract: "This paper presents findings from a comprehensive analysis of user behavior on leading e-commerce platforms, revealing key patterns in browsing and purchasing habits.",
    category: "User Behavior",
    icon: <Search className="h-5 w-5" />
  }
];

const RESEARCH_STATS = [
  { label: "Research Papers", value: "35+" },
  { label: "Case Studies", value: "24" },
  { label: "Research Partners", value: "12" },
  { label: "Years of Research", value: "8" }
];

const Research = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Research & Insights
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed max-w-2xl">
              Explore our latest research on design, technology, and user experience. We regularly publish findings from our projects and academic collaborations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
                Latest Research
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Research Archive
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl shadow-lg p-8">
          {RESEARCH_STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Research */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Research</h2>
          <p className="text-lg text-gray-600">
            Our team conducts research across various areas of design and technology. 
            Here are some of our recent publications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESEARCH_PAPERS.map((paper, index) => (
            <Card key={index} className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {paper.category}
                  </span>
                  {paper.icon}
                </div>
                <CardTitle className="text-xl">{paper.title}</CardTitle>
                <CardDescription className="text-sm">
                  {paper.authors} • {paper.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">{paper.abstract}</p>
                <div className="flex items-center text-primary font-medium">
                  <span>Read Full Paper</span>
                  <MoveRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="gap-2">
            View All Research Papers
            <MoveRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 md:p-12 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Download Our Research Framework</h2>
                <p className="text-gray-600 mb-6">
                  Get access to our comprehensive research methodology framework. 
                  Ideal for researchers, designers and product teams.
                </p>
                <Button className="gap-2">
                  Download PDF
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
                  alt="Research Framework" 
                  className="rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
