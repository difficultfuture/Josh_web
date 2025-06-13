import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Heart, MessageCircle, Share2, Play, TrendingUp, Mail, Linkedin, Instagram, Star, X, Bookmark, MoreHorizontal, Check, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};




function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [buttonState, setButtonState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-scroll functionality for Instagram reels
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentReelIndex((prevIndex) => 
          prevIndex === instagramReels.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // 3 seconds

      return () => clearInterval(interval);
    }
  }, [isHovering]);

  const linkedinPosts = [
    {
    id: 1,
    preview: "Learnt how to propose a girl. 😍. Here is how !!",
    fullContent: "Learnt how to propose a girl. 😍. Here is how !!\n\nI didn't know who <strong>Harish Venkatesh</strong> was before attending his session, but he explained how to pitch perfectly.\n\nSimple. Simple. Very simple.\n\nPitching is like college dating. Make them to say yes 💓\n\n1. The Crush Moment → The Spark\nYeah, we fall in love in just a minute. You don't know who they are. No logic...\n\nSame as your startup or idea—you want to execute it, but you don't have proof.\nBut you have conviction.\n\n\"I am applying for this job because I know I'm the best person for it. I don't have all the proof yet, but I just know!\" - That's conviction.\n\n2. The First Impression → Elevator Pitch\nA crush is a feeling. But conveying that feeling? That's hard.\n\nJust like in pitching. You need to capture attention instantly.\n\n\"Your pitch should spark curiosity and make people say, 'Tell me more!'\"\n\n3. The Conversation\nOnce the first impression works, things change.\n\nYour schedule changes, your talk changes, your location changes, your tone changes… in simple words, you change yourself for the other person.\n\nSame with pitching—you have to step into the person's shoes, their mindset, their perspective.\n\n4. The Ask → Call to Action\n\"Shall we go for dinner? Shall we exchange numbers?\" That's the ask.\n\nSame with pitching:\n\"Do I get a job in your company?\"\n\"I am expecting an ₹8 LPA CTC.\"\n\nEverything is a Call to Action.\n\n5. The Follow-up\nOnce your pitch works out, you need to stay in your audience's memory.\n\nYou give gifts, you compliment often—you want them to think about you.\n\nSame in pitching. A follow-up email, a thank-you message, keeping the conversation alive.\n\nBeyond just the Call to Action, it's about being memorable.\n\nFeeling overwhelmed? Me too. 'Cause I don't even know how to write... 😆\n\nBut it's just very simple.\n1️⃣ Understand your audience\n2️⃣ Present yourself with clarity and confidence\n3️⃣ Leave them wanting more\n\nThis was just a simple summary of one part of his presentation...\n\nThank you <strong>Harish Venkatesh</strong>, I just loved it! 😊",
    likes: 156,
    comments: 24,
    shares: 12,
    timeAgo: "1d"
    },
    {
     id: 2,
      preview: "Epaphra T is not a Storyteller...... Yeah.. You read it right.",
      fullContent: "Epaphra T is not a Storyteller......\n\nYeah.. You read it right.\n\nEpaphra T is not just a Storyteller....\n\nI recently attended ENEXT-2025 Organised by PSG Tech - Entrepreneurs Club where I had a chance to meet Mr.Epaphra and Be part of his Speech.\n\nFrom Kutty story but periya lesson to <strong>The ThirdLane Podcast</strong>. He inspired me a lot.\n\nwhen i say a lot. I Just meant it. A Lottttt!.\n\nHere are my key takeaways from his speech on how to tell a better story:\n\n1️⃣ Make them Nod – Relate to people. If your audience can connect with your story, they'll naturally engage and follow you.\n\n2️⃣ The Power of Contrast – Sympathy turns into empathy when we contrast different perspectives. The deeper the contrast, the more impactful the connection.\n\n3️⃣ Conflict – This one took me a moment to fully grasp, but here's what I understand: Conflict is what makes stories feel real. It's what drives growth and change. Without conflict, there's no tension, no lesson, and no transformation.\n\nNow, here's where I hold myself accountable. As a professional procrastinator, I'm putting this out there: by end of 2025, I will create 50 solid contents. And no backing down.\n\nLet's see how it goes. :)",
      likes: 89,
      comments: 15,
      shares: 7,
      timeAgo: "3d"
    },
    {
      id: 3,
      preview: "What Bro?? It's Very Wrong Bro....",
      fullContent: "What Bro?? It's Very Wrong Bro..\n\nYesterday, I was in a bad mood. So, I took my phone and started listening to \"The 48 Laws of Power\" audiobook again.\n\nAnd then suddenly one thing struck me.\n\nPeople in entertainment and cinema often enter politics once they gain a larger-than-life fanbase and a cult-like following.\n\nLooking at the history legends like Sivaji Ganesan, MGR, and Jayalalithaa stepped into politics through cinema.\n\nAnd now, Actor Vijay is following the same path.\n\nCinema → Mass Following → Politics.\n\nInterestingly, Robert Greene mentions this in Law 27 of \"The 48 Laws of Power\":\n\n\"Play on people's need to believe to create a cult-like following. Give them a cause, a vision, something greater than themselves to follow.\"\n\nI just observed this pattern and wanted to share my thoughts.\n\nWhat do you think?",
      likes: 134,
      comments: 28,
      shares: 15,
      timeAgo: "4h"
    },
    {
      id: 4,
      preview: "I am in search of a girl to date - in linkedin.....",
      fullContent: "I am in search of a girl to date - in linkedin...\n\nSorry to get your attention like this..\n\nBut you will not regret for clicking this \"More\"\n\nMy motto is just to share about linkedin in my Point of view\n\nI still remember the days when Sudharsanan Ganapathy praises about Linkedin more in Tamil Community.\n\nBut In my mind, Linkedin is paired with Naukri which they are for Job Seekers and HR's\n\nBut when I Joined Kalvium, They told everyone to open Linkedin account and document our Journey.\n\nThat's how I opened Linkedin and hit 100s of Connection requests randomly..\n\nAnd even I posted couple of Hackathon and Event posts..\n\nBut When I see some People on LinkedIn who write contents and Present themselves online.. I Felt that interesting.\n\nAnd I Started to post Things which Inspire me, Things I know, My Thoughts,\n\nEventually it turned out, Random people who I don't know, Say that - \"You are doing awesome - Man\"\n\nSo is this pride? A show-off?\n\nAbsolutely not...\n\nJust to give a reminder to the my age group guys/girls.\n\nEverybody opens LinkedIn profiles in their College First year, and started to post when the Placements near.\n\nIf you have a LinkedIn profile.. And seeing this and not posting actively.. Start to post\n\nWhat to post?\n- Events you attend\n- Things you learn\n- Lessons you learn or even your failures.\n- Or Whatever you wanna show to others.\n\nTrust me.. It will definitely pay off one day.\n\n-------\n\nP.S: If you are a guy/girl wanna start any Startup in Future. You should start posting in linkedin.\n\nI have not achieved anything In my life to give this advice. But I still feel this to be posted now.",
      likes: 298,
      comments: 45,
      shares: 22,
      timeAgo: "6h"
    },
    {
      id: 5,
      preview: "This one week,\n I've been without my wife.\n Trust me - This is not a hoook",
      fullContent: "This one week, I've been without my wife.\n\nTrust me - This is not a hoook\n\nYes, My father often scold me like\n\"He's always with his ***** like she's his wife!\"\n\nEven I wondered Can I even survive one day without *****?\n\n*****? what's that?\n\nIt's my \"PHONNNNNNNNE\"\n\nthere are 85 percent chance that you are seeing this post by your phone\n\nJust think a second how it will be, when you want to spend a day without your phone.\n\nBut I've been without my phone.\n\nFor 10 days,\n\nTo be honest, it is like hell\n\nMy hands try to find a phone,\nMy thoughts wants to check the notifications,\nMy mind need instagram scroll.\n\nAfter 2 days, I got so much relax,\n\nMy instagram screen time went from 3hrs/day to 30 minutes (I use insta in my lap 😅)\n\nI enjoyed the view while travelling.\n\nI spent very less money as I could'nt use Gpay.\n\nIn short\n\"I enjoyed the boredom\"\n\nI repeat again,\n\"I enjoyed the boredom\"\n\nCould you able to survive oneday without ur phone?\n\n--\n\nP.S. Maybe this post doesn't have a big life lesson,\nBut try challenging yourself to a phone-free day.\nThen come back and drop a comment: \"So simple\"",
      likes: 421,
      comments: 67,
      shares: 31,
      timeAgo: "8h"
    }
  ];

  const youtubeVideos = [
    {
      id: 1,
      title: "5 Copywriting Secrets That Convert",
      views: "12K views",
      description: "Discover the psychological triggers that make people take action",
      script: "Hook: 'What if I told you that changing just 5 words in your copy could double your conversion rate?'\n\nIntro: Welcome back to the channel! I'm Joshwa, and today we're diving deep into the psychology of persuasive copywriting.\n\nSecret #1: The Power of Specificity\nInstead of saying 'many people,' say '73% of marketers.' Specific numbers build instant credibility.\n\nSecret #2: Future Pacing\nHelp your audience visualize their success. 'Imagine waking up to 50 new leads in your inbox...'\n\nSecret #3: Social Proof Stacking\nDon't just show one testimonial. Stack multiple forms of proof: testimonials, case studies, logos, numbers.\n\nSecret #4: The Curiosity Gap\nCreate an information gap that compels people to keep reading. 'The one mistake that's killing your conversions (and how to fix it in 5 minutes)'\n\nSecret #5: Emotional Anchoring\nConnect your product to deep emotional desires. People buy with emotion and justify with logic.\n\nConclusion: Remember, great copy isn't about being clever—it's about being clear, compelling, and customer-focused.\n\nCall to Action: Which secret will you implement first? Let me know in the comments below!"
    },
    {
      id: 2,
      title: "How I Grew My LinkedIn in 30 Days",
      views: "8.5K views",
      description: "The exact strategy I used to gain 2,000+ followers organically",
      script: "Hook: 'In 30 days, I went from 500 to 2,500 LinkedIn followers without spending a dime on ads. Here's exactly how I did it.'\n\nIntro: If you're struggling to grow your LinkedIn presence, this video is for you. I'm going to break down my exact 30-day strategy.\n\nWeek 1: Foundation Building\n- Optimized my profile with keywords\n- Created a content calendar\n- Identified my target audience\n\nWeek 2: Content Consistency\n- Posted daily value-driven content\n- Mixed formats: text, carousels, videos\n- Engaged authentically with others\n\nWeek 3: Strategic Networking\n- Connected with industry leaders\n- Commented thoughtfully on trending posts\n- Shared others' content with insights\n\nWeek 4: Community Building\n- Started meaningful conversations\n- Responded to every comment\n- Created shareable content\n\nResults: 2,000 new followers, 500% increase in profile views, 50+ business inquiries\n\nKey Takeaway: Consistency + Value + Authenticity = Growth\n\nYour turn: What's your biggest LinkedIn challenge? Drop it in the comments!"
    },
    {
      id: 3,
      title: "Content Strategy That Actually Works",
      views: "15K views",
      description: "Stop creating content that gets ignored. Here's what works in 2024",
      script: "Hook: 'Most content creators are doing it backwards. They create first, then hope someone cares. Here's the right way.'\n\nIntro: I've analyzed thousands of pieces of content, and I've discovered the patterns that separate viral content from ignored content.\n\nStep 1: Audience Research First\n- Survey your existing audience\n- Analyze competitor content\n- Use social listening tools\n\nStep 2: Content Pillars\n- Educational (40%)\n- Inspirational (30%)\n- Personal/Behind-the-scenes (20%)\n- Promotional (10%)\n\nStep 3: Format Diversification\n- Text posts for quick insights\n- Carousels for step-by-step guides\n- Videos for storytelling\n- Polls for engagement\n\nStep 4: Distribution Strategy\n- Native platform posting\n- Cross-platform adaptation\n- Email newsletter integration\n- Community sharing\n\nStep 5: Performance Analysis\n- Track engagement rates\n- Monitor audience growth\n- Analyze top-performing content\n- Iterate based on data\n\nConclusion: Great content strategy isn't about posting more—it's about posting smarter.\n\nAction Step: Pick one platform and implement this strategy for 30 days. You'll be amazed at the results!"
    }
  ];

  const instagramReels = [
    {
      id: 1,
      hook: "Intha IPL la csk thiruppi thiruppi thothatha paathu Kadupaanatha vida\nMatch ku naduvula Marie poori nu intha ad ye thiruppi thiruppi paathu kadupaanathu thaan athikam\n(–beep–)",
      content: "Pothuva ipl time la yella company num maathi maathi potta ad-ye thiruppi thiruppi pottu pottu semmaya kadupethuvaanga.\n\nAthum main aah - Fantasy and Gambling apps promotion sollave venam. Ithukku Pinnadi ore peri strategy-eh irukku,\n\nAthaan repetative marketing..\n\nBcz Namakku ore ad thirumba thirumba Athum - 2 maasama kaamichittu iruntha namakku theriyamaleye antha brand namakku familiar aayirum.\n\nAthuvum maari poorie nu rhyming aa irukkura nala namakku marakkave marakkaathu\n\nSo, the ideology behind this repetitive marketing is not about selling, It is about registering their brand in your deeper mind.",
      cta: "Intha varusam ungala bayangarama kadupethuna ad - ah comment pannittu ponga.",
      likes: 2847,
      comments: 156,
      saves: 423
    },
    {
      id: 2,
      hook: "(Me watching Ipl cricket in phone and saying)\nEvan da intha ad aa direct pannathu. Nerla mattum paathaana sethaan da.\n\nSumma maarie, maarie nu\n\nBeep. and connection lost edit\n\nIppadi nu neengalum feel panniyirukeengala",
      content: "Ithukku pinnadi oru periya marketing strategy irukku. athaan … Repetitive marketing.\n\nBasic aah Ore ad oru brand ah thiruppi thiruppi nammakku kaamichitte irunthaangana namma therijo theriyamalo nammaku antha brand familiar aah maarirum. We start to trust the brand without our consciousness..\n\nBecause first time casual aah antha ad-ah paakura namma 2 maasam ore ad ah thiruppi thiruppi podranala nammakku antha ad ah direct panna director vida athika vaati paathirupom\n\nInnum solla pona Intha ipl uhm ads uhm Csk and dhoni maari yeppaveme pirikka mudiyaathu… (ahaahaan) And beep\n\nThe goal of Repetitive marketing isn't selling. But to register their brand in your mind deeply.",
      cta: "Intha varusham thiruppi thiruppi pottu kolapanna ad ah comment pannittu ponga.",
      likes: 1923,
      comments: 89,
      saves: 567
    }
  ];

  const handleReelClick = () => {
    setCurrentReelIndex((prevIndex) => 
      prevIndex === instagramReels.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:blessingjoshuaoffl@gmail.com?subject=Let\'s Collaborate&body=Hi Joshwa,%0D%0A%0D%0AI\'d love to discuss a potential project with you.%0D%0A%0D%0ABest regards,';
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/blessing-joshwa/', '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ message: 'Sending...', type: 'info' });
    setButtonState('sending');

    if (!formRef.current) return;

    emailjs.sendForm(
      'service_3reet0s',
      'template_779ctot',
      formRef.current,
      '1D5Q1owXLWze9SCAo'
    )
      .then((result) => {
        setFormStatus({ message: 'Message sent successfully!', type: 'success' });
        setButtonState('success');
        if (formRef.current) {
          formRef.current.reset();
        }
        // Reset button state after 2 seconds
        setTimeout(() => {
          setButtonState('idle');
        }, 2000);
      })
      .catch((error) => {
        setFormStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
        setButtonState('error');
        // Reset button state after 2 seconds
        setTimeout(() => {
          setButtonState('idle');
        }, 2000);
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
        <div className={`text-center max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-base sm:text-lg text-gray-600 mb-4 font-light">Hello! I'm Joshwa.</p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-light mb-6 leading-tight">
            Crafting Words That <br />
            <span className="italic">Connect, Convert,</span> <br />
            and Create Impact.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto px-4">
            From social scrolls to storytelling—your brand, word-perfect.
          </p>
          <button 
            onClick={handleEmailContact}
            className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto group focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-20"
            aria-label="Contact Joshwa via email"
          >
            Let's Talk
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Profile Capsule with Arrow - Hidden on mobile */}
        <div className="absolute top-20 right-4 sm:right-10 md:right-20 hidden sm:block">
          <div className="relative">
            {/* Curved Arrow */}
            <svg className="absolute -left-20 sm:-left-32 top-8 w-16 sm:w-24 h-12 sm:h-16 text-gray-400" viewBox="0 0 100 60" fill="none">
              <path d="M10 50 Q50 10 90 30" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M85 25 L90 30 L85 35" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            
            {/* Profile Card */}
            <button
              onClick={handleLinkedInClick}
              className="bg-white rounded-full p-3 sm:p-4 shadow-lg border border-gray-100 flex items-center gap-2 sm:gap-3 hover:shadow-xl transition-all duration-300 max-w-xs group focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20"
              aria-label="Visit Blessing Joshwa's LinkedIn profile"
            >
              <img 
                src="/public/images/profie.jpeg" 
                alt="Blessing Joshwa" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">@BlessingJoshwa</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
            </button>
          </div>
        </div>
      </section>

      {/* LinkedIn Posts Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-center mb-12 sm:mb-16">LinkedIn Posts</h2>
          <div className="overflow-hidden">
            <div className="flex gap-4 sm:gap-6 animate-scroll">
              {linkedinPosts.map((post) => (
                <button 
                  key={post.id} 
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg min-w-72 sm:min-w-80 hover:shadow-xl transition-all duration-300 cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20"
                  onClick={() => setSelectedPost(post)}
                  aria-label={`Read full LinkedIn post: ${post.preview.substring(0, 50)}...`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">Blessing Joshwa</p>
                      <p className="text-xs text-gray-500">Content Writer • {post.timeAgo}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4 leading-relaxed text-sm sm:text-base line-clamp-3">
                    {post.preview}
                  </p>
                  <div className="flex items-center gap-4 sm:gap-6 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Scripts Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-center mb-12 sm:mb-16">Powerful YouTube Scripts That Speak Loud</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {youtubeVideos.map((video, index) => (
              <button 
                key={index} 
                className="group cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-20 rounded-xl"
                onClick={() => setSelectedVideo(video)}
                aria-label={`View YouTube script for: ${video.title}`}
              >
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-xl aspect-video mb-4 overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    10:24
                  </div>
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-sm">{video.views} • 2 weeks ago</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Captions Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-center mb-12 sm:mb-16">Instagram Captions with Creator Chemistry</h2>
          <div className="flex justify-center">
            {/* Mobile Phone Frame */}
            <div className="bg-black rounded-3xl p-3 sm:p-4 shadow-2xl max-w-sm w-full mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden relative" style={{ height: '600px' }}>
                {/* Instagram Header */}
                <div className="bg-white border-b border-gray-100 p-3 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex-shrink-0"></div>
                    <span className="font-semibold text-sm">blessingjoshwa</span>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </div>

                {/* Reel Content */}
                <div 
                  className="relative flex-1 cursor-pointer overflow-hidden"
                  style={{ height: 'calc(100% - 60px)' }}
                  onClick={handleReelClick}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 transition-all duration-500">
                    <div className="h-full p-4 flex flex-col justify-center overflow-y-auto">
                      <div className="space-y-3 text-white">
                        {/* Hook Section */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-bold mb-2 text-yellow-300 uppercase tracking-wide">Hook:</h4>
                          <p className="text-sm leading-relaxed whitespace-pre-line">
                            {instagramReels[currentReelIndex].hook}
                          </p>
                        </div>
                        
                        {/* Content Section */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-3 backdrop-blur-sm max-h-48 overflow-y-auto">
                          <h4 className="text-xs font-bold mb-2 text-blue-300 uppercase tracking-wide">Content:</h4>
                          <p className="text-xs leading-relaxed whitespace-pre-line">
                            {instagramReels[currentReelIndex].content}
                          </p>
                        </div>
                        
                        {/* CTA Section */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-3 backdrop-blur-sm">
                          <h4 className="text-xs font-bold mb-2 text-green-300 uppercase tracking-wide">CTA:</h4>
                          <p className="text-sm leading-relaxed whitespace-pre-line">
                            {instagramReels[currentReelIndex].cta}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Side Actions */}
                  <div className="absolute bottom-20 right-4 flex flex-col gap-4 z-10">
                    <div className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm">
                      <Bookmark className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-white font-semibold text-sm">blessingjoshwa</span>
                    </div>
                    <p className="text-white text-xs leading-relaxed line-clamp-2">
                      Post {currentReelIndex + 1}: Tamil content about repetitive marketing in IPL ads...
                    </p>
                    <p className="text-white text-xs mt-2 opacity-75">
                      {instagramReels[currentReelIndex].likes.toLocaleString()} likes • {instagramReels[currentReelIndex].comments} comments
                    </p>
                  </div>

                  {/* Navigation Dots */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
                    {instagramReels.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentReelIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Auto-scroll indicator */}
                  {!isHovering && (
                    <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-10">
                      Auto-scrolling...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Growth Snapshot */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-center mb-4">Content That Grows—Visibly.</h2>
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-100">
            {/* Time Period Buttons */}
            <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto">
              <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500">Daily</button>
              <button className="text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-500">Monthly</button>
              <button className="text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-500">Yearly</button>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <p className="text-gray-600 text-sm mb-2">Total Impression</p>
                <p className="text-2xl sm:text-3xl font-bold mb-2">122,996</p>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-medium">10%</span>
                  <span className="text-gray-500">vs yesterday</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <p className="text-gray-600 text-sm mb-2">Total Members reached</p>
                <p className="text-2xl sm:text-3xl font-bold mb-2">102,453</p>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-medium">15%</span>
                  <span className="text-gray-500">vs yesterday</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                <p className="text-gray-600 text-sm mb-2">Followers</p>
                <p className="text-2xl sm:text-3xl font-bold mb-2">2,649</p>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-medium">8%</span>
                  <span className="text-gray-500">vs yesterday</span>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-blue-50 rounded-xl p-4 sm:p-6 h-48 sm:h-64 flex items-end justify-between">
              <div className="flex items-end gap-1 sm:gap-2 h-full w-full">
                {[60, 65, 70, 75, 80, 85, 90, 95, 88, 92, 96, 100].map((height, index) => (
                  <div key={index} className="bg-blue-500 rounded-t flex-1" style={{ height: `${height}%` }}></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-center mb-12 sm:mb-16">What My Clients Say</h2>
          <div className="overflow-hidden">
            <div className="flex gap-4 sm:gap-6 animate-scroll-slow">
              {[
                { name: "Sarah Chen", role: "Marketing Director", quote: "Joshwa's content strategy increased our engagement by 300%. His understanding of our audience is unmatched." },
                { name: "Michael Rodriguez", role: "Startup Founder", quote: "The LinkedIn posts Joshwa wrote for us generated more leads in one month than we had all quarter." },
                { name: "Emily Watson", role: "Brand Manager", quote: "Working with Joshwa was a game-changer. His copy doesn't just sound good—it converts." },
                { name: "David Kim", role: "CEO", quote: "Joshwa has a rare talent for turning complex ideas into compelling stories that resonate with our audience." }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg min-w-72 sm:min-w-80 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto flex-shrink-0">
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">in</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 leading-relaxed text-sm sm:text-base">"{testimonial.quote}"</p>
                  <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smilin Website CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-6">Do you want website like this?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">Get a stunning, modern, and high-converting website for your brand or business. Connect with the designer behind this site!</p>
          <a
            href="https://www.linkedin.com/in/johnsmilin/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-20"
            aria-label="Connect with Smilin on LinkedIn"
          >
            Connect with Smilin
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-center mb-12 sm:mb-16">Let's Collaborate</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <input 
                  type="text" 
                  name="user_name"
                  placeholder="Your Name" 
                  className="w-full p-4 border-b-2 border-gray-200 focus:border-black outline-none transition-colors duration-300 bg-transparent text-sm sm:text-base focus:ring-0"
                  aria-label="Your name"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="user_email"
                  placeholder="Email Address" 
                  className="w-full p-4 border-b-2 border-gray-200 focus:border-black outline-none transition-colors duration-300 bg-transparent text-sm sm:text-base focus:ring-0"
                  aria-label="Your email address"
                  required
                />
              </div>
            </div>
            <div>
              <select 
                name="project_type"
                className="w-full p-4 border-b-2 border-gray-200 focus:border-black outline-none transition-colors duration-300 bg-transparent text-sm sm:text-base focus:ring-0"
                aria-label="Project type"
                required
              >
                <option value="">Project Type</option>
                <option value="LinkedIn Content">LinkedIn Content</option>
                <option value="YouTube Scripts">YouTube Scripts</option>
                <option value="Instagram Captions">Instagram Captions</option>
                <option value="Website Copy">Website Copy</option>
                <option value="Email Marketing">Email Marketing</option>
              </select>
            </div>
            <div>
              <textarea 
                name="message"
                placeholder="Tell me about your project..." 
                rows={6}
                className="w-full p-4 border-b-2 border-gray-200 focus:border-black outline-none transition-colors duration-300 bg-transparent resize-none text-sm sm:text-base focus:ring-0"
                aria-label="Project description"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={buttonState === 'sending'}
              className={`w-full py-3 sm:py-4 rounded-full font-medium transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-opacity-20 relative overflow-hidden ${
                buttonState === 'idle' ? 'bg-black text-white hover:scale-105 focus:ring-black' :
                buttonState === 'sending' ? 'bg-gray-400 text-white cursor-not-allowed' :
                buttonState === 'success' ? 'bg-green-500 text-white' :
                'bg-red-500 text-white'
              }`}
            >
              <span className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${
                buttonState === 'sending' ? 'opacity-0' : 'opacity-100'
              }`}>
                {buttonState === 'idle' && 'Send Message'}
                {buttonState === 'success' && (
                  <>
                    <Check className="w-5 h-5" />
                    Sent Successfully
                  </>
                )}
                {buttonState === 'error' && (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Try Again
                  </>
                )}
              </span>
              {buttonState === 'sending' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 sm:gap-6 mt-12">
            <button
              onClick={handleLinkedInClick}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20"
              aria-label="Visit Blessing Joshwa's LinkedIn profile"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <a 
              href="https://instagram.com/blessingjoshwa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-20"
              aria-label="Visit Blessing Joshwa's Instagram profile"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <button
              onClick={handleEmailContact}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-20"
              aria-label="Send email to Blessing Joshwa"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm sm:text-base">© 2025 Blessing Joshwa</p>
          <p className="text-gray-600 text-sm sm:text-base">Website designed by Smilin ⚡️</p>
        </div>
      </footer>

      {/* LinkedIn Post Modal */}
      <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
        {selectedPost && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <div>
                <p className="font-semibold">Blessing Joshwa</p>
                <p className="text-sm text-gray-500">Content Writer • {selectedPost.timeAgo}</p>
              </div>
            </div>
            <div className="prose max-w-none mb-6">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {selectedPost.fullContent}
              </p>
            </div>
            <div className="flex items-center gap-8 text-gray-500 border-t pt-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>{selectedPost.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{selectedPost.comments}</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span>{selectedPost.shares}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* YouTube Video Modal */}
      <Modal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)}>
        {selectedVideo && (
          <div className="p-6">
            <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-xl aspect-video mb-6">
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-4">
                  <Play className="w-12 h-12 text-red-600" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
            <p className="text-gray-600 mb-4">{selectedVideo.views} • 2 weeks ago</p>
            <p className="text-gray-700 mb-6">{selectedVideo.description}</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Full Script:</h4>
              <div className="prose max-w-none">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm">
                  {selectedVideo.script}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;