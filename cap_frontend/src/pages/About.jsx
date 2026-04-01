import { Link } from 'react-router-dom';
import styles from './About.module.css';

const MODEL_DETAILS = [
    { icon: '🌳', label: 'Algorithm', value: 'Random Forest' },
    { icon: '📊', label: 'Training Set', value: '2,200 Samples' },
    { icon: '🎯', label: 'Accuracy', value: '99%+' },
    { icon: '🌾', label: 'Crop Classes', value: '22 Crops' },
    { icon: '🔢', label: 'Input Features', value: '7 Parameters' },
    { icon: '⚙️', label: 'Preprocessing', value: 'MinMax + Standard' },
];

const DATASET_FACTS = [
    { icon: '🗄️', text: '2,200 balanced samples — 100 per crop class' },
    { icon: '🔢', text: '7 numerical features, 0 missing values' },
    { icon: '✅', text: 'No outliers — clean, validated dataset' },
    { icon: '📈', text: 'Covers crops from all major categories' },
    { icon: '🌡️', text: 'Temperature range: 8.8°C to 43.7°C' },
    { icon: '💧', text: 'Rainfall range: 20mm to 298.5mm' },
];

const ALGORITHMS = [
    { emoji: '🌳', name: 'Random Forest Classifier', desc: 'Primary model — ensemble of decision trees, best accuracy', badge: '🏆 Best Model' },
    { emoji: '📐', name: 'Logistic Regression', desc: 'Linear baseline model for comparison', badge: 'Baseline' },
    { emoji: '🧠', name: 'Naive Bayes (Gaussian)', desc: 'Probabilistic classifier, fast inference', badge: 'Probabilistic' },
    { emoji: '📏', name: 'K-Nearest Neighbors', desc: 'Distance-based classification algorithm', badge: 'KNN' },
    { emoji: '🌿', name: 'Decision Tree', desc: 'Interpretable single tree model', badge: 'Interpretable' },
    { emoji: '🚀', name: 'Gradient Boosting', desc: 'Sequential ensemble for high accuracy', badge: 'Ensemble' },
];

const TECH_STACK = [
    'Python', 'scikit-learn', 'NumPy', 'pandas', 'Matplotlib', 'Seaborn',
    'Node.js', 'Express.js', 'React.js', 'Vite', 'CSS Modules', 'Axios'
];

export default function About() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Hero */}
                <div className={styles.hero}>
                    <div className={styles.badge}>🎓 Capstone Project</div>
                    <h1 className={styles.title}>
                        About <span className="gradient-text">CropSense AI</span>
                    </h1>
                    <p className={styles.subtitle}>
                        A Machine Learning-powered crop recommendation system built as a Semester 7 Capstone Project.
                        It uses soil and climate data to predict the best crop to grow, achieving 99%+ accuracy.
                    </p>
                </div>

                {/* Overview */}
                <div className={styles.overview}>
                    <h2 className={styles.sectionTitle}>🌾 Project Overview</h2>
                    <div className={styles.overviewGrid}>
                        <p className={styles.overviewText}>
                            CropSense AI addresses a critical challenge in agriculture: choosing the right crop for the right conditions.
                            Traditional methods rely on farmer experience and guesswork. Our AI model analyzes 7 key soil and climate
                            parameters to provide data-driven, scientifically accurate recommendations — helping maximize yield
                            and minimize losses for farmers.
                        </p>
                        <p className={styles.overviewText}>
                            The system is trained on a clean, balanced dataset of 2,200 samples covering 22 major crop types.
                            We benchmarked multiple ML classifiers including Random Forest, Gradient Boosting, Logistic Regression,
                            and others. The Random Forest Classifier achieved the highest accuracy and was selected as the
                            production model, serialized as a <code style={{ color: '#4ec97e', fontFamily: 'monospace' }}>model.pkl</code> file.
                        </p>
                    </div>
                </div>

                {/* Model Details */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 className={styles.sectionTitle}>🤖 ML Model Details</h2>
                    <div className={styles.modelGrid}>
                        {MODEL_DETAILS.map(m => (
                            <div key={m.label} className={styles.modelItem}>
                                <div className={styles.modelIcon}>{m.icon}</div>
                                <div className={styles.modelLabel}>{m.label}</div>
                                <div className={styles.modelValue}>{m.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dataset */}
                <div className={styles.datasetSection}>
                    <h2 className={styles.sectionTitle}>📊 Dataset Details</h2>
                    <div className={styles.datasetGrid}>
                        {DATASET_FACTS.map(f => (
                            <div key={f.text} className={styles.datasetFact}>
                                <span className={styles.factIcon}>{f.icon}</span>
                                <span>{f.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Algorithms Compared */}
                <div className={styles.algoSection}>
                    <h2 className={styles.sectionTitle}>🔬 Algorithms Benchmarked</h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '0' }}>
                        We compared multiple ML algorithms. Random Forest emerged as the best performer.
                    </p>
                    <div className={styles.algoList}>
                        {ALGORITHMS.map(a => (
                            <div key={a.name} className={styles.algoItem}>
                                <div className={styles.algoLeft}>
                                    <span className={styles.algoEmoji}>{a.emoji}</span>
                                    <div>
                                        <div className={styles.algoName}>{a.name}</div>
                                        <div className={styles.algoDesc}>{a.desc}</div>
                                    </div>
                                </div>
                                <div className={styles.algoBadge}>{a.badge}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team / Tech Stack */}
                <div className={styles.teamSection}>
                    <h2 className={styles.sectionTitle}>🛠️ Technology Stack</h2>
                    <p className={styles.teamDesc}>
                        This project is built using Python for ML, Node.js + Express for the backend API,
                        and React.js with CSS Modules for the frontend interface.
                    </p>
                    <div className={styles.teamStack}>
                        {TECH_STACK.map(t => (
                            <span key={t} className={styles.chip}>{t}</span>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', padding: '1rem 0 2rem' }}>
                    <Link to="/predict" className="btn-primary">
                        🌾 Try the Prediction Tool
                    </Link>
                </div>
            </div>
        </div>
    );
}
