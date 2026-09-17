import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  Share2, 
  X,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { BlogPost } from '../types';

interface InsightsViewProps {
  posts: BlogPost[];
  initialSlug?: string | null;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ posts, initialSlug }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    if (initialSlug) {
      return posts.find(p => p.slug === initialSlug) || null;
    }
    return null;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Investment Analysis', 'Legal & Documentation', 'Market Trends'];

  const filteredPosts = posts.filter(post => {
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      
      {/* Full Article Modal / View */}
      {selectedPost ? (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="space-y-3">
            <div className="flex items-center space-x-2.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                {selectedPost.category}
              </span>
              <span>&bull;</span>
              <span>{selectedPost.published_date}</span>
              <span>&bull;</span>
              <span>{selectedPost.read_time}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-brand-heading leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>By {selectedPost.author}</span>
              </div>

              <button
                onClick={() => handleShare(selectedPost)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300 space-y-4 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
            {selectedPost.content}
          </div>

          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-blue-900 dark:text-blue-200 text-xs sm:text-sm">
                Have questions regarding this market insight?
              </h4>
              <p className="text-[11px] sm:text-xs text-blue-700 dark:text-blue-400 mt-1">
                Consult with our Market Analysis Department senior analysts directly.
              </p>
            </div>

            <button
              onClick={() => {
                const text = `Hello Estate Shelters, I read your article "${selectedPost.title}" and would like to consult further.`;
                window.open(`https://wa.me/2347033385434?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0"
            >
              Consult MAD Analyst
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-12 sm:space-y-16 pb-12">
          {/* Main Feed Header */}
          <section className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=80" 
                alt="Real Estate Market Analysis & Research" 
                className="w-full h-full object-cover object-center transform scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/45 to-slate-900/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/50 backdrop-blur-[0.5px]" />
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 text-white">
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Research & Due Diligence
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-brand-heading leading-tight">
                Abuja Real Estate Market Insights
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
                In-depth research, cadastral title procedures, price forecasts, and investment strategies from Estate Shelters' Market Analysis Department.
              </p>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                        {post.category}
                      </span>
                      <span>{post.read_time}</span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span>{post.published_date}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center space-x-1">
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

    </div>
  );
};
