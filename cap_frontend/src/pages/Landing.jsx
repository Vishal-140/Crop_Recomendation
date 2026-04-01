import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const FEATURES = [
    { icon: '🤖', title: 'AI-Powered Predictions', desc: 'Our Random Forest model trained on 2,200 samples delivers highly accurate crop recommendations in real-time.' },
    { icon: '🌍', title: 'Global Crop Coverage', desc: 'Supports 22 crop types including cereals, pulses, fruits, and plantation crops across diverse climates.' },
    { icon: '⚡', title: 'Instant Results', desc: 'Get your crop recommendation in under a second. No waiting, no complexity — just fast, reliable advice.' },
    { icon: '📊', title: 'Science-Backed Model', desc: 'Built using soil NPK ratios, climate data (temperature, humidity, rainfall) and soil pH for precision.' },
    { icon: '🎯', title: 'High Accuracy', desc: 'Trained with balanced dataset (100 samples per crop) and validated with multiple ML algorithms.' },
    { icon: '📱', title: 'Easy to Use', desc: 'Simple, intuitive interface that any farmer or researcher can use — no technical experience needed.' },
];

const STEPS = [
    { num: '1', icon: '📋', title: 'Enter Soil Data', desc: 'Input your soil\'s Nitrogen, Phosphorus, and Potassium (NPK) levels from your soil test report.' },
    { num: '2', icon: '🌡️', title: 'Add Climate Info', desc: 'Enter the temperature, humidity, pH level, and average rainfall for your agricultural area.' },
    { num: '3', icon: '🤖', title: 'AI Analyzes', desc: 'Our Random Forest model processes your 7 parameters through trained ML classifiers instantly.' },
    { num: '4', icon: '🌾', title: 'Get Recommendation', desc: 'Receive your personalized crop recommendation with season info, description, and growing tips.' },
];

const PARAMS = [
    { emoji: '🌿', name: 'N', full: 'Nitrogen', range: '0 – 140', unit: 'mg/kg', desc: 'Essential macronutrient for leaf growth' },
    { emoji: '🪨', name: 'P', full: 'Phosphorus', range: '5 – 145', unit: 'mg/kg', desc: 'Vital for root development & flowering' },
    { emoji: '⚗️', name: 'K', full: 'Potassium', range: '5 – 205', unit: 'mg/kg', desc: 'Boosts disease resistance & yield' },
    { emoji: '🌡️', name: 'Temp', full: 'Temperature', range: '8.8 – 43.7', unit: '°C', desc: 'Optimal crop growing temperature' },
    { emoji: '💧', name: 'Humidity', full: 'Relative Humidity', range: '14 – 100', unit: '%', desc: 'Moisture in the air around crops' },
    { emoji: '⚖️', name: 'pH', full: 'Soil pH', range: '3.5 – 9.9', unit: '', desc: 'Acid-base balance of your soil' },
    { emoji: '🌧️', name: 'Rainfall', full: 'Annual Rainfall', range: '20 – 299', unit: 'mm', desc: 'Average precipitation in your region' },
];

const CROPS = [
    { name: 'Rice', emoji: '🌾' }, { name: 'Maize', emoji: '🌽' }, { name: 'Jute', emoji: '🌿' },
    { name: 'Cotton', emoji: '🌸' }, { name: 'Coconut', emoji: '🥥' }, { name: 'Papaya', emoji: '🍈' },
    { name: 'Orange', emoji: '🍊' }, { name: 'Apple', emoji: '🍎' }, { name: 'Muskmelon', emoji: '🍑' },
    { name: 'Watermelon', emoji: '🍉' }, { name: 'Grapes', emoji: '🍇' }, { name: 'Mango', emoji: '🥭' },
    { name: 'Banana', emoji: '🍌' }, { name: 'Pomegranate', emoji: '🌺' }, { name: 'Lentil', emoji: '🫘' },
    { name: 'Blackgram', emoji: '🫘' }, { name: 'Mungbean', emoji: '🫘' }, { name: 'Mothbeans', emoji: '🫘' },
    { name: 'Pigeonpeas', emoji: '🫘' }, { name: 'Kidneybeans', emoji: '🫘' }, { name: 'Chickpea', emoji: '🫘' },
    { name: 'Coffee', emoji: '☕' },
];

const DATA_STATS = [
    { icon: '📊', num: '2,200', label: 'Training Samples' },
    { icon: '🌾', num: '22', label: 'Crop Categories' },
    { icon: '🎛️', num: '7', label: 'Input Parameters' },
    { icon: '✅', num: '99%+', label: 'Model Accuracy' },
];

