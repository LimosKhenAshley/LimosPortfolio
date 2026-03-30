document.addEventListener('DOMContentLoaded', function () {

  /* ── DOM refs ───────────────────────────────────── */
  const postsGrid       = document.getElementById('postsGrid');
  const fullPost        = document.getElementById('fullPost');
  const fullPostContent = document.getElementById('fullPostContent');
  const backButton      = document.getElementById('backButton');
  const backToTopBtn    = document.getElementById('backToTop');

  /* ── Post data ──────────────────────────────────── */
  const postsData = {
    post1: {
      title: 'Building CommUnity Hub',
      date: 'December 12, 2024',
      readTime: '5-10 min read',
      category: 'System',
      content: `
        <img src="images/CommUnity Hub Dashboard.png" alt="Dashboard" class="modal-image">
        <h1 class="modal-title">Building CommUnity Hub</h1>
        <span class="modal-date">Published on December 12, 2024 • 5-10 min read</span>
        <div class="modal-text">
          <p>As someone deeply interested in solving real-world problems through software, I wanted to create a system that not only sharpened my skills but also addressed genuine community needs. That's when the idea of <strong>CommUnityHub</strong> was born—a centralized platform to digitize and streamline barangay operations.</p>
          <h2>The Vision</h2>
          <p>The inspiration came from observing how many local barangays still rely on manual logs, handwritten certificates, and scattered documentation. I envisioned <strong>CommUnityHub</strong> as a smart barangay management system—one that could help barangay officials manage residents, issue documents, track payments, generate reports, and more, all in one place.</p>
          <img src="https://media.istockphoto.com/id/1366266940/vector/city-hall-vector-building.jpg?s=612x612&w=0&k=20&c=GCJlmEJ8NQYDf3uIfPizKhOk2TCBDmDkSQ9_zRWNdcI=" alt="Barangay Image" style="width:100%;max-height:300px;object-fit:cover;border-radius:4px;margin:15px 0;">
          <h2>Laying the Foundation</h2>
          <p>I chose <strong>.NET MAUI</strong> for its cross-platform capabilities, enabling the system to run on both Windows and Android, with future scalability in mind. I connected the application to a <strong>SQL database</strong>, ensuring data persistence and structured storage. From the very start, I made design decisions such as:</p>
          <ul>
            <li>Using a ContentPage structure for modular, maintainable pages.</li>
            <li>Implementing a login system with roles (e.g., Super Admin, Barangay Secretary) to control access and permissions.</li>
            <li>Displaying user-specific dashboards with dynamic data like document counts, recent activities, and resident demographics.</li>
          </ul><br>
          <h2>Resident Management & Search Functionality</h2>
          <p>One of the core features was <strong>Resident Management</strong>. I built a searchable, paginated list where officials can add, edit, or remove residents. The search could filter residents by first name, middle initial, last name, or ID. The data model included demographic details like gender, civil status, age, and contact information.</p>
          <h2>Document Generation</h2>
          <p>CommUnityHub automates the creation of:</p>
          <ul>
            <li><strong>Certificate of Residency</strong></li>
            <li><strong>Barangay Clearance</strong></li>
            <li><strong>Business Permits</strong></li>
            <li><strong>Barangay Ordinances</strong></li>
          </ul>
          <p>Instead of filling out forms manually, officials select a resident, and the system autofills their data into a <strong>PDF document</strong>. I chose <strong>PDFSharp</strong> to generate these documents, keeping the system lightweight and license-free. Each document has its own table in the database, storing resident names and a binary copy of the generated PDF for record-keeping and later retrieval.</p>
          <h2>Payment Processing</h2>
          <p>I added a <strong>Payment Processing Page</strong> where users could track payments for document processing. The system records:</p>
          <ul>
            <li>Document Name</li>
            <li>Payment Amount</li>
            <li>Due Date</li>
            <li>Payment Status (Paid, Unpaid)</li>
          </ul>
          <p>This allows transparency and helps the barangay maintain accountability.</p>
          <h2>Dashboards, Reports, and Charts</h2>
          <p>The <strong>DashBoardPage</strong> acts as the main hub after login. It features:</p>
          <ul>
            <li><strong>Real-time</strong> stats for total residents and document summaries</li>
            <li><strong>Charts</strong> showing gender and age group distribution</li>
            <li><strong>Recent activities</strong> such as logins, document creations, and updates</li>
            <li><strong>Barangay officials</strong> listed with hardcoded values in XAML for simplicity</li>
          </ul>
          <p>Later, I added a <strong>report generation tool</strong> to track daily, monthly, and yearly transactions.</p>
          <h2>Events & Emergency Hotlines</h2>
          <p>To make the app more community-centric, I included:</p>
          <ul>
            <li>A <strong>calendar view</strong> to manage barangay events</li>
            <li>An <strong>emergency hotline section</strong> for residents to see and message local authorities during crises</li>
          </ul><br>
          <h2>User Profiles and Logs</h2>
          <p>Each user has a profile page showing their information and allowing updates. I implemented user logging for every login and activity—useful for transparency and audits.</p>
          <h2>Offline-Ready and Future-Proof</h2>
          <p>Understanding that barangays may have limited internet access, I designed CommUnityHub to <strong>work fully offline</strong>, syncing only when needed.</p><br>
          <h2>Challenges and Learnings</h2>
          <p>Some challenges I tackled along the way:</p>
          <ul>
            <li>Preventing document issuance for residents with blotter records</li>
            <li>Creating a consistent UI across pages</li>
            <li>Managing performance as the resident list grew (hence, pagination)</li>
          </ul><br>
          <h2>Final Thoughts</h2>
          <p>CommUnityHub isn't just a school project—it's a vision for how local governance can embrace technology. This project deepened my understanding of how technology can directly impact communities.</p>
        </div>
      `
    },
    post2: {
      title: "AI Is Not a Threat—It's a Tool We're Misusing",
      date: 'May 31, 2025',
      readTime: '8 min read',
      category: 'AI',
      content: `
        <img src="images/AI teach.png" class="modal-image">
        <h1 class="modal-title">AI Is Not a Threat—It's a Tool We're Misusing</h1>
        <span class="modal-date">Published on May 31, 2025 • 8 min read</span>
        <div class="modal-text">
          <p>Artificial Intelligence (AI) has been a buzzword for years, but its recent advancements have sparked both excitement and fear. Many people worry that AI will take over jobs, make decisions for us, or even become uncontrollable. But what if I told you that AI is not the problem? The real issue lies in how we use it.</p>
          <p>As a software developer, I see AI as a powerful tool that can enhance our capabilities, not replace them. The key is to understand that AI is just a tool—like a hammer or a computer. It's how we wield it that determines its impact.</p>
          <h2>AI as a Tool, Not a Threat</h2>
          <p>Think about it: a hammer can build a house or destroy one. Similarly, AI can be used for good or ill, depending on our intentions. The real question is: how are we using AI?</p>
          <p>In my experience, AI can automate mundane tasks, analyze vast amounts of data, and even assist in creative processes. For example, AI can help developers write code faster by suggesting snippets or debugging issues.</p>
          <h2>Misuse of AI</h2>
          <p>However, the misuse of AI is where the real danger lies. When we rely on AI to make decisions without human oversight, we risk creating systems that are biased, opaque, or even harmful.</p>
          <ul>
            <li><strong>Bias in AI:</strong> If AI systems are trained on biased data, they will produce biased outcomes.</li>
            <li><strong>Privacy Concerns:</strong> AI systems often require vast amounts of data, raising concerns about user privacy.</li>
            <li><strong>Lack of Transparency:</strong> Many AI algorithms are "black boxes," meaning we don't fully understand how they make decisions.</li>
            <li><strong>Over-reliance on AI:</strong> Relying too heavily on AI can lead to a loss of critical thinking skills.</li>
          </ul>
          <p>These issues highlight the importance of responsible AI development and usage.</p>
          <img src="images/Learning.png" alt="Good AI" style="width:100%;max-height:300px;object-fit:cover;border-radius:4px;margin:15px 0;">
          <p class="image-caption">AI in Good Use</p>
          <h2>Embracing AI Responsibly</h2>
          <p>To harness the power of AI without falling into its traps, we need to embrace it responsibly. Here are some principles to guide us:</p>
          <ul>
            <li><strong>Human Oversight:</strong> Always have a human in the loop.</li>
            <li><strong>Transparency:</strong> Strive for transparency in AI algorithms.</li>
            <li><strong>Ethical Considerations:</strong> Consider the ethical implications of AI applications.</li>
            <li><strong>Continuous Learning:</strong> Stay informed about AI advancements and their implications.</li>
          </ul>
          <h2>Final Thoughts</h2>
          <p>AI is not a threat; it's a tool that can empower us if used wisely. By embracing AI with caution and ethical considerations, we can unlock its full potential while minimizing risks.</p>
          <p>Let's not fear AI; let's learn to use it responsibly. After all, the future of AI is in our hands.</p>
        </div>
      `
    },
    post3: {
      title: 'College Life',
      date: 'May 31, 2025',
      readTime: '6 min read',
      category: 'College',
      content: `
        <img src="images/ITP2.jpg" class="modal-image">
        <h1 class="modal-title">College Life</h1>
        <span class="modal-date">Published on May 31, 2025 • 6 min read</span>
        <div class="modal-text">
          <p>College life is a unique blend of challenges and opportunities that shape us into who we are. As I reflect on my journey, I realize how much I've grown, not just academically but also personally.</p>
          <h2>Academic Challenges</h2>
          <p>Balancing coursework, projects, and exams can be overwhelming. There were times when I felt lost, especially during midterms. But these challenges taught me time management and the importance of seeking help when needed.</p>
          <ul>
            <li>Late nights studying for exams</li>
            <li>Group projects that tested my teamwork skills</li>
            <li>Learning to adapt to different teaching styles</li>
          </ul>
          <p>Each challenge pushed me to develop resilience and problem-solving skills.</p>
          <h2>Social Connections</h2>
          <p>College is also about building relationships. From late-night study sessions to weekend hangouts, these moments have created lasting friendships.</p>
          <ul>
            <li>Joining clubs and organizations</li>
            <li>Attending campus events and workshops</li>
            <li>Networking with professors and industry professionals</li>
          </ul>
          <img src="images/Coding in the Library.png" alt="College Students" style="width:100%;max-height:300px;object-fit:cover;border-radius:4px;margin:15px 0;">
          <p class="image-caption">College Students Studying Together</p>
          <h2>Personal Growth</h2>
          <p>College has been a journey of self-discovery. I've learned to step out of my comfort zone, whether it was giving presentations, participating in debates, or leading group projects.</p>
          <ul>
            <li>Overcoming stage fright during presentations</li>
            <li>Learning to accept constructive criticism</li>
            <li>Setting and achieving personal goals</li>
          </ul>
          <h2>Looking Ahead</h2>
          <p>As I approach graduation, I feel a mix of excitement and anxiety about the future. College has prepared me for the real world, but the uncertainty ahead is daunting. However, I am confident that the skills and experiences I've gained will guide me through whatever comes next.</p>
        </div>
      `
    }
  };

  /* ── Open full post ──────────────────────────────── */
  document.querySelectorAll('.blog-post').forEach(function (card) {
    card.addEventListener('click', function () {
      const postId   = this.getAttribute('data-modal');
      const postData = postsData[postId];

      if (postData) {
        postsGrid.classList.add('hidden');
        fullPostContent.innerHTML = postData.content;
        fullPost.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  /* ── Back button ─────────────────────────────────── */
  backButton.addEventListener('click', function () {
    fullPost.classList.remove('active');
    postsGrid.classList.remove('hidden');
    backToTopBtn.classList.remove('visible');
    window.scrollTo({ top: postsGrid.offsetTop, behavior: 'smooth' });
  });

  /* ── Back to top ─────────────────────────────────── */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300 && fullPost.classList.contains('active')) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Scroll-reveal animation ─────────────────────── */
  document.querySelectorAll('.blog-post, .section-title').forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  function animateOnScroll() {
    document.querySelectorAll('.blog-post, .section-title').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  /* ── Bubbles ─────────────────────────────────────── */
  const bubbles = document.querySelector('.bubbles');
  if (bubbles) {
    for (let i = 0; i < 50; i++) {
      const b = document.createElement('div');
      b.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:rgba(0,128,128,${(Math.random() * 0.1 + 0.05).toFixed(2)});
        width:${Math.random() * 200 + 50}px;
        height:${Math.random() * 200 + 50}px;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        animation:float ${Math.random() * 10 + 10}s linear infinite;
        opacity:0.8;
      `;
      bubbles.appendChild(b);
    }
  }

  /* ── Categories modal ────────────────────────────── */
  const categoriesModal = document.getElementById('categoriesModal');
  const categoriesLink  = document.getElementById('categoriesLink');
  const closeModal      = document.querySelector('#categoriesModal .close-modal');
  const categoryOptions = document.querySelectorAll('.category-option');
  const postCards       = document.querySelectorAll('.blog-post');

  /* Update category counts */
  const counts = { all: postCards.length };
  postCards.forEach(function (card) {
    const cat = card.querySelector('.post-category').textContent.toLowerCase();
    counts[cat] = (counts[cat] || 0) + 1;
  });
  categoryOptions.forEach(function (opt) {
    const cat = opt.dataset.category;
    if (cat !== 'all' && counts[cat]) {
      opt.textContent += ' (' + counts[cat] + ')';
    }
  });

  categoriesLink.addEventListener('click', function (e) {
    e.preventDefault();
    categoriesModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { categoryOptions[0].focus(); }, 100);
  });

  categoriesModal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal.click();
  });

  closeModal.addEventListener('click', function () {
    categoriesModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  });

  categoryOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      const category = this.dataset.category;

      categoryOptions.forEach(function (opt) { opt.classList.remove('active'); });
      this.classList.add('active');

      postCards.forEach(function (card) {
        const postCat = card.querySelector('.post-category').textContent.toLowerCase();
        card.style.display = (category === 'all' || postCat === category) ? 'block' : 'none';
      });

      setTimeout(function () {
        categoriesModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        if (category !== 'all') {
          document.querySelector('.posts-grid').scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    });
  });

});