// Simple Blog Generator for Stellar Insights
// Run this script to generate blog pages from your content

const fs = require('fs');
const path = require('path');

// Blog configuration
const config = {
    siteName: "Stellar Insights",
    siteUrl: "https://yourdomain.com",
    blogPath: "./blog",
    postsPath: "./blog/posts",
    postsDataFile: "./blog-posts.json"
};

// Create directories if they don't exist
function createDirectories() {
    if (!fs.existsSync(config.blogPath)) {
        fs.mkdirSync(config.blogPath, { recursive: true });
    }
    if (!fs.existsSync(config.postsPath)) {
        fs.mkdirSync(config.postsPath, { recursive: true });
    }
}

// Blog post template
function createPostHTML(post) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - Stellar Insights Blog</title>
    <meta name="description" content="${post.excerpt}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }

        /* Header Styles */
        .header {
            background: linear-gradient(135deg, #006699 0%, #004d73 100%);
            color: white;
            padding: 0;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            text-decoration: none;
            color: white;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-menu a {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            transition: all 0.3s ease;
        }

        .nav-menu a:hover {
            background-color: rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }

        /* Main Content */
        .main-content {
            margin-top: 80px;
            min-height: calc(100vh - 80px);
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }

        /* Back to Blog Link */
        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: #006699;
            text-decoration: none;
            margin-bottom: 2rem;
            padding: 0.5rem 1rem;
            border: 2px solid #006699;
            border-radius: 25px;
            transition: all 0.3s ease;
        }

        .back-link:hover {
            background: #006699;
            color: white;
            transform: translateY(-2px);
        }

        /* Article Styles */
        .article {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 15px 40px rgba(0,102,153,0.15);
            margin-bottom: 3rem;
        }

        .article-header {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 2px solid #f0f8ff;
        }

        .article-category {
            background: #f0f8ff;
            color: #006699;
            padding: 0.4rem 1rem;
            border-radius: 15px;
            font-size: 0.9rem;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 1rem;
        }

        .article-title {
            font-size: 2.5rem;
            color: #006699;
            margin-bottom: 1rem;
            line-height: 1.3;
        }

        .article-meta {
            display: flex;
            gap: 2rem;
            color: #888;
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .article-excerpt {
            font-size: 1.2rem;
            color: #666;
            font-style: italic;
            line-height: 1.7;
        }

        .article-content {
            font-size: 1.1rem;
            line-height: 1.8;
        }

        .article-content h2 {
            color: #006699;
            font-size: 1.8rem;
            margin: 2rem 0 1rem 0;
        }

        .article-content h3 {
            color: #006699;
            font-size: 1.4rem;
            margin: 1.5rem 0 0.8rem 0;
        }

        .article-content p {
            margin-bottom: 1.5rem;
        }

        .article-content ul, .article-content ol {
            margin: 1rem 0 1.5rem 2rem;
        }

        .article-content li {
            margin-bottom: 0.5rem;
        }

        .article-content blockquote {
            background: #f0f8ff;
            border-left: 4px solid #99ccff;
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 0 10px 10px 0;
            font-style: italic;
        }

        /* Newsletter CTA */
        .newsletter-cta {
            background: linear-gradient(135deg, #006699 0%, #004d73 100%);
            color: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            margin: 3rem 0;
            box-shadow: 0 15px 35px rgba(0,102,153,0.2);
        }

        .newsletter-cta h3 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }

        .newsletter-cta p {
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        .cta-button {
            background: #ffcc00;
            color: #003d5c;
            padding: 1rem 2rem;
            border: none;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .cta-button:hover {
            background: #e6b800;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255,204,0,0.3);
        }

        /* Footer */
        .footer {
            background: #003d5c;
            color: white;
            text-align: center;
            padding: 3rem 2rem;
            margin-top: 4rem;
        }

        .footer p {
            margin-bottom: 1rem;
        }

        .footer a {
            color: #99ccff;
            text-decoration: none;
        }

        .footer a:hover {
            color: #ffcc00;
            text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .nav-container {
                padding: 1rem;
            }

            .container {
                padding: 1rem;
            }

            .article {
                padding: 2rem;
            }

            .article-title {
                font-size: 2rem;
            }

            .article-meta {
                flex-direction: column;
                gap: 0.5rem;
            }

            .newsletter-cta {
                padding: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav-container">
            <a href="../index.html" class="logo">Stellar Insights</a>
            <ul class="nav-menu">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../services.html">Services</a></li>
                <li><a href="../blog/index.html">Blog</a></li>
                <li><a href="../portfolio.html">Testimonials</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <a href="../blog/index.html" class="back-link">
                ← Back to Blog
            </a>

            <article class="article">
                <header class="article-header">
                    <span class="article-category">${post.category}</span>
                    <h1 class="article-title">${post.title}</h1>
                    <div class="article-meta">
                        <div class="meta-item">
                            <span>📅</span>
                            <span>${post.date}</span>
                        </div>
                        <div class="meta-item">
                            <span>⏱️</span>
                            <span>${post.readTime} min read</span>
                        </div>
                        <div class="meta-item">
                            <span>✍️</span>
                            <span>${post.author}</span>
                        </div>
                    </div>
                    <p class="article-excerpt">${post.excerpt}</p>
                </header>

                <div class="article-content">
                    ${post.content}
                </div>
            </article>

            <!-- Newsletter CTA -->
            <section class="newsletter-cta">
                <h3>Enjoyed this article?</h3>
                <p>Subscribe to our newsletter for more cosmic insights and exclusive astrology content delivered to your inbox.</p>
                <a href="../contact.html" class="cta-button">Subscribe Now</a>
            </section>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2025 Stellar Insights. All rights reserved.</p>
        <p>
            <a href="#">Privacy Policy</a> | 
            <a href="#">Terms of Service</a> | 
            <a href="../contact.html">Contact</a>
        </p>
    </footer>
</body>
</html>`;
}

// Blog index template
function createBlogIndexHTML(posts) {
    const featuredPost = posts[0];
    const regularPosts = posts.slice(1);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Astrology Blog - Stellar Insights | Latest Articles & Cosmic Wisdom</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }

        /* Header Styles */
        .header {
            background: linear-gradient(135deg, #006699 0%, #004d73 100%);
            color: white;
            padding: 0;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            text-decoration: none;
            color: white;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-menu a {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            transition: all 0.3s ease;
        }

        .nav-menu a:hover,
        .nav-menu a.active {
            background-color: rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }

        /* Main Content */
        .main-content {
            margin-top: 80px;
            min-height: calc(100vh - 80px);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        /* Page Header */
        .page-header {
            text-align: center;
            padding: 3rem 2rem;
            margin: 2rem 0;
            background: linear-gradient(135deg, #006699 0%, #004d73 100%);
            color: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,102,153,0.2);
        }

        .page-header h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .page-header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        /* Featured Article */
        .featured-article {
            background: white;
            border-radius: 20px;
            padding: 0;
            margin: 3rem 0;
            box-shadow: 0 15px 40px rgba(0,102,153,0.15);
            overflow: hidden;
            transition: all 0.4s ease;
        }

        .featured-article:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0,102,153,0.2);
        }

        .featured-image {
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, #99ccff 0%, #006699 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: white;
        }

        .featured-content {
            padding: 2.5rem;
        }

        .featured-badge {
            background: #ffcc00;
            color: #003d5c;
            padding: 0.3rem 1rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 1rem;
        }

        .featured-title {
            font-size: 2.2rem;
            color: #006699;
            margin-bottom: 1rem;
            line-height: 1.3;
        }

        .featured-excerpt {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.7;
        }

        .article-meta {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 1.5rem;
            color: #888;
            font-size: 0.9rem;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        /* Blog Grid */
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2.5rem;
            margin: 3rem 0;
        }

        .blog-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,102,153,0.1);
            transition: all 0.4s ease;
            position: relative;
        }

        .blog-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,102,153,0.2);
        }

        .blog-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(135deg, #99ccff, #006699);
            transform: scaleX(0);
            transition: transform 0.4s ease;
        }

        .blog-card:hover::before {
            transform: scaleX(1);
        }

        .blog-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #99ccff 0%, #66b3ff 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: white;
        }

        .blog-content {
            padding: 2rem;
        }

        .blog-category {
            background: #f0f8ff;
            color: #006699;
            padding: 0.3rem 0.8rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 1rem;
        }

        .blog-title {
            font-size: 1.4rem;
            color: #006699;
            margin-bottom: 1rem;
            line-height: 1.4;
        }

        .blog-excerpt {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .blog-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            color: #888;
            margin-bottom: 1.5rem;
        }

        .read-more {
            background: #ffcc00;
            color: #003d5c;
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .read-more:hover {
            background: #e6b800;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255,204,0,0.3);
        }

        /* Footer */
        .footer {
            background: #003d5c;
            color: white;
            text-align: center;
            padding: 3rem 2rem;
            margin-top: 4rem;
        }

        .footer p {
            margin-bottom: 1rem;
        }

        .footer a {
            color: #99ccff;
            text-decoration: none;
        }

        .footer a:hover {
            color: #ffcc00;
            text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .nav-container {
                padding: 1rem;
            }

            .container {
                padding: 1rem;
            }

            .page-header h1 {
                font-size: 2.2rem;
            }

            .blog-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .featured-content {
                padding: 2rem;
            }

            .featured-title {
                font-size: 1.8rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav-container">
            <a href="../index.html" class="logo">Stellar Insights</a>
            <ul class="nav-menu">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../services.html">Services</a></li>
                <li><a href="index.html" class="active">Blog</a></li>
                <li><a href="../portfolio.html">Testimonials</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <!-- Page Header -->
            <section class="page-header">
                <h1>Astrology Blog</h1>
                <p>Explore cosmic wisdom, celestial insights, and practical astrology guidance for your spiritual journey</p>
            </section>

            <!-- Featured Article -->
            <article class="featured-article">
                <div class="featured-image">${featuredPost.icon}</div>
                <div class="featured-content">
                    <span class="featured-badge">Featured</span>
                    <h2 class="featured-title">${featuredPost.title}</h2>
                    <div class="article-meta">
                        <div class="meta-item">
                            <span>📅</span>
                            <span>${featuredPost.date}</span>
                        </div>
                        <div class="meta-item">
                            <span>⏱️</span>
                            <span>${featuredPost.readTime} min read</span>
                        </div>
                        <div class="meta-item">
                            <span>🏷️</span>
                            <span>${featuredPost.category}</span>
                        </div>
                    </div>
                    <p class="featured-excerpt">${featuredPost.excerpt}</p>
                    <a href="posts/${featuredPost.slug}.html" class="read-more">Read Full Article</a>
                </div>
            </article>

            <!-- Blog Grid -->
            <div class="blog-grid">
                ${regularPosts.map(post => `
                <article class="blog-card">
                    <div class="blog-image">${post.icon}</div>
                    <div class="blog-content">
                        <span class="blog-category">${post.category}</span>
                        <h3 class="blog-title">${post.title}</h3>
                        <p class="blog-excerpt">${post.excerpt}</p>
                        <div class="blog-meta">
                            <span>${post.date}</span>
                            <span>${post.readTime} min read</span>
                        </div>
                        <a href="posts/${post.slug}.html" class="read-more">Read More</a>
                    </div>
                </article>
                `).join('')}
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2025 Stellar Insights. All rights reserved.</p>
        <p>
            <a href="#">Privacy Policy</a> | 
            <a href="#">Terms of Service</a> | 
            <a href="../contact.html">Contact</a>
        </p>
    </footer>
</body>
</html>`;
}

// Generate blog from posts data
function generateBlog() {
    console.log('🌟 Generating Stellar Insights Blog...');
    
    // Create directories
    createDirectories();
    
    // Read posts data
    let postsData;
    try {
        const postsContent = fs.readFileSync(config.postsDataFile, 'utf8');
        postsData = JSON.parse(postsContent);
    } catch (error) {
        console.log('📝 Creating sample blog posts file...');
        postsData = {
            posts: [
                {
                    slug: "mercury-retrograde-sagittarius-guide",
                    title: "Mercury Retrograde in Sagittarius: What You Need to Know",
                    excerpt: "As Mercury stations retrograde in the adventurous sign of Sagittarius, we're invited to revisit our beliefs, philosophies, and long-term goals. This cosmic event brings opportunities for deep reflection on our spiritual journey and educational pursuits.",
                    content: `<p>Mercury retrograde periods often get a bad reputation, but when this communication planet moves backward through Sagittarius, it offers us a unique opportunity for spiritual growth and philosophical reflection.</p>

<h2>Understanding Mercury Retrograde in Sagittarius</h2>

<p>Sagittarius is the sign of the seeker, the philosopher, and the eternal student. When Mercury retrogrades through this sign, we're called to examine our belief systems, question our assumptions, and potentially revise our understanding of truth itself.</p>

<h3>Key Themes During This Transit</h3>

<ul>
<li><strong>Revisiting Educational Goals:</strong> You might feel drawn to return to unfinished studies or reconsider your learning path</li>
<li><strong>Questioning Beliefs:</strong> Long-held philosophical or spiritual beliefs may come under scrutiny</li>
<li><strong>Travel Complications:</strong> Plans for long-distance travel may face delays or require revision</li>
<li><strong>Publishing and Communication:</strong> Writing projects or publishing endeavors may need revision</li>
</ul>

<h2>How to Navigate This Transit</h2>

<blockquote>
"The wise person learns from the mistakes of others; the fool learns from their own mistakes; but the truly enlightened learn from both." - Ancient Wisdom
</blockquote>

<p>Rather than fearing this retrograde period, embrace it as a time for:</p>

<h3>Spiritual Reflection</h3>
<p>Take time to meditate on your spiritual journey. What beliefs serve you? Which ones might be holding you back? This is an excellent time for journaling and deep contemplation.</p>

<h3>Educational Review</h3>
<p>Consider taking a course you've always wanted to try, or return to a subject that once fascinated you. Mercury retrograde in Sagittarius favors learning through review and repetition.</p>

<h3>Cultural Exploration</h3>
<p>Even if travel isn't possible, explore different cultures through books, documentaries, or virtual experiences. Sagittarius energy loves to expand horizons.</p>

<h2>Practical Tips for Each Zodiac Sign</h2>

<p>While Mercury retrograde affects everyone, each sign will experience this transit differently:</p>

<ul>
<li><strong>Fire Signs (Aries, Leo, Sagittarius):</strong> Focus on clarifying your long-term vision</li>
<li><strong>Earth Signs (Taurus, Virgo, Capricorn):</strong> Practical application of spiritual wisdom</li>
<li><strong>Air Signs (Gemini, Libra, Aquarius):</strong> Philosophical discussions and idea sharing</li>
<li><strong>Water Signs (Cancer, Scorpio, Pisces):</strong> Emotional integration of spiritual insights</li>
</ul>

<h2>Conclusion</h2>

<p>Mercury retrograde in Sagittarius is ultimately about wisdom - the kind that comes from experience, reflection, and the courage to question what we think we know. Use this time wisely, and you'll emerge with a clearer understanding of your path forward.</p>

<p>Remember, every ending is also a beginning. What beliefs are you ready to release, and what new understanding is waiting to be born?</p>`,
                    category: "Planetary Transits",
                    date: "December 13, 2024",
                    readTime: "8",
                    author: "Stellar Insights Team",
                    icon: "🌟"
                },
                {
                    slug: "january-2025-horoscope-new-year-energy",
                    title: "January 2025 Horoscope: New Year, New Cosmic Energy",
                    excerpt: "Discover what the stars have in store for each zodiac sign this January. With powerful planetary alignments and fresh lunar cycles, this month promises transformation and new beginnings.",
                    content: `<p>Welcome to 2025! As we step into this new year, the cosmos offers us powerful energies for transformation, growth, and new beginnings. January sets the tone for the entire year ahead.</p>

<h2>Major Planetary Influences This Month</h2>

<p>January 2025 brings several significant astrological events that will influence all signs:</p>

<h3>New Moon in Capricorn (January 1st)</h3>
<p>Starting the year with a New Moon in ambitious Capricorn sets the stage for practical goal-setting and structured growth. This is the perfect time to establish your intentions for 2025.</p>

<h3>Venus in Aquarius (January 2nd - 26th)</h3>
<p>Love takes on an innovative, friendship-focused energy. Relationships benefit from intellectual connection and shared humanitarian ideals.</p>

<h2>Sign-by-Sign Guidance</h2>

<h3>Aries (March 21 - April 19)</h3>
<p>Career ambitions take center stage this month. The Capricorn New Moon activates your professional sector, making this an excellent time for job interviews, promotions, or launching new business ventures.</p>

<h3>Taurus (April 20 - May 20)</h3>
<p>Higher learning and spiritual growth are highlighted. Consider enrolling in a course, planning travel, or exploring philosophical studies that expand your worldview.</p>

<h3>Gemini (May 21 - June 20)</h3>
<p>Transformation and shared resources come into focus. This is a powerful month for financial planning, investments, or deep psychological work.</p>

<h3>Cancer (June 21 - July 22)</h3>
<p>Partnerships and relationships take priority. Whether in business or romance, collaborative efforts flourish under this month's influences.</p>

<h3>Leo (July 23 - August 22)</h3>
<p>Health and daily routines require attention. Establish new habits that support your long-term wellbeing and productivity.</p
