import React from 'react';

const AboutUs = () => {
  return (
    <main className="min-h-scre bg-white px-6 py-30 md:px-20 lg:px-40">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            About Us
          </h1>
          {/* Decorative Underline */}
          <div className="h-1 w-32 bg-red-100 rounded-full">
            <div className="h-1 w-16 bg-red-500 rounded-full"></div>
          </div>
        </div>
 
        {/* Content Section */}
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, ad? Non animi facere vero nostrum 
            qui repudiandae, nihil recusandae amet quisquam dicta quos, praesentium ipsam libero distinctio 
            ea, atque deleniti? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio rerum 
            modi, velit iusto fuga necessitatibus dicta molestias facere numquam natus quibusdam, error sunt. 
            Eveniet iure modi est recusandae, quasi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Amet, quae. Atque accusamus explicabo perferendis at illum laudantium eos velit cumque vero, odio 
            illo ipsum hic earum alias cupiditate minima a!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, ad? Non animi facere vero nostrum 
            qui repudiandae, nihil recusandae amet quisquam dicta quos, praesentium ipsam libero distinctio 
            ea, atque deleniti? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio rerum 
            modi, velit iusto fuga necessitatibus dicta molestias facere numquam natus quibusdam, error sunt. 
            Eveniet iure modi est recusandae, quasi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Amet, quae. Atque accusamus explicabo perferendis at illum laudantium eos velit cumque vero, odio 
            illo ipsum hic earum alias cupiditate minima a!
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;