const { useState, useEffect, useMemo, useRef } = React;

// --- FIREBASE CONFIG ---
// --- FIREBASE CONFIG ---
const firebaseConfig = {
    apiKey: "AIzaSyAEWQiBVYKrJIJy6TW1Dv6RRCSOR4vEjD8",
    authDomain: "bmu-radio.firebaseapp.com",
    projectId: "bmu-radio",
    storageBucket: "bmu-radio.firebasestorage.app",
    messagingSenderId: "583017396052",
    appId: "1:583017396052:web:c8f49de8e70ef569e0bac1",
    measurementId: "G-MV6LNMVR32"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- ICONS ---
const Icon = ({ children, size = 24, className = "", strokeWidth = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        {children}
    </svg>
);
const Home = (props) => <Icon {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>;
const Search = (props) => <Icon {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>;
const PlusSquare = (props) => <Icon {...props}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 12h8" /><path d="M12 8v8" /></Icon>;
const Heart = (props) => <Icon {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></Icon>;
const User = (props) => <Icon {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>;
const MoreHorizontal = (props) => <Icon {...props}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></Icon>;
const MessageCircle = (props) => <Icon {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></Icon>;
const Send = (props) => <Icon {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></Icon>;
const Share2 = (props) => <Icon {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98" /><path d="m15.41 6.51-6.82 3.98" /></Icon>;
const ImageIcon = (props) => <Icon {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></Icon>;
const X = (props) => <Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 18 18" /></Icon>;
const LogOut = (props) => <Icon {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></Icon>;
const MapPin = (props) => <Icon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>;
const Radio = (props) => <Icon {...props}><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></Icon>;
const Lock = (props) => <Icon {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>;
const Mail = (props) => <Icon {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Icon>;
const ArrowRight = (props) => <Icon {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icon>;
const Camera = (props) => <Icon {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></Icon>;
const Upload = (props) => <Icon {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></Icon>;
const AlertCircle = (props) => <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></Icon>;
const Play = (props) => <Icon {...props}><polygon points="5 3 19 12 5 21 5 3" /></Icon>;
const Pause = (props) => <Icon {...props}><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></Icon>;
const Volume2 = (props) => <Icon {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></Icon>;
const Calendar = (props) => <Icon {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></Icon>;
const BarChart2 = (props) => <Icon {...props}><line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" /></Icon>;
const TrendingUp = (props) => <Icon {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></Icon>;
const Plus = (props) => <Icon {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;
const Layers = (props) => <Icon {...props}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></Icon>;

// --- MOCK DATA ---
const INITIAL_USER_TEMPLATE = {
    id: 'user_1',
    username: '', fullName: '', avatar: '', bio: 'Student at BMU',
    followers: 0, following: 0, verified: false
};
const SUGGESTED_USERS = [
    // Technical & Academic
    { id: 'c_tsec', username: 'tsec_bmu', fullName: 'The Strategist & Entrepreneurship Club (TSEC)', avatar: 'clubs/tsec.jpeg', verified: true },
    { id: 'c_robotics', username: 'robotics_club', fullName: 'Robotics Club', avatar: 'clubs/robotics.jpeg', verified: true },
    { id: 'c_scimat', username: 'scimat_club', fullName: 'SCI-MAT Club (Science & Tech)', avatar: 'clubs/scimat.jpeg', verified: false },
    { id: 'c_fino', username: 'finonomics', fullName: 'FINONOMICS Club', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=FC&backgroundColor=16a34a', verified: true },
    { id: 'c_acm', username: 'acm_bmu', fullName: 'ACM Student Chapter', avatar: 'clubs/acm.jpeg', verified: true },
    { id: 'c_cyber', username: 'cybersec_bmu', fullName: 'Cybersecurity Club', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=CSC&backgroundColor=475569', verified: true },

    // Arts & Culture
    { id: 'c_pfa', username: 'pfa_official', fullName: 'Performing Arts Club (PFA)', avatar: 'clubs/performing arts.jpeg', verified: true },
    { id: 'c_pac', username: 'pac_bmu', fullName: 'Photography & Cinematography (PAC)', avatar: 'clubs/pac.jpeg', verified: true },
    { id: 'c_strokes', username: 'strokes_art', fullName: 'Strokes Club (Art)', avatar: 'clubs/strokes.jpeg', verified: false },
    { id: 'c_culinary', username: 'culinary_club', fullName: 'Culinary Club', avatar: 'clubs/cullnary.jpeg', verified: false },


    // Sports & Wellness
    { id: 'c_auto', username: 'auto_club', fullName: 'Automobile Club', avatar: 'clubs/automobile.jpeg', verified: false },
    { id: 'c_fight', username: 'fight_club', fullName: 'Wellness and Fight Club', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=WFC&backgroundColor=0d9488', verified: false },

    // Social & Community
    { id: 'c_nss', username: 'nss_bmu', fullName: 'National Service Scheme (NSS)', avatar: 'clubs/nss.jpeg', verified: true },
    { id: 'c_yrc', username: 'youth_red_cross', fullName: 'Youth Red Cross (YRC)', avatar: 'clubs/yrc.jpeg', verified: true },
    { id: 'c_env', username: 'environment_club', fullName: 'Environment Club', avatar: 'clubs/environment .jpeg', verified: false },

    // Literary & Others

    { id: 'c_sierra', username: 'sierra_club', fullName: 'Sierra Club (Adventure)', avatar: 'clubs/sierra.jpeg', verified: false },
    { id: 'c_savera', username: 'savera_club', fullName: 'Savera Club', avatar: 'clubs/savera.jpeg', verified: false },
    { id: 'c_adv', username: 'adventure_club', fullName: 'Adventure Club', avatar: 'clubs/adventure.jpeg', verified: false },
];
const INITIAL_POSTS = [];

// --- COMPONENTS ---

const ChatWindow = ({ club, onClose, currentUser }) => {
    const storageKey = `bmu_chat_${club.id}`;

    // Initialization: Try to load from localStorage first
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [
            { id: 'initial', sender: 'club', text: `Welcome to the ${club.fullName} community!`, senderName: 'Admin', timestamp: Date.now() }
        ];
    });

    const [inputText, setInputText] = useState('');
    const [onlineCount] = useState(() => Math.floor(Math.random() * 50) + 12);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Save messages whenever they change
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(messages));
        scrollToBottom();
    }, [messages]);

    // Simulation: Ambient messages from "other students"
    useEffect(() => {
        const ambientUsers = ['Rahul S.', 'Priya Kapoor', 'Ankit M.', 'Sneha', 'Vikram', 'Dheeraj'];
        const ambientPrompts = [
            "Anyone knows when the next meeting is?",
            "That last event was fire! 🔥",
            "Hey everyone!",
            "Is there a workshop this weekend?",
            "Check out the new announcement on the portal.",
            "Glad to be part of this club!",
            "Can we join even if we're from different departments?"
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const randomUser = ambientUsers[Math.floor(Math.random() * ambientUsers.length)];
                const randomText = ambientPrompts[Math.floor(Math.random() * ambientPrompts.length)];

                setMessages(prev => [...prev, {
                    id: `ambient_${Date.now()}`,
                    sender: 'other',
                    senderName: randomUser,
                    text: randomText,
                    timestamp: Date.now()
                }]);
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [club.id]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMsg = {
            id: `user_${Date.now()}`,
            sender: 'me',
            senderName: currentUser.username,
            text: inputText,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');

        if (messages.length < 5) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: `admin_${Date.now()}`,
                    sender: 'club',
                    senderName: 'Admin',
                    text: 'Thanks for reaching out! Feel free to ask anything here.',
                    timestamp: Date.now()
                }]);
            }, 1500);
        }
    };

    return (
        <div className="fixed bottom-6 right-96 w-96 h-[500px] aero-glass rounded-[40px] shadow-2xl border border-white/10 flex flex-col z-chat animate-scale-in overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-white/5 p-5 flex justify-between items-center border-b border-white/5 relative overflow-hidden group/header">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover/header:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                        <img src={club.avatar} className="w-11 h-11 rounded-[16px] border border-white/10 shadow-xl object-cover" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-4 border-[#0a0a0c] shadow-lg"></div>
                    </div>
                    <div>
                        <p className="font-black text-white text-[15px] font-outfit tracking-tight leading-none mb-1.5">{club.username}</p>
                        <div className="flex items-center gap-2">
                            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{onlineCount} SYNCHRONIZED</p>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-rose-500 text-white transition-all flex items-center justify-center relative z-10 active:scale-90"><X size={20} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} group/msg`}>
                        {msg.sender !== 'me' && (
                            <span className="text-[9px] font-black text-indigo-400/60 ml-2 mb-2 uppercase tracking-widest">
                                {msg.senderName}
                            </span>
                        )}
                        <div className={`max-w-[85%] p-4 rounded-[24px] text-sm shadow-2xl relative transition-all duration-300 ${msg.sender === 'me'
                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/20 group-hover/msg:translate-x-[-4px]'
                            : msg.sender === 'club'
                                ? 'bg-white/10 text-white border border-white/10 rounded-tl-none font-medium group-hover/msg:translate-x-[4px]'
                                : 'bg-white/5 text-white/70 border border-white/5 rounded-tl-none group-hover/msg:translate-x-[4px]'
                            }`}>
                            <p className="font-outfit leading-relaxed tracking-tight">{msg.text}</p>
                            <div className={`text-[8px] font-black mt-2 opacity-30 uppercase tracking-widest ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Overlay */}
            <div className="p-5 bg-white/5 border-t border-white/5">
                <form onSubmit={handleSend} className="flex gap-3 bg-white/5 p-2 rounded-[24px] border border-white/5 focus-within:border-indigo-500/30 transition-all">
                    <input
                        className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/20 font-bold font-outfit"
                        placeholder="Broadcast message..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                    />
                    <button type="submit" className="w-10 h-10 bg-white text-black rounded-[18px] flex items-center justify-center hover:scale-110 hover:bg-indigo-500 hover:text-white transition-all active:scale-90 shadow-2xl">
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

const PostCard = ({ post, onLike, onAddComment, isAdmin, onDelete, user }) => {
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [realtimeComments, setRealtimeComments] = useState([]);

    // Firestore Sync: Comments for this post
    useEffect(() => {
        if (showComments) {
            const unsubscribe = db.collection('comments')
                .where('postId', '==', post.docId || post.id)
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    setRealtimeComments(data);
                });
            return () => unsubscribe();
        }
    }, [showComments, post.docId, post.id]);

    return (
        <div className="aero-glass rounded-[48px] border border-white/5 shadow-2xl mb-12 group transition-all duration-700 hover:shadow-indigo-500/10 hover:border-white/10 animate-fade-in floating-card overflow-hidden">
            <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-5">
                        <div className="relative p-0.5 rounded-[22px] bg-gradient-to-tr from-indigo-500 to-purple-600 group-hover:rotate-6 transition-transform duration-700 shadow-xl">
                            <img src={post.avatar} className="w-14 h-14 rounded-[20px] object-cover border-2 border-[#08080a]" />
                        </div>
                        <div>
                            <h4 className="font-black text-[15px] text-white font-outfit tracking-tight group-hover:text-indigo-400 transition-colors">{post.username}</h4>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • BMU Campus</p>
                        </div>
                    </div>
                    {isAdmin && (
                        <button onClick={() => onDelete(post.docId)} className="w-12 h-12 rounded-[22px] bg-white/5 text-white/20 hover:bg-rose-500 hover:text-white transition-all scale-90 opacity-0 group-hover:opacity-100 flex items-center justify-center active:scale-75 shadow-lg"><Trash2 size={20} /></button>
                    )}
                </div>

                <p className="text-[17px] font-medium text-white/90 leading-relaxed font-outfit mb-8 tracking-tight">{post.text}</p>

                {post.image && (
                    <div className="mb-8 rounded-[40px] overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10 group/media transition-all">
                        <img src={post.image} className="w-full h-auto max-h-[600px] object-cover transition-transform duration-[3000ms] group-hover/media:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity"></div>
                    </div>
                )}

                <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                    <button onClick={() => onLike(post.docId)} className="flex items-center gap-4 group/btn transition-all active:scale-90">
                        <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-500 ${post.likes > 0 ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 'bg-white/5 text-white/20 group-hover/btn:bg-white/10 group-hover/btn:text-rose-400'}`}>
                            <Heart size={22} className={post.likes > 0 ? 'fill-current' : ''} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className={`text-[15px] font-black font-outfit ${post.likes > 0 ? 'text-rose-400' : 'text-white/40 group-hover/btn:text-rose-400'}`}>{post.likes}</span>
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none">Vibes</span>
                        </div>
                    </button>

                    <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-4 group/btn transition-all active:scale-90">
                        <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-500 bg-white/5 text-white/20 group-hover/btn:bg-indigo-500 group-hover/btn:text-white group-hover/btn:shadow-[0_0_20px_rgba(99,102,241,0.3)]`}>
                            <MessageCircle size={22} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[15px] font-black font-outfit text-white/40 group-hover/btn:text-indigo-400">{realtimeComments.length || post.comments?.length || 0}</span>
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none">Whispers</span>
                        </div>
                    </button>

                    <button className="w-14 h-14 rounded-3xl bg-white/5 text-white/20 group-hover:bg-white group-hover:text-black transition-all active:scale-90 ml-auto flex items-center justify-center shadow-lg">
                        <Share2 size={22} />
                    </button>
                </div>
            </div>

            {showComments && (
                <div className="bg-white/[0.02] backdrop-blur-xl px-10 pb-10 pt-6 space-y-6 animate-slide-up border-t border-white/5">
                    <form onSubmit={(e) => { e.preventDefault(); if (comment.trim()) { onAddComment(post.docId, comment); setComment(''); } }} className="flex gap-4 mb-8">
                        <img src={user.avatar} className="w-12 h-12 rounded-2xl object-cover border border-white/10 shadow-xl" />
                        <div className="flex-1 relative">
                            <input
                                placeholder="Add a whisper..."
                                className="w-full bg-white/5 p-4 pr-16 rounded-[24px] outline-none text-sm border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold placeholder:text-white/20 text-white"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            />
                            <button type="submit" className="absolute right-2 top-2 p-2.5 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-white hover:text-black transition-all active:scale-90"><Send size={18} /></button>
                        </div>
                    </form>
                    <div className="space-y-6">
                        {realtimeComments.map((c, i) => (
                            <div key={i} className="flex gap-5 group/comm animate-fade-in">
                                <img src={c.avatar} className="w-10 h-10 rounded-2xl object-cover shrink-0 mt-1 border border-white/5" />
                                <div className="flex-1 bg-white/5 p-5 rounded-[28px] border border-white/5 group-hover/comm:bg-white/10 transition-all duration-500">
                                    <p className="font-black text-xs text-indigo-400 mb-1 font-outfit tracking-wide">{c.username}</p>
                                    <p className="text-[14px] text-white/70 font-medium leading-relaxed font-outfit">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const RadioPlayer = ({ isPlaying, onToggle, currentShow, rjName, volume, onVolumeChange }) => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-64px)] max-w-4xl h-24 aero-glass-deep rounded-[32px] z-player flex items-center px-10 justify-between animate-slide-up hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-700 border border-white/10 shadow-3xl group/player">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/player:opacity-100 transition-opacity duration-1000"></div>

            <div className="flex items-center gap-6 w-1/3 relative z-10">
                <div className={`w-14 h-14 rounded-[20px] bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 transition-all duration-500 ${isPlaying ? 'animate-pulse scale-105' : 'opacity-40'}`}>
                    <Radio size={28} strokeWidth={2.5} />
                </div>
                <div className="overflow-hidden hidden sm:block">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full bg-rose-500 ${isPlaying ? 'animate-ping' : ''}`}></div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] font-outfit">Live Pulse</p>
                    </div>
                    <div className="w-56 overflow-hidden whitespace-nowrap mask-fade-right">
                        <p className="text-[15px] font-black text-white font-outfit tracking-tight leading-none">
                            {currentShow} <span className="text-white/20 mx-3 font-normal">/</span> <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">RJ {rjName}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-10 relative z-10">
                <button className="text-white/20 hover:text-indigo-400 transition-all transform hover:scale-125 active:scale-90"><TrendingUp size={24} /></button>
                <button
                    onClick={onToggle}
                    className="w-16 h-16 rounded-[24px] bg-white text-black flex items-center justify-center hover:scale-110 transition-all duration-500 shadow-2xl shadow-white/10 active:scale-90 group/play"
                >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1.5" />}
                </button>
                <button className="text-white/20 hover:text-purple-400 transition-all transform hover:scale-125 active:scale-90"><MoreHorizontal size={24} /></button>
            </div>

            <div className="flex items-center gap-8 w-1/3 justify-end relative z-10">
                <div className="hidden md:flex items-center gap-4 group/vol">
                    <Volume2 size={22} className="text-white/20 group-hover/vol:text-indigo-400 transition-colors" />
                    <div className="w-28 h-1.5 bg-white/5 rounded-full relative overflow-hidden group-hover/vol:h-2 transition-all">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300" style={{ width: `${volume}%` }}></div>
                        <input type="range" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" value={volume} min="0" max="100" onChange={(e) => onVolumeChange(parseInt(e.target.value))} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StoryBar = ({ stories, isAdmin, onOpenStudio, onOpenStory }) => {
    return (
        <div className="aero-glass rounded-[40px] p-6 mb-8 overflow-x-auto scrollbar-hide group/storybar transition-all duration-700 hover:shadow-2xl border border-white/5">
            <div className="flex gap-6 items-center">
                <button
                    onClick={onOpenStudio}
                    className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer transition-all active:scale-95"
                >
                    <div className="relative w-20 h-20 rounded-[30px] bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-indigo-600 group-hover:border-indigo-400 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                        <Plus size={32} className="text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[10px] font-black text-white/40 group-hover:text-indigo-400 transition-colors uppercase tracking-[0.3em] font-outfit">Add Pulse</p>
                </button>

                <div className="w-px h-16 bg-white/5 mx-2"></div>

                {stories.map(story => (
                    <button key={story.id} onClick={() => onOpenStory(story)} className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer transition-all hover:scale-105 active:scale-95">
                        <div className={`relative p-1 rounded-[30px] transition-all duration-500 ${!story.viewed ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy p-[3px]' : 'bg-white/10'}`}>
                            <div className="bg-[#08080a] rounded-[27px] p-1">
                                <img src={story.avatar} className="w-[68px] h-[68px] rounded-[24px] object-cover ring-1 ring-white/10" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 rounded-2xl border-4 border-[#08080a] flex items-center justify-center shadow-xl">
                                {story.type === 'video' ? <Play size={12} className="text-white fill-current ml-0.5" /> :
                                    story.type === 'audio' ? <Mic size={12} className="text-white" /> :
                                        <Radio size={14} className="text-white" />}
                            </div>
                        </div>
                        <p className="text-[11px] font-bold text-white/60 font-outfit max-w-[80px] truncate tracking-tight">{story.username}</p>
                    </button>
                ))}

                {stories.length === 0 && (
                    <div className="flex-1 py-4 px-8 bg-white/5 rounded-[30px] border border-dashed border-white/10 animate-pulse">
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] font-outfit italic">Listening for vibes...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const PollCard = ({ poll, onVote }) => {
    return (
        <div className="aero-glass rounded-[48px] border border-white/5 shadow-2xl p-10 mb-12 group transition-all duration-700 hover:border-white/10 overflow-hidden relative floating-card">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] -ml-32 -mt-32"></div>

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                        <BarChart2 size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] font-outfit mb-1">Live Campus Poll</p>
                        <h3 className="text-xl font-black text-white font-outfit tracking-tight">{poll.question}</h3>
                    </div>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">Total Vibes</p>
                    <p className="text-xl font-black text-white font-outfit mt-1">{poll.options.reduce((a, b) => a + b.votes, 0)}</p>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                {poll.options.map((opt, i) => {
                    const total = poll.options.reduce((a, b) => a + b.votes, 0);
                    const pct = total === 0 ? 0 : Math.round((opt.votes / total) * 100);
                    return (
                        <button key={i} onClick={() => onVote(poll.id, i)} className="w-full text-left group/opt relative active:scale-[0.98] transition-all duration-300">
                            <div className="relative h-20 w-full bg-white/5 rounded-[24px] border border-white/10 overflow-hidden group-hover/opt:bg-white/10 transition-all duration-500 group-hover/opt:border-purple-500/30">
                                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600/40 to-indigo-600/20 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(168,85,247,0.2)]" style={{ width: `${pct}%` }}></div>
                                <div className="absolute inset-0 flex items-center justify-between px-8">
                                    <span className="text-[15px] font-bold text-white/80 group-hover/opt:text-white transition-colors">{opt.text}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[14px] font-black text-white/40 group-hover/opt:text-indigo-400 transition-colors uppercase tracking-widest">{pct}%</span>
                                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover/opt:bg-indigo-400 transition-colors"></div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <p className="mt-8 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em] font-outfit group-hover:text-purple-400/40 transition-colors">Multiple selections disabled • Results are live</p>
        </div>
    );
};
const LoginPortal = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [view, setView] = useState('login'); // 'login' or 'register'
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [fullName, setFullName] = useState('');

    // Typewriter State
    const words = ['interact', 'collaborate', 'discover'];
    const [displayText, setDisplayText] = React.useState('');
    const [wordIndex, setWordIndex] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [speed, setSpeed] = React.useState(150);

    React.useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                setDisplayText(currentWord.substring(0, displayText.length - 1));
                setSpeed(50);
            } else {
                setDisplayText(currentWord.substring(0, displayText.length + 1));
                setSpeed(150);
            }

            if (!isDeleting && displayText === currentWord) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleTyping, speed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, wordIndex, speed]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (view === 'register') {
            if (!profilePhoto) {
                setError('Please upload a profile photo');
                return;
            }
        }

        if (!email.toLowerCase().endsWith('@bmu.edu.in')) {
            setError('Access Restricted: Use @bmu.edu.in email');
            return;
        }
        const emailPrefix = email.split('@')[0].toLowerCase();
        const fullEmail = email.toLowerCase();

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (view === 'register') {
            // Save user profile
            const userProfile = {
                email: fullEmail,
                username: emailPrefix,
                fullName: emailPrefix.split('.')[0], // Default name from email
                profilePhoto: profilePhoto,
                password: password, // Store password for future logins (mock)
                registeredAt: Date.now()
            };

            // Save to localStorage
            localStorage.setItem(`bmu_user_${emailPrefix}`, JSON.stringify(userProfile));

            // Save to Firebase
            try {
                await db.collection('users').doc(emailPrefix).set({
                    email: userProfile.email,
                    username: emailPrefix,
                    fullName: emailPrefix.split('.')[0],
                    profilePhoto: profilePhoto,
                    password: password, // Store password for simple verification
                    registeredAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (error) {
                console.error('Error saving to Firebase:', error);
            }

            setShowSuccess(true);
            setTimeout(() => {
                onLogin({
                    email: userProfile.email,
                    username: emailPrefix,
                    fullName: emailPrefix.split('.')[0],
                    avatar: profilePhoto
                });
            }, 800);
        } else {
            // Login mode
            try {
                // Try localStorage first for quick login
                const savedUser = localStorage.getItem(`bmu_user_${emailPrefix}`);
                let userProfile = null;

                if (savedUser) {
                    userProfile = JSON.parse(savedUser);
                    // Simple password check
                    if (userProfile.password !== password) {
                        setError('Invalid secret key');
                        setIsLoading(false);
                        return;
                    }
                } else {
                    // Try Firebase
                    const userDoc = await db.collection('users').doc(emailPrefix).get();
                    if (userDoc.exists) {
                        userProfile = userDoc.data();
                        // Security fix: check password from Firestore
                        if (userProfile.password !== password) {
                            setError('Invalid secret key');
                            setIsLoading(false);
                            return;
                        }
                        userProfile.avatar = userProfile.profilePhoto;
                    }
                }

                if (userProfile) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        onLogin({
                            email: userProfile.email,
                            username: emailPrefix,
                            fullName: userProfile.fullName,
                            avatar: userProfile.avatar || userProfile.profilePhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'
                        });
                    }, 800);
                } else {
                    setError('Account not found. Please sign up.');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Login failed. Please try again.');
            }
        }

        setIsLoading(false);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 2;
        const y = (clientY / window.innerHeight - 0.5) * 2;
        setMousePos({ x, y });
    };

    const photos = [
        'college/classroom.jpg',
        'college/mph.jpg',
        'college/campus life.jpeg',
        'college/cafe.jpg',
        'college/two.jpg'
    ];

    return (
        <div
            className="min-h-screen relative overflow-hidden bg-[#0a0a0c] font-outfit flex items-center justify-center p-6"
            onMouseMove={handleMouseMove}
        >
            {/* Immersive Parallax Background */}
            <div
                className="absolute inset-0 z-0 flex flex-col justify-center gap-6 tilted-background scale-110 animate-entrance-bg opacity-20"
                style={{
                    transform: `perspective(2000px) rotateX(10deg) rotateY(10deg) translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0)`
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`horizontal-strip ${i % 2 === 0 ? 'animate-slide-right-slow' : 'animate-slide-left-fast'}`}>
                        {[...photos, ...photos, ...photos].map((src, j) => (
                            <img key={j} src={src} className="strip-image w-80 h-48 rounded-[32px] object-cover mx-3 border border-white/5 shadow-2xl" />
                        ))}
                    </div>
                ))}
            </div>

            {/* Dynamic Volumetric Overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(244,63,94,0.1),transparent_50%)] z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#0a0a0c]/60 backdrop-blur-[2px] z-10"></div>

            {/* Premium Portal Container */}
            <div className="relative z-20 w-full max-w-[420px] animate-scale-in">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-[28px] shadow-3xl shadow-indigo-500/20 mb-6 group cursor-pointer hover:rotate-[360deg] transition-all duration-1000">
                        <Radio size={40} className="text-white" />
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-3">
                        BMU <span className="premium-gradient-text">PORTAL</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 h-6">
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] font-outfit">Synchronize and {displayText}</p>
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,1)]"></span>
                    </div>
                </div>

                <div className="aero-glass rounded-[56px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden p-2 relative group/card">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>

                    {/* View Switcher */}
                    <div className="flex bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/5 p-1.5 mb-2 relative z-10">
                        <button
                            onClick={() => { setView('login'); setError(''); }}
                            className={`flex-1 py-4 px-6 rounded-[24px] font-black text-[11px] uppercase tracking-widest transition-all duration-500 ${view === 'login' ? 'bg-white text-black shadow-2xl translate-z-10' : 'text-white/40 hover:text-white'}`}
                        >
                            Authenticate
                        </button>
                        <button
                            onClick={() => { setView('register'); setError(''); }}
                            className={`flex-1 py-4 px-6 rounded-[24px] font-black text-[11px] uppercase tracking-widest transition-all duration-500 ${view === 'register' ? 'bg-white text-black shadow-2xl translate-z-10' : 'text-white/40 hover:text-white'}`}
                        >
                            Initiate
                        </button>
                    </div>

                    <div className="p-8 relative z-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {view === 'register' && (
                                <div className="flex flex-col items-center mb-8">
                                    <div className="relative group/photo">
                                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="portal-photo-upload" />
                                        <label htmlFor="portal-photo-upload" className="cursor-pointer block">
                                            {profilePhoto ? (
                                                <div className="w-24 h-24 rounded-[32px] overflow-hidden border-2 border-white/20 shadow-2xl group-hover/photo:scale-105 transition-all duration-500">
                                                    <img src={profilePhoto} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Camera size={20} className="text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-24 h-24 rounded-[32px] bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center hover:border-indigo-500 hover:bg-white/10 transition-all duration-500 group-hover/photo:scale-105">
                                                    <Camera size={28} className="text-white/20 mb-2" />
                                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Upload Identity</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="relative group/input">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-indigo-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="BMU EMAIL (@BMU.EDU.IN)"
                                        className="w-full pl-16 pr-6 py-5 rounded-[24px] bg-white/5 border border-white/5 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all text-white font-black text-[11px] tracking-widest placeholder:text-white/10"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative group/input">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-indigo-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="SECRET KEY"
                                        className="w-full pl-16 pr-6 py-5 rounded-[24px] bg-white/5 border border-white/5 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all text-white font-black text-[11px] tracking-widest placeholder:text-white/10"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest p-5 rounded-[24px] border border-rose-500/20 flex items-center gap-4 animate-shake">
                                    <AlertCircle size={18} /> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || showSuccess}
                                className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[28px] font-black text-[12px] uppercase tracking-[0.3em] shadow-3xl shadow-indigo-600/20 hover:scale-[1.02] hover:shadow-indigo-600/40 transition-all active:scale-95 disabled:opacity-50 overflow-hidden relative group/btn"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                ) : showSuccess ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        Frequency Synced
                                    </span>
                                ) : (
                                    view === 'login' ? 'Activate Session' : 'Initiate Sequence'
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] font-outfit">
                                Security Protocol v4.0 • Encrypted Connection
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Volumetric Particles */}
            <div className="particles-container opacity-30">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${15 + Math.random() * 10}s`,
                        background: i % 2 === 0 ? '#6366f1' : '#f43f5e'
                    }}></div>
                ))}
            </div>
        </div>
    );
};

const Sidebar = ({ activeTab, setActiveTab, currentUser, onLogout }) => {
    const menuItems = [
        { id: 'home', icon: Home, label: 'Feed' },
        { id: 'explore', icon: Search, label: 'Explore' },
        { id: 'events', icon: Calendar, label: 'Events' },
        { id: 'notifications', icon: Heart, label: 'Alerts' },
        { id: 'create', icon: PlusSquare, label: 'Post' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="hidden md:flex flex-col w-20 lg:w-64 h-[calc(100vh-32px)] fixed left-4 top-4 aero-glass rounded-[40px] z-sidebar px-4 py-8 pointer-events-auto transition-all duration-700 hover:shadow-2xl select-none group/sidebar">
            <div className="flex items-center gap-4 mb-12 px-2 lg:px-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover/sidebar:opacity-40 transition-opacity"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/20 transition-all duration-500 group-hover/sidebar:rotate-[360deg] group-hover/sidebar:scale-110">
                        <Radio size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <div className="hidden lg:block">
                    <h1 className="text-lg font-black text-white tracking-widest font-outfit leading-tight">BMU</h1>
                    <p className="text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase opacity-80">Portal</p>
                </div>
            </div>

            <nav className="space-y-3 flex-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-[24px] transition-all duration-500 group relative overflow-hidden ${isActive
                                ? 'bg-white/10 text-white shadow-2xl shadow-black/20'
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {isActive && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 animate-pulse"></div>}
                            <Icon size={22} className={`shrink-0 transition-all duration-500 relative z-10 ${isActive ? 'scale-110 text-indigo-400' : 'group-hover:scale-110 group-hover:text-white'}`} />
                            <span className={`hidden lg:block font-bold text-[13px] font-outfit tracking-wider transition-all relative z-10 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-100 group-hover:translate-x-1'}`}>
                                {item.label}
                            </span>
                            {isActive && <div className="absolute right-3 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></div>}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5">
                <button onClick={onLogout} className="w-full flex items-center gap-4 p-4 rounded-[24px] text-white/30 hover:text-rose-500 hover:bg-rose-500/5 transition-all duration-500 group">
                    <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden lg:block font-bold text-[13px] font-outfit uppercase tracking-widest">Logout</span>
                </button>
            </div>
        </div>
    );
};


const EventsView = ({ events, isAdmin, onAddEvent }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', date: '', club: '', type: 'Fest', countdown: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.date) return;
        onAddEvent({ ...formData, id: Date.now() });
        setFormData({ title: '', date: '', club: '', type: 'Fest', countdown: '' });
        setShowForm(false);
    };

    return (
        <div className="space-y-16 animate-fade-in mb-32">
            <div className="flex justify-between items-end px-4">
                <div>
                    <h2 className="text-6xl font-black text-white font-outfit tracking-tighter mb-3 leading-none uppercase">Campus<br /><span className="premium-gradient-text tracking-normal">Frequency</span></h2>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-1 bg-indigo-500 rounded-full"></div>
                        <p className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.4em] font-outfit">Synchronized Timeline</p>
                    </div>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-8 py-5 aero-glass border-white/10 text-white rounded-[28px] text-[10px] font-black shadow-3xl hover:bg-white hover:text-black transition-all flex items-center gap-4 group active:scale-95 font-outfit uppercase tracking-[0.3em]"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                        Schedule
                    </button>
                )}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-[#08080a]/80 z-[200] flex items-center justify-center p-6 backdrop-blur-xl animate-fade-in">
                    <form onSubmit={handleSubmit} className="aero-glass w-full max-w-xl rounded-[60px] p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 space-y-8 relative overflow-hidden group/form">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <h3 className="text-3xl font-black text-white font-outfit tracking-tight">Schedule Moment</h3>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Universal Frequency Broadcast</p>
                            </div>
                            <button type="button" onClick={() => setShowForm(false)} className="w-14 h-14 rounded-3xl bg-white/5 hover:bg-rose-500 text-white transition-all flex items-center justify-center active:scale-90"><X size={28} /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Headline</p>
                                <input type="text" placeholder="Gala 2024" className="w-full bg-white/5 p-5 rounded-[24px] outline-none text-white border border-white/5 focus:border-indigo-500/30 transition-all font-bold placeholder:text-white/10" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Organizer</p>
                                <input type="text" placeholder="Club Name" className="w-full bg-white/5 p-5 rounded-[24px] outline-none text-white border border-white/5 focus:border-indigo-500/30 transition-all font-bold placeholder:text-white/10" value={formData.club} onChange={e => setFormData({ ...formData, club: e.target.value })} required />
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Date</p>
                                <input type="text" placeholder="Jan 15" className="w-full bg-white/5 p-5 rounded-[24px] outline-none text-white border border-white/5 focus:border-indigo-500/30 transition-all font-bold placeholder:text-white/10" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Countdown</p>
                                <input type="text" placeholder="10 Days" className="w-full bg-white/5 p-5 rounded-[24px] outline-none text-white border border-white/5 focus:border-indigo-500/30 transition-all font-bold placeholder:text-white/10" value={formData.countdown} onChange={e => setFormData({ ...formData, countdown: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Classification</p>
                            <select className="w-full bg-white/5 p-5 rounded-[24px] outline-none text-white border border-white/5 focus:border-indigo-500/30 transition-all font-bold appearance-none cursor-pointer" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option className="bg-slate-900">Fest</option>
                                <option className="bg-slate-900">Academic</option>
                                <option className="bg-slate-900">Performance</option>
                                <option className="bg-slate-900">Workshop</option>
                            </select>
                        </div>

                        <div className="flex gap-4 pt-4 relative z-10">
                            <button type="submit" className="flex-1 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[28px] font-black text-xs hover:scale-105 transition-all shadow-2xl uppercase tracking-[0.3em] font-outfit">Broadcast Event</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-8 px-2">
                {events.length === 0 ? (
                    <div className="text-center py-40 aero-glass rounded-[60px] border border-white/5 flex flex-col items-center group overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="w-24 h-24 bg-white/5 rounded-[36px] border border-white/10 shadow-2xl flex items-center justify-center mb-10 text-white/10 group-hover:scale-110 group-hover:text-indigo-400 transition-all duration-700 relative z-10">
                            <Calendar size={48} />
                        </div>
                        <h3 className="text-white/40 font-black font-outfit text-xl uppercase tracking-[0.4em] relative z-10">No Frequencies Detected</h3>
                        <p className="text-white/10 text-[10px] mt-4 font-bold uppercase tracking-[0.8em] relative z-10">Listening for campus vibrations...</p>
                    </div>
                ) : (
                    events.map(event => (
                        <div key={event.id} className="aero-glass rounded-[56px] p-12 group hover:border-white/10 transition-all duration-700 cursor-pointer border border-white/5 relative overflow-hidden floating-card shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000"></div>

                            <div className="flex justify-between items-start relative z-10">
                                <div className="space-y-8 flex-1">
                                    <div className="flex items-center gap-5">
                                        <div className="px-5 py-2 aero-glass border-indigo-500/30 text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-widest font-outfit">{event.type}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"></div>
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] font-outfit">{event.club}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-black text-white text-5xl font-outfit tracking-tighter group-hover:text-indigo-400 transition-colors leading-[1] max-w-xl uppercase">{event.title}</h3>
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-4 py-3 px-6 aero-glass border-white/5 rounded-2xl text-white/60 text-[11px] font-black uppercase tracking-widest font-outfit">
                                            <Calendar size={16} className="text-indigo-400" />
                                            {event.date}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center bg-white text-black p-8 rounded-[40px] shadow-3xl min-w-[140px] transition-transform group-hover:-rotate-3 duration-500 ring-8 ring-white/5">
                                    <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] mb-2 font-outfit">T-Minus</p>
                                    <div className="flex flex-col">
                                        <p className="text-5xl font-black font-outfit leading-none tracking-tighter">{event.countdown.split(' ')[0]}</p>
                                        <p className="text-[10px] font-black text-black/40 uppercase tracking-widest mt-1">{event.countdown.split(' ')[1] || 'DAYS'}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-12 py-6 aero-glass border-white/5 hover:bg-white hover:text-black hover:border-white text-white/30 rounded-[32px] text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-700 font-outfit group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)] flex items-center justify-center gap-4">
                                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-700" />
                                Secure Access Token
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const CreatePost = ({ user, onPost }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        onPost({ text, image });
        setText('');
        setImage(null);
    };

    return (
        <div className="aero-glass rounded-[48px] border border-white/5 shadow-2xl p-10 mb-12 group transition-all duration-700 hover:border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

            <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="relative p-0.5 rounded-[22px] bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl">
                    <img src={user.avatar} className="w-14 h-14 rounded-[20px] object-cover border-2 border-[#08080a]" />
                </div>
                <div className="flex-1 leading-tight">
                    <h4 className="text-white font-black text-lg font-outfit tracking-tight">Broadcast Pulse</h4>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Sharing as {user.username}</p>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Capture the campus frequency..."
                    className="w-full bg-white/5 p-6 rounded-[32px] outline-none text-[16px] resize-none border border-white/5 focus:border-indigo-500/30 focus:ring-8 focus:ring-indigo-500/5 transition-all font-medium placeholder:text-white/20 text-white min-h-[140px]"
                />

                {image && (
                    <div className="relative rounded-[32px] overflow-hidden border border-white/5 shadow-2xl group/preview">
                        <img src={image} className="w-full h-64 object-cover transition-transform duration-700 group-hover/preview:scale-105" />
                        <button onClick={() => setImage(null)} className="absolute top-4 right-4 w-12 h-12 bg-black/60 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-rose-500 transition-all shadow-xl">
                            <Trash2 size={24} />
                        </button>
                    </div>
                )}

                <div className="flex items-center gap-4 pt-6">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 px-6 py-4 rounded-[24px] bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all font-black text-xs uppercase tracking-widest font-outfit group/act">
                        <Camera size={20} className="group-hover/act:scale-110 group-hover/act:rotate-6 transition-transform" />
                        Photo
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 rounded-[24px] bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all font-black text-xs uppercase tracking-widest font-outfit group/act">
                        <Mic size={20} className="group-hover/act:scale-110 group-hover/act:rotate-6 transition-transform" />
                        Audio
                    </button>

                    <button
                        onClick={handlePost}
                        disabled={!text && !image}
                        className={`ml-auto px-10 py-4 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] font-outfit shadow-2xl transition-all duration-500 flex items-center gap-3 ${(!text && !image) ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 hover:shadow-indigo-500/20 active:scale-95'}`}
                    >
                        <Send size={18} />
                        Broadcast
                    </button>
                </div>
            </div>
        </div>
    );
};

const RightSidebar = ({ users, followedClubs, onFollow, onUnfollow, onChat }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedUsers = showAll ? users : users.slice(0, 4);

    return (
        <div className="hidden lg:flex flex-col w-[350px] fixed right-0 top-0 h-screen bg-transparent z-sidebar px-6 py-8 pointer-events-none">
            <div className="pointer-events-auto space-y-10 custom-scrollbar overflow-y-auto h-full pr-2 mask-fade-bottom">

                {/* Search */}
                <div className="aero-glass rounded-[32px] p-2 pr-6 flex items-center group transition-all duration-700 hover:shadow-indigo-500/10 border border-white/5 relative overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-14 h-14 bg-white/5 rounded-[24px] flex items-center justify-center text-white/20 group-focus-within:text-indigo-400 group-focus-within:bg-indigo-500/10 transition-all ml-1 relative z-10 border border-white/5"><Search size={22} /></div>
                    <input type="text" placeholder="Search Frequency..." className="bg-transparent border-none outline-none ml-4 text-sm w-full font-black text-white placeholder:text-white/20 font-outfit relative z-10 uppercase tracking-tight" />
                </div>

                {users.length > 0 && (
                    <div className="aero-glass rounded-[48px] p-8 border border-white/5 shadow-2xl relative overflow-hidden group/discovery floating-card">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[80px] -mr-16 -mt-16 group-hover/discovery:scale-150 transition-transform duration-1000"></div>
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] font-outfit">Discovery</p>
                                <h3 className="font-black text-white text-xl uppercase tracking-tighter mt-1 font-outfit">New Vibes</h3>
                            </div>
                            {users.length > 4 && (
                                <button onClick={() => setShowAll(!showAll)} className="w-12 h-12 rounded-2xl aero-glass border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all text-xs font-black">
                                    {showAll ? <ArrowRight size={20} className="rotate-180" /> : <Plus size={20} />}
                                </button>
                            )}
                        </div>
                        <div className="space-y-7 relative z-10">
                            {displayedUsers.map(user => (
                                <div key={user.id} className="flex items-center justify-between group/user cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="relative p-0.5 rounded-[20px] bg-white/5 border border-white/10 group-hover/user:bg-indigo-500 group-hover/user:border-indigo-400 transition-all duration-500">
                                            <img src={user.avatar} className="w-11 h-11 rounded-[18px] object-cover" />
                                        </div>
                                        <div className="leading-tight">
                                            <p className="font-black text-sm text-white/90 truncate w-32 font-outfit tracking-tight group-hover/user:text-indigo-400 transition-colors">{user.username}</p>
                                            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest truncate w-32 font-outfit">Club Entity</p>
                                        </div>
                                    </div>
                                    <button onClick={() => onFollow(user.id)} className="w-9 h-9 flex items-center justify-center bg-white/5 text-white/40 rounded-xl hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all shadow-xl"><Plus size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Radio Schedule Widget */}
                <div className="aero-glass rounded-[48px] p-8 border border-white/5 shadow-2xl group/radio floating-card overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[80px] -mr-16 -mt-16 group-hover/radio:scale-150 transition-transform duration-1000"></div>
                    <div className="flex items-center gap-6 mb-10 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-tr from-rose-500 to-orange-600 rounded-[28px] flex items-center justify-center text-white shadow-3xl shadow-rose-500/20 group-hover:rotate-12 transition-transform duration-700 border border-white/10">
                            <Radio size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] animate-pulse font-outfit">Air Frequency</p>
                            <h3 className="font-black text-white text-xl uppercase tracking-tighter mt-1 font-outfit">Live Schedule</h3>
                        </div>
                    </div>
                    <div className="space-y-4 relative z-10">
                        {[
                            { time: '12 PM', show: 'The Buzz', rj: 'Vikram', active: true },
                            { time: '02 PM', show: 'Uncut', rj: 'Sneha', active: false },
                            { time: '04 PM', show: 'Lofi', rj: 'Auto', active: false }
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center gap-5 p-5 rounded-[28px] transition-all duration-500 cursor-pointer border ${item.active ? 'bg-white/10 border-white/20 shadow-2xl shadow-black/20' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}>
                                <div className={`text-[10px] font-black w-14 font-outfit tracking-widest ${item.active ? 'text-rose-400' : 'text-white/20'}`}>{item.time}</div>
                                <div className="flex-1">
                                    <p className={`text-[14px] font-black font-outfit tracking-tight leading-none mb-1.5 ${item.active ? 'text-white' : 'text-white/60'}`}>{item.show}</p>
                                    <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${item.active ? 'text-rose-400/60' : 'text-white/20'}`}>RJ {item.rj}</p>
                                </div>
                                {item.active && <div className="relative flex items-center justify-center">
                                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping absolute"></div>
                                    <div className="w-2 h-2 bg-rose-500 rounded-full relative"></div>
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Following Feed */}
                {followedClubs.length > 0 && (
                    <div className="aero-glass rounded-[48px] p-8 shadow-2xl relative overflow-hidden group/circle floating-card border border-white/5">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-[100px] -mr-20 -mt-20 group-hover/circle:scale-150 transition-transform duration-1000"></div>
                        <div className="flex items-center gap-5 mb-10 relative z-10">
                            <div className="w-12 h-12 rounded-2xl aero-glass border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl"><Heart size={24} className="fill-indigo-500" /></div>
                            <div>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] font-outfit">Your Synergy</p>
                                <h3 className="font-black text-white text-xl uppercase tracking-tighter mt-1 font-outfit">Circle</h3>
                            </div>
                        </div>
                        <div className="space-y-7 relative z-10">
                            {followedClubs.map(club => (
                                <div key={club.id} className="flex items-center justify-between group cursor-pointer" onClick={() => onChat(club)}>
                                    <div className="flex items-center gap-4">
                                        <div className="relative p-0.5 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all duration-500">
                                            <img src={club.avatar} className="w-11 h-11 rounded-[18px] object-cover" />
                                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-4 border-[#030304] shadow-lg"></div>
                                        </div>
                                        <div className="leading-tight">
                                            <p className="font-black text-sm text-white/90 truncate w-32 group-hover:translate-x-1 transition-transform font-outfit">{club.username}</p>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-0.5">Connected</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black hover:scale-110 active:scale-95 transition-all shadow-xl border border-white/5"><MessageCircle size={18} /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-8 pb-12 text-center relative z-10 px-6 opacity-30">
                    <p className="text-[10px] text-white font-black uppercase tracking-[0.8em] font-outfit">BMU RADIO PORTAL</p>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(INITIAL_USER_TEMPLATE);
    const [activeTab, setActiveTab] = useState('home');
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [users, setUsers] = useState([]);
    const [followedClubs, setFollowedClubs] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [notification, setNotification] = useState(null);

    // New Feature States
    const [isRadioPlaying, setIsRadioPlaying] = useState(false);
    const [activeStory, setActiveStory] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [campusEvents, setCampusEvents] = useState([]);
    const [campusStories, setCampusStories] = useState([]);

    // Story Studio States
    const [showStudio, setShowStudio] = useState(false);
    const [studioMoment, setStudioMoment] = useState('');
    const [studioMedia, setStudioMedia] = useState(null);
    const [studioType, setStudioType] = useState('text');
    const [studioClubId, setStudioClubId] = useState('');
    const [activeMimeType, setActiveMimeType] = useState('image/*,video/*,audio/*');
    const studioFileInputRef = useRef(null);

    const handleStudioFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStudioMedia(reader.result);
                if (file.type.startsWith('video')) setStudioType('video');
                else if (file.type.startsWith('audio')) setStudioType('audio');
                else setStudioType('image');
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerStudioPicker = (type) => {
        setActiveMimeType(type);
        setTimeout(() => studioFileInputRef.current?.click(), 10);
    };

    const handleStudioUpload = (e) => {
        e.preventDefault();
        let postingUser = isAdmin ? users.find(u => u.id === studioClubId) : currentUser;
        if (!postingUser) return;

        const newStory = {
            id: Date.now(),
            clubId: postingUser.id || postingUser.username,
            username: postingUser.username,
            avatar: postingUser.avatar,
            moment: studioMoment || (studioType === 'text' ? "Pulse check! ✨" : ""),
            media: studioMedia,
            type: studioType,
            timestamp: Date.now()
        };

        db.collection('stories').add(newStory);
        showNotification("Pulse Captured! 🚀");

        // Reset
        setShowStudio(false);
        setStudioMoment('');
        setStudioMedia(null);
        setStudioType('text');
        setStudioClubId('');
    };

    // Handle Login
    const handleLogin = (userData) => {
        setIsAuthenticated(true);
        setCurrentUser({
            username: userData.username || (userData.email ? userData.email.split('@')[0] : 'user'),
            fullName: userData.fullName || userData.username || 'Student',
            email: userData.email,
            avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
            isAdmin: userData.email === 'vivek.yadav.25cse@bmu.edu.in'
        });
        setIsAdmin(userData.email === 'vivek.yadav.25cse@bmu.edu.in');
    };

    // Firestore Sync: Events
    useEffect(() => {
        const unsubscribe = db.collection('events').orderBy('id', 'desc').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            setCampusEvents(data);
        });
        return () => unsubscribe();
    }, []);

    // Firestore Sync: Stories
    useEffect(() => {
        const unsubscribe = db.collection('stories').orderBy('id', 'desc').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            setCampusStories(data);
        });
        return () => unsubscribe();
    }, []);

    // Firestore Sync: Posts
    useEffect(() => {
        const unsubscribe = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            setPosts(data);
        });
        return () => unsubscribe();
    }, []);

    // Firestore Sync: Users
    useEffect(() => {
        // For this app, we iterate all users. Real apps might limit this.
        const unsubscribe = db.collection('users').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                username: doc.data().username,
                fullName: doc.data().fullName,
                avatar: doc.data().profilePhoto || doc.data().avatar,
                verified: false // default
            }));
            if (data.length > 0) setUsers(data);
            else setUsers(SUGGESTED_USERS); // Fallback to mock if empty
        });
        return () => unsubscribe();
    }, []);

    // Audio Engine
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(80);

    useEffect(() => {
        // Initialize audio instance with fallback stream
        audioRef.current = new Audio('https://stream.zeno.fm/0r0xa792kwzuv');
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        const handlePlayback = async () => {
            if (!audioRef.current) return;
            if (isRadioPlaying) {
                try {
                    await audioRef.current.play();
                } catch (err) {
                    console.error("Playback failed:", err);
                    setIsRadioPlaying(false);
                    showNotification("Interaction required to play audio 📻");
                }
            } else {
                audioRef.current.pause();
            }
        };
        handlePlayback();
    }, [isRadioPlaying]);


    // Shortcut listener for Admin Mode
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
                e.preventDefault();
                setIsAdmin(prev => {
                    const newState = !prev;
                    showNotification(newState ? "Admin Mode Activated! 🔓" : "Admin Mode Deactivated 🔐");
                    return newState;
                });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const [pollData, setPollData] = useState({
        id: 1,
        question: "Which club event are you most excited for this month?",
        options: [
            { text: "PFA Dance Night", votes: 42 },
            { text: "TSEC Hackathon", votes: 89 },
            { text: "Robotics Workshop", votes: 31 },
            { text: "Strokes Art Gallery", votes: 55 }
        ]
    });

    const handleFollow = (id) => {
        const club = users.find(u => u.id === id);
        if (club) {
            setUsers(users.filter(u => u.id !== id));
            setFollowedClubs([...followedClubs, club]);
            showNotification(`Following ${club.username}`);
        }
    };

    const handleUnfollow = (id) => {
        const club = followedClubs.find(c => c.id === id);
        if (club) {
            setFollowedClubs(followedClubs.filter(c => c.id !== id));
            setUsers([...users, club]);
            if (activeChat?.id === id) setActiveChat(null);
            showNotification(`Unfollowed ${club.username}`);
        }
    };

    const showNotification = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 3000); };

    if (!isAuthenticated) return <LoginPortal onLogin={handleLogin} />;

    return (
        <div className="min-h-screen relative text-slate-900 font-sans flex justify-center overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Subtle light background pattern */}
            <div className="fixed inset-0 opacity-30 z-background pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} onLogout={() => setIsAuthenticated(false)} />

            <main className="w-full md:max-w-xl lg:max-w-2xl md:ml-28 lg:ml-80 lg:mr-96 min-h-screen bg-transparent relative z-0 pb-32 md:pb-24 px-4 md:px-0">
                {activeTab === 'home' && (
                    <div className="max-w-2xl mx-auto space-y-6 pt-6">
                        <StoryBar
                            stories={campusStories}
                            isAdmin={isAdmin}
                            onOpenStudio={() => setShowStudio(true)}
                            onOpenStory={setActiveStory}
                        />

                        <div className="hidden md:block">
                            <CreatePost
                                onPost={(Data) => {
                                    const newPost = {
                                        id: Date.now(),
                                        userId: currentUser.id,
                                        user: currentUser,
                                        content: Data.text,
                                        image: Data.image,
                                        likes: 0,
                                        comments: [],
                                        timestamp: Date.now()
                                    };
                                    db.collection('posts').add(newPost);
                                    showNotification('Posted!');
                                }}
                                user={currentUser}
                            />
                        </div>

                        <div className="space-y-6">
                            <PollCard poll={pollData} onVote={(id, idx) => showNotification("Vote registered!")} />

                            {posts.map(p => (
                                <PostCard
                                    key={p.docId || p.id}
                                    post={p}
                                    onLike={(pid) => {
                                        const doc = posts.find(post => (post.id === pid || post.docId === pid));
                                        if (doc && doc.docId) {
                                            db.collection('posts').doc(doc.docId).update({
                                                likes: firebase.firestore.FieldValue.increment(1)
                                            });
                                        }
                                    }}
                                    onAddComment={(pid, txt) => {
                                        const doc = posts.find(post => (post.id === pid || post.docId === pid));
                                        if (doc && doc.docId) {
                                            // Add to separate comments collection as per rules
                                            db.collection('comments').add({
                                                postId: doc.docId,
                                                userId: currentUser.username, // Using username as ID for simplicity
                                                username: currentUser.username,
                                                text: txt,
                                                avatar: currentUser.avatar,
                                                timestamp: Date.now()
                                            }).then(() => {
                                                showNotification("Whisper added! 💬");
                                            });
                                        }
                                    }}
                                    isAdmin={isAdmin}
                                    onDelete={(pid) => {
                                        if (window.confirm("Delete this whisper?")) {
                                            db.collection('posts').doc(pid).delete();
                                            showNotification("Whisper deleted");
                                        }
                                    }}
                                    user={currentUser}
                                />
                            ))}

                            {posts.length === 0 && (
                                <div className="text-center py-20 px-6 bg-white/40 backdrop-blur-md rounded-[32px] border border-slate-100">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <Radio size={32} className="text-slate-300" />
                                    </div>
                                    <h3 className="font-black text-slate-800 text-lg font-outfit">Feed is Empty</h3>
                                    <p className="text-slate-400 text-sm mt-2 font-medium">Follow clubs to see their updates!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <EventsView
                        events={campusEvents}
                        isAdmin={isAdmin}
                        onAddEvent={(newEv) => {
                            db.collection('events').add(newEv);
                            showNotification("Event Scheduled! 📅");
                        }}
                    />
                )}

                {activeTab === 'explore' && (
                    <div className="max-w-2xl mx-auto pt-12">
                        <div className="text-center py-24 px-6 bg-white/40 backdrop-blur-md rounded-[40px] border border-slate-100">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-100/50">
                                <Search size={36} className="text-indigo-500" />
                            </div>
                            <h3 className="font-black text-slate-900 text-2xl font-outfit mb-2">Explore BMU Clubs</h3>
                            <p className="text-slate-500 text-sm font-medium">Discover 20+ active communities on campus</p>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="max-w-2xl mx-auto pt-8 space-y-4">
                        <div className="px-2 mb-6">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 font-outfit">Updates</p>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">Campus Alerts</h2>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-[28px] border border-indigo-100 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                                <AlertCircle className="text-white" size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 font-outfit mb-1">New Radio Show</p>
                                <p className="text-xs text-indigo-700 font-medium leading-relaxed">RJ Vikram is live now with "The Midnight Buzz"</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="max-w-2xl mx-auto pt-16">
                        <div className="text-center py-20 px-10 aero-glass rounded-[56px] border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden group/profile">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover/profile:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative inline-block mb-10">
                                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
                                <img src={currentUser.avatar} className="w-40 h-40 rounded-[48px] border-4 border-white shadow-3xl object-cover relative z-10 hover:scale-105 transition-transform duration-700" />
                                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-green-500 rounded-[20px] border-4 border-white shadow-2xl z-20 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                                </div>
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 font-outfit mb-3 tracking-tighter uppercase">{currentUser.username}</h2>
                            <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em] mb-8">Synchronized • BMU Frequency</p>

                            <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto">
                                <div className="p-6 aero-glass rounded-[32px] border-white/10">
                                    <p className="text-2xl font-black text-slate-900 leading-none mb-1">128</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pulses</p>
                                </div>
                                <div className="p-6 aero-glass rounded-[32px] border-white/10">
                                    <p className="text-2xl font-black text-slate-900 leading-none mb-1">4.2k</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vibes</p>
                                </div>
                                <div className="p-6 aero-glass rounded-[32px] border-white/10">
                                    <p className="text-2xl font-black text-slate-900 leading-none mb-1">56</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Circles</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <RadioPlayer
                isPlaying={isRadioPlaying}
                onToggle={() => {
                    const newState = !isRadioPlaying;
                    setIsRadioPlaying(newState);
                    showNotification(newState ? "Radio is Live! 📻" : "Radio paused");
                }}
                currentShow="The Midnight Buzz"
                rjName="Vikram"
                volume={volume}
                onVolumeChange={setVolume}
            />

            {/* Story Viewer Overlay */}
            {activeStory && (
                <div className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center animate-fade-in" onClick={() => setActiveStory(null)}>
                    <div className="absolute top-0 left-0 right-0 h-1.5 z-50 flex gap-1.5 p-3">
                        <div className="h-full bg-white/20 flex-1 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-full origin-left animate-progress shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
                        </div>
                    </div>

                    <div className="relative max-w-lg w-full h-[100dvh] md:h-[90vh] md:rounded-[56px] overflow-hidden bg-black flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
                        {/* Media Layer */}
                        <div className="flex-1 relative flex items-center justify-center">
                            {activeStory.type === 'video' ? (
                                <video src={activeStory.media} className="w-full h-full object-contain" autoPlay loop muted playsInline />
                            ) : activeStory.type === 'audio' ? (
                                <div className="text-center space-y-12 animate-float">
                                    <div className="w-56 h-56 rounded-[56px] bg-gradient-to-br from-indigo-500/20 to-purple-600/40 flex items-center justify-center relative group">
                                        <div className="absolute inset-0 rounded-[56px] border-4 border-indigo-500/30 animate-pulse"></div>
                                        <div className="w-40 h-40 rounded-[48px] bg-indigo-600 flex items-center justify-center shadow-3xl shadow-indigo-500/50 group-hover:scale-110 transition-transform duration-700">
                                            <Mic size={72} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="aero-glass px-10 py-6 rounded-[32px] border border-white/10">
                                        <audio src={activeStory.media} autoPlay controls className="w-72 h-8" />
                                    </div>
                                </div>
                            ) : activeStory.type === 'image' ? (
                                <img src={activeStory.media} className="w-full h-full object-contain" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-16 bg-gradient-to-br from-indigo-950 via-[#0a0a0c] to-black text-center relative overflow-hidden">
                                    <Radio size={300} className="text-indigo-500/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 blur-3xl" />
                                    <h2 className="text-5xl md:text-6xl font-black text-white font-outfit uppercase tracking-tighter leading-tight drop-shadow-[0_20px_50px_rgba(99,102,241,0.3)] relative z-10">{activeStory.moment}</h2>
                                    <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mt-12 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
                                </div>
                            )}
                        </div>

                        {/* Info Overlay */}
                        <div className="absolute top-0 left-0 right-0 p-8 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center gap-5 z-20">
                            <div className="p-0.5 rounded-[20px] bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-xl">
                                <img src={activeStory.avatar} className="w-14 h-14 rounded-[18px] object-cover border-2 border-black" />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-lg font-outfit tracking-tight leading-none mb-1">{activeStory.username}</h4>
                                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] opacity-80">{new Date(activeStory.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • LIVE</p>
                            </div>
                            <button className="ml-auto w-12 h-12 rounded-[22px] bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-rose-500/80 transition-all active:scale-90" onClick={() => setActiveStory(null)}><X size={24} /></button>
                        </div>

                        {/* Content Overlay */}
                        {(activeStory.type !== 'text' && activeStory.moment) && (
                            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/60 to-transparent pt-32">
                                <p className="text-white text-2xl font-bold font-outfit leading-snug drop-shadow-2xl">{activeStory.moment}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Story Studio - Immersive Overhaul */}
            {showStudio && (
                <div className="fixed inset-0 z-[3000] flex flex-col animate-fade-in overflow-hidden">
                    <div className="mesh-gradient-studio absolute inset-0"></div>
                    <div className="noise-overlay opacity-40"></div>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

                    {/* Header */}
                    <div className="relative z-10 flex justify-between items-center p-10">
                        <button onClick={() => setShowStudio(false)} className="w-16 h-16 rounded-[28px] aero-glass border-white/10 flex items-center justify-center text-white hover:bg-rose-500 transition-all active:scale-90 group">
                            <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-white font-outfit tracking-tighter uppercase mb-2 leading-none">Studio<span className="premium-gradient-text tracking-normal ml-2">v2</span></h3>
                            <div className="flex items-center justify-center gap-3">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,1)]"></span>
                                <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em]">Enhanced Frequency Matrix</p>
                            </div>
                        </div>
                        <div className="w-16"></div>
                    </div>

                    <form onSubmit={handleStudioUpload} className="flex-1 flex flex-col relative z-10 overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-12 flex flex-col items-center">
                            <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-16 items-center justify-center min-h-full">

                                {/* Canvas Area */}
                                <div className={`w-full max-w-sm aspect-[9/16] aero-glass rounded-[64px] relative overflow-hidden group/canvas ring-1 ring-white/10 transition-all duration-700 shadow-[0_0_100px_rgba(0,0,0,0.5)] ${studioType === 'image' ? 'ring-indigo-500/30' : studioType === 'video' ? 'ring-purple-500/30' : studioType === 'audio' ? 'ring-rose-500/30' : 'ring-white/10'}`}>
                                    {studioMedia ? (
                                        <div className="w-full h-full relative">
                                            {studioType === 'video' ? (
                                                <video src={studioMedia} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                                            ) : studioType === 'audio' ? (
                                                <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-gradient-to-br from-rose-500/10 via-transparent to-indigo-500/10">
                                                    <div className="w-56 h-56 rounded-[56px] bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center shadow-3xl animate-pulse ring-8 ring-rose-500/20 border border-white/10">
                                                        <Mic size={80} className="text-white" />
                                                    </div>
                                                    <p className="mt-10 text-white font-black font-outfit uppercase tracking-[0.4em] text-xs">Audio Frequency</p>
                                                    <div className="flex gap-2 mt-6">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div key={i} className="w-2 h-8 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <img src={studioMedia} className="w-full h-full object-cover" />
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
                                            <button
                                                type="button"
                                                onClick={() => { setStudioMedia(null); setStudioType('text'); }}
                                                className="absolute top-10 right-10 w-14 h-14 rounded-[28px] bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-rose-500 transition-all border border-white/10 group/delete"
                                            >
                                                <Trash2 size={28} className="group-hover/delete:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-16 text-center bg-gradient-to-br from-white/5 via-transparent to-white/5">
                                            <div className="w-28 h-28 rounded-[40px] bg-white/5 flex items-center justify-center mb-12 border border-white/10 group-hover/canvas:scale-110 group-hover/canvas:bg-white/10 transition-all duration-700 shadow-2xl">
                                                {studioType === 'image' ? <Camera size={56} className="text-indigo-400/40" /> :
                                                    studioType === 'video' ? <Play size={56} className="text-purple-400/40" /> :
                                                        studioType === 'audio' ? <Mic size={56} className="text-rose-400/40" /> :
                                                            <Radio size={56} className="text-white/20" />}
                                            </div>
                                            <h4 className="text-white/30 font-black font-outfit uppercase tracking-tighter text-4xl leading-tight mb-4">
                                                {studioType === 'image' ? 'Capture' :
                                                    studioType === 'video' ? 'Record' :
                                                        studioType === 'audio' ? 'Broadcast' :
                                                            'Share Your'}<br />
                                                {studioType === 'image' ? 'Moment' :
                                                    studioType === 'video' ? 'Story' :
                                                        studioType === 'audio' ? 'Voice' :
                                                            'Frequency'}
                                            </h4>
                                            <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
                                                {studioType === 'text' ? 'Type your message below' : 'Select media to begin'}
                                            </p>
                                        </div>
                                    )}

                                    <div className="absolute bottom-12 left-10 right-10 space-y-6">
                                        <textarea
                                            placeholder={studioType === 'text' ? "What's on your mind?" : "Add a caption..."}
                                            value={studioMoment}
                                            onChange={e => setStudioMoment(e.target.value)}
                                            className="w-full bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 text-white font-bold placeholder:text-white/10 outline-none focus:border-indigo-500/50 transition-all resize-none h-40 text-xl leading-relaxed shadow-2xl"
                                        />
                                    </div>
                                </div>

                                {/* Controls Rail */}
                                <div className="space-y-12 w-full max-w-sm">
                                    {/* Media Type Selection */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 px-2">
                                            <div className="flex-1 h-px bg-white/10"></div>
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] font-outfit">Content Type</p>
                                            <div className="flex-1 h-px bg-white/10"></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-5">
                                            <button type="button" onClick={() => triggerStudioPicker('image/*')} className={`h-36 rounded-[40px] aero-glass border-white/5 flex flex-col items-center justify-center gap-5 hover:border-indigo-500/30 transition-all active:scale-95 group relative overflow-hidden shadow-xl ${studioType === 'image' ? 'bg-indigo-600 border-indigo-500/50' : ''}`}>
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all relative z-10 ${studioType === 'image' ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                                    <Camera size={32} className={`transition-all ${studioType === 'image' ? 'text-white' : 'text-white/30 group-hover:text-white group-hover:scale-110'}`} />
                                                </div>
                                                <span className={`text-[11px] font-black uppercase tracking-widest relative z-10 ${studioType === 'image' ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>Photo</span>
                                            </button>
                                            <button type="button" onClick={() => triggerStudioPicker('video/*')} className={`h-36 rounded-[40px] aero-glass border-white/5 flex flex-col items-center justify-center gap-5 hover:border-purple-500/30 transition-all active:scale-95 group relative overflow-hidden shadow-xl ${studioType === 'video' ? 'bg-purple-600 border-purple-500/50' : ''}`}>
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all relative z-10 ${studioType === 'video' ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                                    <Play size={32} className={`transition-all ${studioType === 'video' ? 'text-white' : 'text-white/30 group-hover:text-white group-hover:scale-110'}`} />
                                                </div>
                                                <span className={`text-[11px] font-black uppercase tracking-widest relative z-10 ${studioType === 'video' ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>Video</span>
                                            </button>
                                            <button type="button" onClick={() => triggerStudioPicker('audio/*')} className={`h-36 rounded-[40px] aero-glass border-white/5 flex flex-col items-center justify-center gap-5 hover:border-rose-500/30 transition-all active:scale-95 group relative overflow-hidden shadow-xl ${studioType === 'audio' ? 'bg-rose-600 border-rose-500/50' : ''}`}>
                                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all relative z-10 ${studioType === 'audio' ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                                    <Mic size={32} className={`transition-all ${studioType === 'audio' ? 'text-white' : 'text-white/30 group-hover:text-white group-hover:scale-110'}`} />
                                                </div>
                                                <span className={`text-[11px] font-black uppercase tracking-widest relative z-10 ${studioType === 'audio' ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>Audio</span>
                                            </button>
                                            <button type="button" onClick={() => setStudioType('text')} className={`h-36 rounded-[40px] aero-glass border-white/5 flex flex-col items-center justify-center gap-5 hover:border-indigo-500/30 transition-all active:scale-95 group relative overflow-hidden shadow-xl ${studioType === 'text' ? 'bg-indigo-600 border-indigo-500/50' : ''}`}>
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all relative z-10 ${studioType === 'text' ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                                    <MessageCircle size={32} className={`transition-all ${studioType === 'text' ? 'text-white' : 'text-indigo-400 group-hover:scale-110'}`} />
                                                </div>
                                                <span className={`text-[11px] font-black uppercase tracking-widest relative z-10 ${studioType === 'text' ? 'text-white' : 'text-indigo-400'}`}>Text</span>
                                            </button>
                                        </div>
                                    </div>

                                    {isAdmin && (
                                        <div className="space-y-5">
                                            <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] font-outfit px-2">Entity Modulation</p>
                                            <div className="relative group/select">
                                                <select
                                                    className="w-full aero-glass p-7 rounded-[40px] border-white/5 outline-none text-white font-black appearance-none cursor-pointer focus:border-indigo-500/50 transition-all tracking-tight uppercase text-xs"
                                                    value={studioClubId}
                                                    onChange={e => setStudioClubId(e.target.value)}
                                                >
                                                    <option value="" className="bg-[#0a0a0c]">Target Entity</option>
                                                    {users.map(u => <option key={u.id} value={u.id} className="bg-[#0a0a0c]">{u.fullName}</option>)}
                                                </select>
                                                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover/select:text-white transition-colors">
                                                    <Plus size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isAdmin && !studioClubId}
                                        className="w-full h-28 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-[48px] font-black text-sm uppercase tracking-[0.4em] shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)] hover:scale-[1.02] hover:shadow-indigo-500/60 transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-6 relative overflow-hidden group/submit"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/submit:translate-x-[100%] transition-transform duration-1000"></div>
                                        <Radio size={28} className="group-hover:rotate-12 transition-transform" />
                                        Launch Pulse
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <input type="file" ref={studioFileInputRef} onChange={handleStudioFileChange} accept={activeMimeType} className="hidden" />
                </div>
            )}

            <RightSidebar users={users} followedClubs={followedClubs} onFollow={handleFollow} onUnfollow={handleUnfollow} onChat={setActiveChat} />

            {activeChat && <ChatWindow club={activeChat} onClose={() => setActiveChat(null)} currentUser={currentUser} />}

            {notification && (
                <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 aero-glass px-8 py-5 rounded-[28px] border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-[5000] flex items-center gap-4 animate-slide-up ring-1 ring-white/10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 animate-pulse"></div>
                        <div className="relative w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,1)]"></div>
                    </div>
                    <span className="font-black text-white text-[11px] uppercase tracking-[0.2em]">{notification}</span>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
