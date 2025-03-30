
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsDatabase from '@/components/products/ProductsDatabase';

const Products = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-tutor-gray max-w-3xl">
          EduNova offers a range of educational products designed to enhance learning experiences for Ethiopian students.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-tutor-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tutor-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Tutor</h3>
                <p className="text-tutor-gray mb-4">Personalized learning with our AI tutor that adapts to each student's needs and learning style.</p>
                <Button variant="link" className="p-0 h-auto text-tutor-orange">Learn more</Button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-tutor-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tutor-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital Textbooks</h3>
                <p className="text-tutor-gray mb-4">Interactive digital textbooks aligned with the Ethiopian curriculum for grades 7-12.</p>
                <Button variant="link" className="p-0 h-auto text-tutor-orange">Learn more</Button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Practice Tests</h3>
                <p className="text-tutor-gray mb-4">Comprehensive practice tests and assessments for national exams preparation.</p>
                <Button variant="link" className="p-0 h-auto text-tutor-orange">Learn more</Button>
              </div>
            </div>
            
            <div className="bg-tutor-beige/30 rounded-xl p-8 border border-tutor-beige">
              <h2 className="text-2xl font-bold mb-4">Enterprise Solutions</h2>
              <p className="text-tutor-gray mb-6">Custom educational solutions for schools and educational institutions throughout Ethiopia.</p>
              <Button>Contact Sales</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="database">
            <ProductsDatabase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Products;
