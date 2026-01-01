const { useState, useEffect, useMemo, useRef } = React;

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
const TrendingUp = (props) => <Icon {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></Icon>;

// --- MOCK DATA ---
const INITIAL_USER_TEMPLATE = {
    id: 'user_1',
    username: '', fullName: '', avatar: '', bio: 'Student at BMU',
    followers: 0, following: 0, verified: false
};
const SUGGESTED_USERS = [
    { id: 'club_pfa', username: 'pfa_bmu', fullName: 'Performing Arts Club (PFA)', avatar: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=150&h=150&fit=crop', verified: true },
    { id: 'club_strokes', username: 'strokes_arts', fullName: 'Strokes Club (Arts)', avatar: 'https://images.unsplash.com/photo-1460661619275-dcf4d814269e?w=150&h=150&fit=crop', verified: false },
    { id: 'club_pac', username: 'pac_bmu', fullName: 'Photography (PAC)', avatar: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&h=150&fit=crop', verified: true },
    { id: 'club_lit', username: 'lit_debate', fullName: 'Literary & Debating', avatar: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&h=150&fit=crop', verified: false },
    { id: 'club_ibotics', username: 'ibotics_club', fullName: 'Robotics (I-Botics)', avatar: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=150&h=150&fit=crop', verified: true },
    { id: 'club_acm', username: 'acm_chapter', fullName: 'ACM Student Chapter', avatar: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&h=150&fit=crop', verified: true },
    { id: 'club_tsec', username: 'tsec_bmu', fullName: 'TSEC (Entrepreneurship)', avatar: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150&h=150&fit=crop', verified: true },
    { id: 'club_udaan', username: 'udaan_women', fullName: 'Udaan', avatar: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop', verified: false },
];
const INITIAL_POSTS = [];

// --- COMPONENTS ---

const ChatWindow = ({ club, onClose, currentUser }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'club', text: `Welcome to the ${club.fullName} chat!`, timestamp: Date.now() }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: 'me',
            text: inputText,
            timestamp: Date.now()
        };
        setMessages([...messages, newMsg]);
        setInputText('');

        // Mock reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'club',
                text: 'Thanks for your message! An admin will reply soon.',
                timestamp: Date.now()
            }]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-4 right-80 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-chat animate-scale-in overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <img src={club.avatar} className="w-8 h-8 rounded-full border border-white" />
                    <div>
                        <p className="font-bold text-sm leading-none">{club.username}</p>
                        <p className="text-[10px] opacity-80">Member Chat</p>
                    </div>
                </div>
                <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full text-white"><X size={16} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-3">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-2.5 rounded-2xl text-sm shadow-sm ${msg.sender === 'me'
                                ? 'bg-blue-600 text-white chat-bubble-user'
                                : 'bg-white text-gray-800 border border-gray-200 chat-bubble-club'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-2 border-t border-gray-100 bg-white flex gap-2">
                <input
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 ring-blue-500"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
};

const LoginPortal = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPreviewUrl(URL.createObjectURL(e.target.files[0]));
            setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please fill in all fields.'); return; }
        if (!email.toLowerCase().endsWith('@bmu.edu.in')) { setError('Access Restricted: Use @bmu.edu.in email.'); return; }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onLogin(email, previewUrl || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop');
        }, 1500);
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 animate-gradient-xy z-0"></div>
            <div className="bg-white/95 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden z-10 relative">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center relative overflow-hidden">
                    <div className="bg-white/20 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-3 backdrop-blur-sm shadow-inner ring-1 ring-white/30">
                        <Radio size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">BMU RADIO</h1>
                    <p className="text-blue-100 text-xs mt-1 uppercase tracking-wider font-semibold">Student Portal Access</p>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl flex items-center gap-2"><AlertCircle size={16} />{error}</div>}
                        <div className="flex flex-col items-center">
                            <div className="relative group cursor-pointer animate-float">
                                <div className="w-24 h-24 rounded-full bg-gray-50 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                                    {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Camera size={32} className="text-gray-400" />}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform"><Upload size={14} /><input type="file" className="hidden" accept="image/*" onChange={handleImageChange} /></label>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="relative"><Mail className="absolute left-4 top-3.5 text-gray-400" size={20} /><input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 transition-all text-sm" required /></div>
                            <div className="relative"><Lock className="absolute left-4 top-3.5 text-gray-400" size={20} /><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 transition-all text-sm" required /></div>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Enter Campus <ArrowRight size={18} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ activeTab, setActiveTab, currentUser, onLogout }) => {
    const menuItems = [
        { id: 'home', icon: Home, label: 'Campus Feed' },
        { id: 'explore', icon: Search, label: 'Discover' },
        { id: 'notifications', icon: Heart, label: 'Alerts' },
        { id: 'create', icon: PlusSquare, label: 'Post' },
        { id: 'profile', icon: User, label: 'My ID' },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-gray-200 bg-white/80 backdrop-blur-md z-sidebar px-4 py-6 glass">
            <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200"><Radio size={24} /></div>
                <div><h1 className="text-xl font-bold tracking-tight text-gray-900 leading-none">BMU</h1><span className="text-xs font-bold text-blue-600 tracking-widest uppercase">RADIO</span></div>
            </div>
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 group ${activeTab === item.id ? 'font-bold text-blue-600 bg-blue-50 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <item.icon size={24} className={`transition-transform duration-200 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span className="text-sm font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 px-2 mb-4 bg-gray-50 p-2 rounded-lg border border-gray-100"><img src={currentUser.avatar} className="w-8 h-8 rounded-full object-cover border border-white shadow-sm" /><div className="flex-1 min-w-0"><p className="text-xs font-bold text-gray-900 truncate">{currentUser.username}</p><p className="text-[10px] text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Online</p></div></div>
                <button onClick={onLogout} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><LogOut size={24} /><span className="text-sm font-medium">Sign Out</span></button>
            </div>
        </div>
    );
};

const PostCard = ({ post, onLike, onComment, currentUser }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeAnim, setLikeAnim] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeAnim(true);
        setTimeout(() => setLikeAnim(false), 300);
        onLike(post.id);
    };

    return (
        <div className="bg-white border-b border-gray-200 md:border md:rounded-2xl md:shadow-sm md:mb-6 overflow-hidden transition-all hover:shadow-md hover:border-blue-200 animate-slide-up">
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <img src={post.user.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover:ring-2 ring-blue-500 transition-all" />
                        {post.user.verified && <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-[2px] border-2 border-white"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
                    </div>
                    <div>
                        <div className="flex items-center gap-1"><span className="font-bold text-sm text-gray-900 group-hover:underline">{post.user.username}</span><span className="text-gray-400 text-xs">• Now</span></div>
                        <p className="text-xs text-gray-500">{post.user.fullName}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-900"><MoreHorizontal size={20} /></button>
            </div>
            {post.image && (
                <div className="relative bg-gray-100" onDoubleClick={handleLike}>
                    <img src={post.image} className="w-full h-auto max-h-[600px] object-cover" />
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${likeAnim ? 'opacity-100' : 'opacity-0'} pointer-events-none`}><Heart size={100} className="fill-white text-white drop-shadow-2xl transform scale-125 animate-pop" /></div>
                </div>
            )}
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <button onClick={handleLike} className="group transition-transform active:scale-90"><Heart size={26} className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500 animate-pop' : 'text-gray-900 group-hover:text-gray-500'}`} /></button>
                        <button onClick={() => setShowComments(!showComments)} className="group transition-transform active:scale-90"><MessageCircle size={26} className="text-gray-900 group-hover:text-gray-500" /></button>
                        <button className="group transition-transform active:scale-90"><Send size={26} className="text-gray-900 group-hover:text-gray-500 -rotate-45 mb-1" /></button>
                    </div>
                    <Share2 size={24} className="text-gray-900 hover:text-gray-500" />
                </div>
                <div className="mb-2"><p className="text-sm"><span className="font-bold mr-2 text-gray-900">{post.likes + (isLiked ? 1 : 0)} likes</span></p><div className="text-sm leading-relaxed"><span className="font-bold mr-2 text-gray-900">{post.user.username}</span><span className="text-gray-800">{post.content}</span></div></div>
                {post.comments.length > 0 && !showComments && <button onClick={() => setShowComments(true)} className="text-gray-500 text-sm mb-2 hover:text-gray-800">View all {post.comments.length} comments</button>}
                {showComments && <div className="mb-3 space-y-2 border-t border-gray-100 pt-2">{post.comments.map(c => <div key={c.id} className="flex gap-2 text-sm"><span className="font-bold text-gray-900">{c.username}</span><span className="text-gray-700">{c.text}</span></div>)}</div>}
                <form onSubmit={(e) => { e.preventDefault(); if (commentText) { onComment(post.id, commentText); setCommentText(''); setShowComments(true); } }} className="flex gap-2 items-center mt-3 pt-2">
                    <img src={currentUser.avatar} className="w-6 h-6 rounded-full bg-gray-200 border border-gray-100" />
                    <input type="text" placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400" />
                    {commentText && <button type="submit" className="text-blue-600 text-sm font-bold hover:text-blue-800">Post</button>}
                </form>
            </div>
        </div>
    );
};

const CreatePost = ({ onPost, user }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => { if (e.target.files && e.target.files[0]) setImage(URL.createObjectURL(e.target.files[0])); };

    return (
        <div className="bg-white border-b border-gray-200 md:border md:rounded-2xl md:shadow-sm p-4 mb-6 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
                <img src={user.avatar} className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                <div className="flex-1">
                    <textarea placeholder={`What's happening, ${user.fullName.split(' ')[0]}?`} value={text} onChange={(e) => setText(e.target.value)} className="w-full resize-none outline-none text-lg min-h-[60px] placeholder-gray-400" rows={2} />
                    {image && <div className="relative mb-4 rounded-xl overflow-hidden group border border-gray-100"><img src={image} className="w-full max-h-80 object-cover" /><button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"><X size={16} /></button></div>}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="flex gap-1">
                            <label className="cursor-pointer text-blue-500 hover:bg-blue-50 p-2 rounded-full"><ImageIcon size={20} /><input type="file" className="hidden" accept="image/*" onChange={handleImageChange} /></label>
                            <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"><MapPin size={20} /></button>
                        </div>
                        <button onClick={() => { onPost({ text, image }); setText(''); setImage(null); }} disabled={!text && !image} className={`px-5 py-1.5 rounded-full font-bold text-sm transition-all shadow-sm ${(!text && !image) ? 'bg-blue-200 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RightSidebar = ({ users, followedClubs, onFollow, onUnfollow, onChat }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedUsers = showAll ? users : users.slice(0, 4);

    return (
        <div className="hidden lg:flex flex-col w-80 fixed right-0 top-0 h-screen bg-white/50 backdrop-blur-sm border-l border-gray-200 z-sidebar transition-all duration-300 transform">
            <div className="p-4 pl-4 pb-2">
                <div className="bg-white rounded-full flex items-center px-4 py-3 group focus-within:ring-2 ring-blue-100 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                    <Search size={20} className="text-gray-400 group-focus-within:text-blue-500" />
                    <input type="text" placeholder="Search BMU..." className="bg-transparent border-none outline-none ml-3 text-sm w-full font-medium" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pl-4 pt-2 space-y-6">
                {users.length > 0 && (
                    <div className="bg-white/80 rounded-2xl p-5 border border-gray-200 shadow-sm backdrop-blur-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2"><TrendingUp size={16} className="text-blue-500" /> Clubs to Follow</h3>
                            {users.length > 4 && <button onClick={() => setShowAll(!showAll)} className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">{showAll ? 'Show Less' : 'See All'}</button>}
                        </div>
                        <div className="space-y-4">
                            {displayedUsers.map(user => (
                                <div key={user.id} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-100 transition-transform group-hover:scale-105 shadow-sm" />
                                        <div className="leading-tight"><p className="font-bold text-sm text-gray-900 truncate w-28" title={user.username}>{user.username}</p><p className="text-xs text-gray-500 truncate w-28" title={user.fullName}>{user.fullName}</p></div>
                                    </div>
                                    <button onClick={() => onFollow(user.id)} className="text-xs font-bold bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-800 hover:scale-105 transition-all shadow-sm">Follow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {followedClubs.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 shadow-sm animate-slide-up">
                        <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2"><Heart size={16} className="text-red-500 fill-red-500 animate-pulse" /> Your Clubs</h3>
                        <div className="space-y-4">
                            {followedClubs.map(club => (
                                <div key={club.id} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChat(club)}>
                                        <div className="relative">
                                            <img src={club.avatar} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm transition-transform group-hover:scale-105" />
                                            <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-2.5 h-2.5 rounded-full border border-white"></div>
                                        </div>
                                        <div className="leading-tight"><p className="font-bold text-sm text-gray-900 truncate w-24 group-hover:text-blue-600 transition-colors">{club.username}</p></div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => onChat(club)} className="text-blue-600 hover:bg-blue-100 p-1.5 rounded-full transition-colors"><MessageCircle size={14} /></button>
                                        <button onClick={() => onUnfollow(club.id)} className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full hover:bg-red-100 transition-all">Unfollow</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="pt-4 pb-2 text-center"><p className="text-[10px] text-gray-400 font-medium">© 2024 BMU Radio Student Portal</p></div>
            </div>
        </div>
    );
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(INITIAL_USER_TEMPLATE);
    const [activeTab, setActiveTab] = useState('home');
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [users, setUsers] = useState(SUGGESTED_USERS);
    const [followedClubs, setFollowedClubs] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [notification, setNotification] = useState(null);

    const handleLogin = (email, avatar) => {
        const username = email.split('@')[0];
        setCurrentUser({ ...INITIAL_USER_TEMPLATE, id: `user_${Date.now()}`, username, fullName: username, avatar });
        setIsAuthenticated(true);
        showNotification(`Welcome, ${username}!`);
    };

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
        <div className="min-h-screen relative text-gray-900 font-sans flex justify-center overflow-x-hidden">
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient-xy z-background"></div>
            <div className="fixed inset-0 bg-grid-pattern opacity-40 z-background pointer-events-none"></div>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} onLogout={() => setIsAuthenticated(false)} />

            <main className="w-full md:w-[600px] md:ml-64 lg:mr-80 min-h-screen bg-white/60 backdrop-blur-sm md:border-x border-gray-200/50 shadow-sm relative z-0">
                {activeTab === 'home' && (
                    <div className="max-w-xl mx-auto pt-4 pb-20 md:pb-8">
                        <div className="hidden md:block"><CreatePost onPost={(Data) => { setPosts([{ id: Date.now(), userId: currentUser.id, user: currentUser, content: Data.text, image: Data.image, likes: 0, comments: [], timestamp: Date.now() }, ...posts]); showNotification('Posted!'); }} user={currentUser} /></div>
                        <div className="space-y-4">
                            {posts.map(p => <PostCard key={p.id} post={p} onLike={(pid) => setPosts(posts.map(po => po.id === pid ? { ...po, likes: po.likes + 1 } : po))} onComment={(pid, txt) => setPosts(posts.map(po => po.id === pid ? { ...po, comments: [...po.comments, { id: Date.now(), username: currentUser.username, text: txt }] } : po))} currentUser={currentUser} />)}
                            {posts.length === 0 && <div className="text-center py-20 px-6 animate-float"><div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white"><Radio size={32} className="text-gray-400" /></div><h3 className="font-bold text-gray-900">Your feed is empty</h3><p className="text-gray-500">Join clubs to see updates!</p></div>}
                        </div>
                    </div>
                )}
            </main>

            <RightSidebar users={users} followedClubs={followedClubs} onFollow={handleFollow} onUnfollow={handleUnfollow} onChat={setActiveChat} />

            {activeChat && <ChatWindow club={activeChat} onClose={() => setActiveChat(null)} currentUser={currentUser} />}

            {notification && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-slide-up">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-blue-500"></div><span className="font-medium text-sm">{notification}</span>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
