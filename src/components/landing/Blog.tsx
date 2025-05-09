import React from 'react';
import { motion } from 'framer-motion';
import { useBlog } from '../../hooks/landing/useBlog';
import SectionBadge from './shared/SectionBadge';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import { ArrowRight } from 'lucide-react';

const BlogCard: React.FC<{
  post: any;
  index: number;
}> = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden border border-blue-100/40"
    >
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
        <img 
          src={post.cover_image || "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&q=80&w=800&h=400"} 
          alt={post.title}
          className="w-full h-48 object-cover object-center"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{post.author} • {post.created_at}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <a 
          href={`/blog/${post.slug}`} 
          className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
        >
          <span>Preberi več</span>
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

const Blog: React.FC = () => {
  const { 
    isClient,
    translations, 
    publishedPosts, 
    formatPostDate,
    containerVariants,
    itemVariants,
    hasPosts
  } = useBlog();
  const { language } = useLanguageStore();
  
  // Get translated text with fallbacks
  const readMoreText = language === 'en' ? 'Read more' : 
                       language === 'it' ? 'Leggi di più' : 
                       'Preberi več';
  
  const comingSoonText = translations?.landing?.blog?.comingSoon || 
                         (language === 'en' ? 'Posts coming soon' : 
                          language === 'it' ? 'Post in arrivo' : 
                          'Objave prihajajo kmalu');
                          
  const comingSoonMessageText = translations?.landing?.blog?.comingSoonMessage || 
                               (language === 'en' ? 'We are currently preparing interesting content for you. Visit us again soon!' : 
                                language === 'it' ? 'Stiamo preparando contenuti interessanti per te. Visitaci presto!' : 
                                'Trenutno pripravljamo zanimive vsebine za vas. Obiščite nas kmalu!');
                                
  const viewAllText = translations?.landing?.blog?.viewAll || 
                     (language === 'en' ? 'View all posts' : 
                      language === 'it' ? 'Visualizza tutti i post' : 
                      'Oglej si vse objave');
  
  // Don't render on server side
  if (!isClient) return null;

  return (
    <section id="blog" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <SectionBadge
            icon="📝"
            text={translations?.landing?.blog?.badge || "Blog"}
          />
          
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {translations?.landing?.blog?.title || "Najnovejše objave"}
          </motion.h2>
          
          <motion.p 
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {translations?.landing?.blog?.subtitle || "Koristni nasveti za izboljšanje vašega spletnega ugleda"}
          </motion.p>
        </div>
        
        {hasPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publishedPosts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.id} post={{
                ...post,
                created_at: formatPostDate(post.created_at)
              }} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {comingSoonText}
            </h3>
            <p className="text-gray-600">
              {comingSoonMessageText}
            </p>
          </div>
        )}
        
        {hasPosts && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href="/blog" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;