const FAQS = [
    { q: 'What is the CropSense AI system?', a: 'CropSense AI is a machine learning-powered crop recommendation system. It analyzes soil nutrients (N, P, K), climate data (temperature, humidity, rainfall), and soil pH to suggest the most suitable crop for your agricultural land.' },
    { q: 'How accurate is the crop recommendation?', a: 'The model is trained on 2,200 balanced samples (100 per crop) using a Random Forest Classifier, achieving over 99% accuracy on test data. It uses MinMax Scaling and Standard Scaling for preprocessing.' },
    { q: 'What soil test values do I need?', a: 'You need NPK soil test values (available from any agricultural lab), your local temperature range, relative humidity percentage, soil pH, and average annual rainfall in mm.' },
    { q: 'Which crops can it recommend?', a: 'The system covers 22 crops: rice, maize, jute, cotton, coconut, papaya, orange, apple, muskmelon, watermelon, grapes, mango, banana, pomegranate, lentil, blackgram, mungbean, mothbeans, pigeonpeas, kidneybeans, chickpea, and coffee.' },
    { q: 'Is the recommendation guaranteed?', a: 'The AI provides data-driven recommendations based on ML patterns from the dataset. While highly accurate, final decisions should also account for local land conditions, market demand, and agricultural expertise.' },
    { q: 'Can I use this for commercial farming?', a: 'Absolutely! The system applies to any scale — small farms, large commercial agriculture, and research purposes. The insights are particularly useful during crop planning cycles.' },
];

