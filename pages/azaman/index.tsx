import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon, MapIcon, CreditCardIcon, StoreIcon, UserIcon } from '../../components/Icons';
import styles from '../../styles/Azaman.module.css';

const AzamanApp: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'send' | 'find' | 'profile'>('home');
    const [user, setUser] = useState({
        name: 'John Doe',
        studentId: 'UG12345678',
        balance: 250.00,
        verified: true
    });

    const [searchQuery, setSearchQuery] = useState(''); // send tab search/recipient
    const [findQuery, setFindQuery] = useState(''); // find tab search
    const [showFindDropdown, setShowFindDropdown] = useState(false);
    const suggestedPlaces = [
        'Jones Quartrey Building (JQB)',
        'Central Cafeteria',
        'School of Engineering',
        'Pent',
        'Diaspora',
        'School of Pharmacy',
        'Law School',
    ];
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'Food' | 'Services' | 'Clubs'>('all');
    const [favorites, setFavorites] = useState<number[]>([]);
    const [showQR, setShowQR] = useState(false);
    const [showDirections, setShowDirections] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [toast, setToast] = useState<string>('');

    const showToast = (message: string) => {
        setToast(message);
        window.setTimeout(() => setToast(''), 2500);
    };

    const handleDirections = (business: any) => {
        setSelectedBusiness(business);
        setShowDirections(true);
    };

    const handleSearchClick = (searchTerm: string) => {
        // Open Google Maps with the search term
        const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm + ' University of Ghana')}`;
        window.open(googleMapsUrl, '_blank');
        setFindQuery(searchTerm);
        setShowFindDropdown(false);
        showToast(`Opening directions to ${searchTerm}`);
    };

    // Mock data for businesses and clubs
    const businesses = [
        {
            id: 1,
            name: 'Campus Print Shop',
            category: 'Printing',
            rating: 4.8,
            reviews: 124,
            distance: '0.2km',
            logo: '🖨️',
            verified: true
        },
        {
            id: 2,
            name: 'Student Cafe',
            category: 'Food',
            rating: 4.6,
            reviews: 89,
            distance: '0.5km',
            logo: '☕',
            verified: true
        },
        {
            id: 3,
            name: 'Tech Society',
            category: 'Club',
            rating: 4.9,
            reviews: 67,
            distance: '0.3km',
            logo: '💻',
            verified: true
        }
    ];

    const [recentTransactions, setRecentTransactions] = useState([
        { id: 1, to: 'Campus Print Shop', amount: 15.00, time: '2 min ago', type: 'payment' },
        { id: 2, to: 'Sarah Johnson', amount: 25.00, time: '1 hour ago', type: 'send' },
        { id: 3, to: 'Tech Society', amount: 10.00, time: '3 hours ago', type: 'payment' }
    ]);

    const suggestionUsers = ['Sarah Johnson', 'Michael Appiah', 'UG Bookshop', 'Tech Society', 'Campus Print Shop'];

    const handleSend = () => {
        const amountEl = (document.getElementById('az-amount') as HTMLInputElement | null);
        const recipientEl = (document.getElementById('az-recipient') as HTMLInputElement | null);
        const amount = amountEl ? parseFloat(amountEl.value) : 0;
        const recipient = recipientEl ? recipientEl.value.trim() : '';
        if (!recipient || isNaN(amount) || amount <= 0) {
            showToast('Enter a valid recipient and amount');
            return;
        }
        // Update balance and transactions (mock)
        setUser((u) => ({ ...u, balance: Math.max(0, u.balance - amount) }));
        setRecentTransactions((tx) => [
            { id: tx.length + 1, to: recipient, amount, time: 'just now', type: 'send' },
            ...tx
        ]);
        setShowSuccess(true);
        showToast('Payment sent successfully');
        // Reset fields
        if (amountEl) amountEl.value = '';
        if (recipientEl) recipientEl.value = '';
    };

    return (
        <>
            <Head>
                <title>Azaman — Send Am</title>
                <meta name="description" content="Campus payment and navigation platform for University of Ghana students" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>

            <div className={styles.azamanApp}>
                {/* Sidebar on desktop */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <div>
                            <div className={styles.logoText}>Azaman</div>
                            <div className={styles.logoTagline}>Send Am</div>
                        </div>
                    </div>
                    <div className={styles.sidebarBalance}>
                        <div className={styles.sidebarBalanceTop}>My Wallet</div>
                        <div className={styles.sidebarBalanceAmt}>₵{user.balance.toFixed(2)}</div>
                        <div className={styles.sidebarBalanceActions}>
                            <button className={styles.sidebarMiniBtn} onClick={() => setActiveTab('send')}>Send</button>
                            <button className={styles.sidebarMiniBtn} onClick={() => setActiveTab('home')}>History</button>
                        </div>
                    </div>
                    <nav className={styles.sidebarNav}>
                        <button className={`${styles.sidebarItem} ${activeTab === 'home' ? styles.sidebarActive : ''}`} onClick={() => setActiveTab('home')}>
                            <MapIcon />
                            <span>Home</span>
                        </button>
                        <button className={`${styles.sidebarItem} ${activeTab === 'send' ? styles.sidebarActive : ''}`} onClick={() => setActiveTab('send')}>
                            <CreditCardIcon />
                            <span>Send</span>
                        </button>
                        <button className={`${styles.sidebarItem} ${activeTab === 'find' ? styles.sidebarActive : ''}`} onClick={() => setActiveTab('find')}>
                            <StoreIcon />
                            <span>Find</span>
                        </button>
                        <button className={`${styles.sidebarItem} ${activeTab === 'profile' ? styles.sidebarActive : ''}`} onClick={() => setActiveTab('profile')}>
                            <UserIcon />
                            <span>Profile</span>
                        </button>
                    </nav>
                </aside>

                {/* Header (mobile) */}
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <Link href="/" className={styles.backButton}>
                            <ArrowLeftIcon />
                        </Link>
                        <div className={styles.logo}>
                            <span className={styles.logoText}>Azaman</span>
                            <span className={styles.logoTagline}>Send Am</span>
                        </div>
                        <div className={styles.userAvatar}>
                            <UserIcon />
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    {activeTab === 'home' && (
                        <div className={styles.homeTab}>
                            {/* Welcome Section */}
                            <div className={styles.welcomeSection}>
                                <h1 className={styles.welcomeTitle}>Welcome Gyampo!</h1>
                                <p className={styles.welcomeSubtitle}>Ready to explore campus?</p>
                            </div>

                            {/* Balance Card */}
                            <div className={styles.balanceCard}>
                                <div className={styles.balanceHeader}>
                                    <span className={styles.balanceLabel}>My Wallet</span>
                                    <span className={styles.balanceAmount}>₵{user.balance.toFixed(2)}</span>
                                </div>
                                <div className={styles.balanceActions}>
                                    <button className={styles.balanceButton}>
                                        <CreditCardIcon />
                                        <span>Send Money</span>
                                    </button>
                                    <button className={styles.balanceButton}>
                                        <MapIcon />
                                        <span>Find Places</span>
                                    </button>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className={styles.quickActions}>
                                <h2 className={styles.sectionTitle}>Quick Actions</h2>
                                <div className={styles.actionGrid}>
                                    <button className={styles.actionCard} onClick={() => setActiveTab('send')}>
                                        <CreditCardIcon />
                                        <span>Send Money</span>
                                    </button>
                                    <button className={styles.actionCard} onClick={() => setActiveTab('find')}>
                                        <StoreIcon />
                                        <span>Find Business</span>
                                    </button>
                                    <button className={styles.actionCard}>
                                        <MapIcon />
                                        <span>Navigate</span>
                                    </button>
                                    <button className={styles.actionCard}>
                                        <UserIcon />
                                        <span>My Profile</span>
                                    </button>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className={styles.recentSection}>
                                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                                <div className={styles.transactionList}>
                                    {recentTransactions.map((transaction) => (
                                        <div key={transaction.id} className={styles.transactionItem}>
                                            <div className={styles.transactionInfo}>
                                                <span className={styles.transactionTo}>{transaction.to}</span>
                                                <span className={styles.transactionTime}>{transaction.time}</span>
                                            </div>
                                            <span className={styles.transactionAmount}>-₵{transaction.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'send' && (
                        <div className={styles.sendTab}>
                            <div className={styles.sendHeader}>
                                <h1 className={styles.sendTitle}>Sendam</h1>
                                <p className={styles.sendSubtitle}>Send money to anyone, anywhere on campus</p>
                            </div>

                            {/* Search Bar */}
                            <div className={styles.searchSection}>
                                <div className={styles.searchBar}>
                                    <input
                                        type="text"
                                        placeholder="Search for users, businesses, or clubs..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                </div>
                            </div>

                            {/* Send Money Form */}
                            <div className={styles.sendForm}>
                                <div className={styles.amountSection}>
                                    <label className={styles.amountLabel}>Amount</label>
                                    <div className={styles.amountInput}>
                                        <span className={styles.currencySymbol}>₵</span>
                                        <input
                                            id="az-amount"
                                            type="number"
                                            placeholder="0.00"
                                            className={styles.amountField}
                                        />
                                    </div>
                                </div>

                                <div className={styles.recipientSection}>
                                    <label className={styles.recipientLabel}>To</label>
                                    <div className={styles.recipientInput}>
                                        <input
                                            id="az-recipient"
                                            type="text"
                                            placeholder="Enter name, phone, or business"
                                            className={styles.recipientField}
                                        />
                                    </div>
                                    {searchQuery && (
                                        <div className={styles.suggestionList}>
                                            {suggestionUsers
                                                .filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .slice(0, 5)
                                                .map((s) => (
                                                    <button key={s} className={styles.suggestionItem} onClick={() => {
                                                        const el = document.getElementById('az-recipient') as HTMLInputElement | null;
                                                        if (el) el.value = s;
                                                        setSearchQuery('');
                                                    }}>{s}</button>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.messageSection}>
                                    <label className={styles.messageLabel}>Message (Optional)</label>
                                    <textarea
                                        placeholder="Add a note..."
                                        className={styles.messageField}
                                        rows={3}
                                    />
                                </div>

                                <button className={styles.sendButton} onClick={handleSend}>
                                    <CreditCardIcon />
                                    <span>Send Money</span>
                                </button>
                            </div>

                            {/* QR Code Section */}
                            <div className={styles.qrSection}>
                                <button
                                    className={styles.qrButton}
                                    onClick={() => setShowQR(!showQR)}
                                >
                                    {showQR ? 'Hide QR Code' : 'Show QR Code'}
                                </button>

                                {showQR && (
                                    <div className={styles.qrCode}>
                                        <div className={styles.qrPlaceholder}>
                                            <div className={styles.qrGrid}>
                                                {Array.from({ length: 64 }, (_, i) => (
                                                    <div key={i} className={styles.qrDot}></div>
                                                ))}
                                            </div>
                                        </div>
                                        <p className={styles.qrText}>Scan to receive money</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'find' && (
                        <div className={styles.directoryTab}>
                            <div className={styles.directoryHeader}>
                                <h1 className={styles.directoryTitle}>Find</h1>
                                <p className={styles.directorySubtitle}>Discover verified businesses and clubs</p>
                            </div>

                            {/* Search, Map and Filters */}
                            <div className={styles.directorySearch}>
                                <div className={styles.searchBar}>
                                    <input
                                        type="text"
                                        placeholder="Search businesses and clubs..."
                                        className={styles.searchInput}
                                        value={findQuery}
                                        onChange={(e) => setFindQuery(e.target.value)}
                                        onFocus={() => setShowFindDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowFindDropdown(false), 120)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && findQuery.trim()) {
                                                handleSearchClick(findQuery.trim());
                                            }
                                        }}
                                    />
                                    <button
                                        className={styles.searchButton}
                                        onClick={() => {
                                            if (findQuery.trim()) {
                                                handleSearchClick(findQuery.trim());
                                            }
                                        }}
                                        disabled={!findQuery.trim()}
                                    >
                                        <MapIcon />
                                    </button>
                                    {showFindDropdown && findQuery.length === 0 && (
                                        <div className={styles.findDropdown}>
                                            {suggestedPlaces.map((place) => (
                                                <button
                                                    key={`dd-${place}`}
                                                    className={styles.findItem}
                                                    onClick={() => handleSearchClick(place)}
                                                >
                                                    {place}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.filterButtons}>
                                    <button className={`${styles.filterButton} ${selectedFilter === 'all' ? styles.filterActive : ''}`} onClick={() => setSelectedFilter('all')}>All</button>
                                    <button className={`${styles.filterButton} ${selectedFilter === 'Food' ? styles.filterActive : ''}`} onClick={() => setSelectedFilter('Food')}>Food</button>
                                    <button className={`${styles.filterButton} ${selectedFilter === 'Services' ? styles.filterActive : ''}`} onClick={() => setSelectedFilter('Services')}>Services</button>
                                    <button className={`${styles.filterButton} ${selectedFilter === 'Clubs' ? styles.filterActive : ''}`} onClick={() => setSelectedFilter('Clubs')}>Clubs</button>
                                </div>
                            </div>



                            {/* Favorites */}
                            {favorites.length > 0 && (
                                <div className={styles.favoritesSection}>
                                    <h2 className={styles.sectionTitle}>My Favorites</h2>
                                    <div className={styles.businessList}>
                                        {businesses.filter(b => favorites.includes(b.id)).map((business) => (
                                            <div key={`fav-${business.id}`} className={styles.businessCard}>
                                                <div className={styles.businessHeader}>
                                                    <div className={styles.businessLogo}>
                                                        <span className={styles.businessLogoText}>{business.name.charAt(0)}</span>
                                                    </div>
                                                    <div className={styles.businessInfo}>
                                                        <h3 className={styles.businessName}>{business.name}</h3>
                                                        <p className={styles.businessCategory}>{business.category}</p>
                                                        <div className={styles.businessRating}>
                                                            <span className={styles.ratingStars}>★★★★★</span>
                                                            <span className={styles.ratingNumber}>{business.rating}</span>
                                                            <span className={styles.ratingReviews}>({business.reviews})</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.businessActions}>
                                                        <span className={styles.businessDistance}>{business.distance}</span>
                                                        {business.verified && (<span className={styles.verifiedBadge}>✓</span>)}
                                                        <button className={styles.favButton} onClick={() => setFavorites((f) => f.filter(id => id !== business.id))}>♥</button>
                                                    </div>
                                                </div>
                                                <div className={styles.businessFooter}>
                                                    <button className={styles.sendamButton}><CreditCardIcon /><span>Sendam</span></button>
                                                    <button className={styles.directionsButton} onClick={() => handleDirections(business)}><MapIcon /><span>Directions</span></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Business List */}
                            <div className={styles.businessList}>
                                {businesses
                                    .filter((b) => selectedFilter === 'all' || b.category === selectedFilter.replace('Services', 'Printing'))
                                    .filter((b) => b.name.toLowerCase().includes(findQuery.toLowerCase()))
                                    .map((business) => (
                                        <div key={business.id} className={styles.businessCard}>
                                            <div className={styles.businessHeader}>
                                                <div className={styles.businessLogo}>
                                                    <span className={styles.businessLogoText}>{business.name.charAt(0)}</span>
                                                </div>
                                                <div className={styles.businessInfo}>
                                                    <h3 className={styles.businessName}>{business.name}</h3>
                                                    <p className={styles.businessCategory}>{business.category}</p>
                                                    <div className={styles.businessRating}>
                                                        <span className={styles.ratingStars}>★★★★★</span>
                                                        <span className={styles.ratingNumber}>{business.rating}</span>
                                                        <span className={styles.ratingReviews}>({business.reviews})</span>
                                                    </div>
                                                </div>
                                                <div className={styles.businessActions}>
                                                    <span className={styles.businessDistance}>{business.distance}</span>
                                                    {business.verified && (
                                                        <span className={styles.verifiedBadge}>✓</span>
                                                    )}
                                                    <button
                                                        className={styles.favButton}
                                                        onClick={() => setFavorites((f) => f.includes(business.id) ? f.filter(id => id !== business.id) : [...f, business.id])}
                                                        aria-label="Toggle favorite"
                                                    >
                                                        {favorites.includes(business.id) ? '♥' : '♡'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={styles.businessFooter}>
                                                <button className={styles.sendamButton}>
                                                    <CreditCardIcon />
                                                    <span>Sendam</span>
                                                </button>
                                                <button className={styles.directionsButton} onClick={() => handleDirections(business)}>
                                                    <MapIcon />
                                                    <span>Directions</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className={styles.profileTab}>
                            <div className={styles.profileHeader}>
                                <div className={styles.profileAvatar}>
                                    <UserIcon />
                                </div>
                                <div className={styles.profileInfo}>
                                    <h1 className={styles.profileName}>{user.name}</h1>
                                    <p className={styles.profileId}>Student ID: {user.studentId}</p>
                                    {user.verified && (
                                        <span className={styles.verifiedBadge}>✓ Verified Student</span>
                                    )}
                                </div>
                            </div>

                            {/* Wallet Section */}
                            <div className={styles.walletSection}>
                                <h2 className={styles.sectionTitle}>My Wallet</h2>
                                <div className={styles.walletCard}>
                                    <div className={styles.walletBalance}>
                                        <span className={styles.balanceLabel}>Available Balance</span>
                                        <span className={styles.balanceAmount}>₵{user.balance.toFixed(2)}</span>
                                    </div>
                                    <div className={styles.walletActions}>
                                        <button className={styles.walletButton}>Add Money</button>
                                        <button className={styles.walletButton}>Withdraw</button>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div className={styles.reviewsSection}>
                                <h2 className={styles.sectionTitle}>My Reviews</h2>
                                <div className={styles.reviewsList}>
                                    <div className={styles.reviewItem}>
                                        <div className={styles.reviewHeader}>
                                            <span className={styles.reviewBusiness}>Campus Print Shop</span>
                                            <span className={styles.reviewRating}>★★★★★</span>
                                        </div>
                                        <p className={styles.reviewText}>Great service, fast printing!</p>
                                        <span className={styles.reviewDate}>2 days ago</span>
                                    </div>
                                </div>
                            </div>

                            {/* Settings */}
                            <div className={styles.settingsSection}>
                                <h2 className={styles.sectionTitle}>Settings</h2>
                                <div className={styles.settingsList}>
                                    <button className={styles.settingItem}>
                                        <span>Notifications</span>
                                        <span>→</span>
                                    </button>
                                    <button className={styles.settingItem}>
                                        <span>Privacy</span>
                                        <span>→</span>
                                    </button>
                                    <button className={styles.settingItem}>
                                        <span>Help & Support</span>
                                        <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Bottom Navigation */}
                <nav className={styles.bottomNav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
                        onClick={() => setActiveTab('home')}
                    >
                        <MapIcon />
                        <span>Home</span>
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'send' ? styles.active : ''}`}
                        onClick={() => setActiveTab('send')}
                    >
                        <CreditCardIcon />
                        <span>Send</span>
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'find' ? styles.active : ''}`}
                        onClick={() => setActiveTab('find')}
                    >
                        <StoreIcon />
                        <span>Find</span>
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <UserIcon />
                        <span>Profile</span>
                    </button>
                </nav>

                {/* Success Modal */}
                {showSuccess && (
                    <div className={styles.modalOverlay} onClick={() => setShowSuccess(false)}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <h3 className={styles.modalTitle}>Payment Successful</h3>
                            <p className={styles.modalText}>Your payment has been sent.</p>
                            <button className={styles.modalClose} onClick={() => setShowSuccess(false)}>Close</button>
                        </div>
                    </div>
                )}

                {/* Toast */}
                {toast && (
                    <div className={styles.toast}>{toast}</div>
                )}

                {/* Directions Modal */}
                {showDirections && selectedBusiness && (
                    <div className={styles.directionsModal}>
                        <div className={styles.directionsContent}>
                            <div className={styles.directionsHeader}>
                                <h3>Directions to {selectedBusiness.name}</h3>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setShowDirections(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className={styles.directionsMap}>
                                <iframe
                                    className={styles.directionsMapFrame}
                                    title={`Directions to ${selectedBusiness.name}`}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2294315322683!2d-0.18947912408670726!3d5.650062432825111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9bcc9cab4e9b%3A0xe6b0b5a9b486275d!2sUniversity%20of%20Ghana!5e0!3m2!1sen!2sgh!4v1697040000000!5m2!1sen!2sgh"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className={styles.directionsInfo}>
                                <p><strong>Category:</strong> {selectedBusiness.category}</p>
                                <p><strong>Distance:</strong> {selectedBusiness.distance}</p>
                                <p><strong>Rating:</strong> {selectedBusiness.rating} ({selectedBusiness.reviews} reviews)</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AzamanApp;