export default function Landing() {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <main>
            {/* ====== HERO ====== */}
            <section className={styles.hero}>
                <div className={styles.heroOrb1} />
                <div className={styles.heroOrb2} />
                <div className={styles.heroOrb3} />
                <div className={styles.heroInner}>
                    <div className={styles.heroContent}>
                        <div className={styles.heroBadge}>
                            <span className={styles.badgeDot} />
                            AI-Powered Agricultural Intelligence
                        </div>
                        <h1 className={styles.heroTitle}>
                            Smart Crop{' '}
                            <span className="gradient-text">Recommendation</span>{' '}
                            for Modern Farming
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Enter your soil and climate parameters, and let our Machine Learning model
                            recommend the best crop to maximize your yield and profitability.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link to="/predict" className="btn-primary">
                                🌱 Get Recommendation
                            </Link>
                            <a href="#how-it-works" className="btn-outline">
                                How It Works ↓
                            </a>
                        </div>
                        <div className={styles.heroStats}>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>2,200</div>
                                <div className={styles.statLabel}>Training Samples</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>22</div>
                                <div className={styles.statLabel}>Crop Types</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>99%+</div>
                                <div className={styles.statLabel}>Accuracy</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroVisual}>
                        <div className={styles.heroCard}>
                            <div className={styles.floatBadge}>🤖 AI Model</div>
                            <div className={styles.heroCardHeader}>
                                <div className={styles.heroCardIcon}>🌱</div>
                                <div>
                                    <div className={styles.heroCardTitle}>Soil Analysis</div>
                                    <div className={styles.heroCardSub}>7 parameters analyzed</div>
                                </div>
                            </div>
                            <div className={styles.heroParams}>
                                <div className={styles.heroParam}>
                                    <span className={styles.heroParamLabel}>Nitrogen (N)</span>
                                    <span className={styles.heroParamVal}>90 mg/kg</span>
                                </div>
                                <div className={styles.heroParam}>
                                    <span className={styles.heroParamLabel}>Phosphorus (P)</span>
                                    <span className={styles.heroParamVal}>42 mg/kg</span>
                                </div>
                                <div className={styles.heroParam}>
                                    <span className={styles.heroParamLabel}>Temperature</span>
                                    <span className={styles.heroParamVal}>20.8 °C</span>
                                </div>
                                <div className={styles.heroParam}>
                                    <span className={styles.heroParamLabel}>Rainfall</span>
                                    <span className={styles.heroParamVal}>202.9 mm</span>
                                </div>
                            </div>
                            <div className={styles.heroResult}>
                                <div>
                                    <div className={styles.heroResultLabel}>Recommended Crop</div>
                                    <div className={styles.heroResultCrop}>🌾 Rice</div>
                                </div>
                                <div className={styles.heroResultConf}>99.2%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== FEATURES ====== */}
            <section className={styles.features}>
                <div className="container">
                    <p className={styles.sectionLabel}>Why CropSense AI</p>
                    <h2 className={styles.sectionTitle}>
                        Built for <span className="gradient-text">Precision Agriculture</span>
                    </h2>
                    <p className={styles.sectionDesc}>
                        Combining cutting-edge machine learning with agricultural science to help farmers make smarter decisions.
                    </p>
                    <div className={styles.featuresGrid}>
                        {FEATURES.map((f) => (
                            <div key={f.title} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{f.icon}</div>
                                <h3 className={styles.featureTitle}>{f.title}</h3>
                                <p className={styles.featureDesc}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== HOW IT WORKS ====== */}
            <section id="how-it-works" className={styles.howItWorks}>
                <div className="container">
                    <p className={styles.sectionLabel}>Simple Process</p>
                    <h2 className={styles.sectionTitle}>
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className={styles.sectionDesc}>
                        From soil data to crop recommendation in 4 simple steps.
                    </p>
                    <div className={styles.stepsGrid}>
                        {STEPS.map((s) => (
                            <div key={s.num} className={styles.step}>
                                <div className={styles.stepNum}>{s.icon}</div>
                                <h3 className={styles.stepTitle}>{s.title}</h3>
                                <p className={styles.stepDesc}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== PARAMETERS ====== */}
            <section className={styles.parameters}>
                <div className="container">
                    <p className={styles.sectionLabel}>Input Parameters</p>
                    <h2 className={styles.sectionTitle}>
                        7 Key <span className="gradient-text">Data Points</span>
                    </h2>
                    <p className={styles.sectionDesc}>
                        Each parameter plays a critical role in determining what crop will thrive in your land.
                    </p>
                    <div className={styles.paramsGrid}>
                        {PARAMS.map((p) => (
                            <div key={p.name} className={styles.paramCard}>
                                <div className={styles.paramEmoji}>{p.emoji}</div>
                                <div className={styles.paramName}>{p.name} {p.unit && <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400, fontSize: '0.75rem' }}>({p.unit})</span>}</div>
                                <div className={styles.paramFull}>{p.full}</div>
                                <div className={styles.paramRange}>Range: {p.range}</div>
                                <p style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== CROPS SHOWCASE ====== */}
            <section className={styles.cropsSection}>
                <div className="container">
                    <p className={styles.sectionLabel}>Coverage</p>
                    <h2 className={styles.sectionTitle}>
                        22 Crops <span className="gradient-text">Covered</span>
                    </h2>
                    <p className={styles.sectionDesc}>
                        From cereals to fruits, pulses to plantation crops — we support the top crops grown across India and beyond.
                    </p>
                    <div className={styles.cropsScroll}>
                        {CROPS.map((c) => (
                            <div key={c.name} className={styles.cropChip}>
                                <span className={styles.cropEmoji}>{c.emoji}</span>
                                <span className={styles.cropName}>{c.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== DATA STATS ====== */}
            <section className={styles.dataStats}>
                <div className="container">
                    <p className={styles.sectionLabel}>Dataset & Model</p>
                    <h2 className={styles.sectionTitle}>
                        Backed by <span className="gradient-text">Real Data</span>
                    </h2>
                    <p className={styles.sectionDesc}>
                        Our model is built on a rigorous dataset and validated against industry-standard ML benchmarks.
                    </p>
                    <div className={styles.statsGrid}>
                        {DATA_STATS.map((s) => (
                            <div key={s.label} className={styles.statCard}>
                                <div className={styles.statCardIcon}>{s.icon}</div>
                                <div className={styles.statCardNum}>{s.num}</div>
                                <div className={styles.statCardLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== FAQ ====== */}
            <section className={styles.faq}>
                <div className="container">
                    <p className={styles.sectionLabel}>FAQ</p>
                    <h2 className={styles.sectionTitle}>
                        Common <span className="gradient-text">Questions</span>
                    </h2>
                    <p className={styles.sectionDesc}>
                        Everything you need to know about CropSense AI.
                    </p>
                    <div className={styles.faqList}>
                        {FAQS.map((faq, i) => (
                            <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.open : ''}`}>
                                <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    {faq.q}
                                    <span className={styles.faqChevron}>▼</span>
                                </button>
                                <div className={styles.faqA}>{faq.a}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== CTA BANNER ====== */}
            <section className={styles.ctaBanner}>
                <div className="container">
                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>
                            Ready to <span className="gradient-text">Grow Smarter?</span>
                        </h2>
                        <p className={styles.ctaDesc}>
                            Enter your soil and climate data now and discover which crop will give you the best yield.
                        </p>
                        <div className={styles.ctaBtns}>
                            <Link to="/predict" className="btn-primary">
                                🌾 Start Free Prediction
                            </Link>
                            <Link to="/about" className="btn-outline">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== FOOTER ====== */}
            <footer className={styles.footer}>
                <div className="container">
                    <p className={styles.footerText}>
                        © 2026 <span>CropSense AI</span> — Capstone Project | Made with 💚 for smarter farming
                    </p>
                </div>
            </footer>
        </main>
    );
}
