import { Link } from 'react-router-dom';
import { TreePine, BarChart3, Target, Sprout, Hash, Settings, Database, CheckCircle, TrendingUp, Thermometer, Droplets, Brain, Activity, Leaf, Rocket, GraduationCap, Bot, TestTube, Wrench } from 'lucide-react';
import styles from './About.module.css';

const MODEL_DETAILS = [
    { icon: TreePine, label: 'Algorithm', value: 'Random Forest' },
    { icon: BarChart3, label: 'Training Set', value: '2,200 Samples' },
    { icon: Target, label: 'Accuracy', value: '99%+' },
    { icon: Sprout, label: 'Crop Classes', value: '22 Crops' },
    { icon: Hash, label: 'Input Features', value: '7 Parameters' },
    { icon: Settings, label: 'Preprocessing', value: 'MinMax + Standard' },
];

const DATASET_FACTS = [
    { icon: Database, text: '2,200 balanced samples — 100 per crop class' },
    { icon: Hash, text: '7 numerical features, 0 missing values' },
    { icon: CheckCircle, text: 'No outliers — clean, validated dataset' },
    { icon: TrendingUp, text: 'Covers crops from all major categories' },
    { icon: Thermometer, text: 'Temperature range: 8.8°C to 43.7°C' },
    { icon: Droplets, text: 'Rainfall range: 20mm to 298.5mm' },
];

const ALGORITHMS = [
    { icon: TreePine, name: 'Random Forest Classifier', desc: 'Primary model — ensemble of decision trees, best accuracy', badge: 'Best Model' },
    { icon: TrendingUp, name: 'Logistic Regression', desc: 'Linear baseline model for comparison', badge: 'Baseline' },
    { icon: Brain, name: 'Naive Bayes (Gaussian)', desc: 'Probabilistic classifier, fast inference', badge: 'Probabilistic' },
    { icon: Activity, name: 'K-Nearest Neighbors', desc: 'Distance-based classification algorithm', badge: 'KNN' },
    { icon: Leaf, name: 'Decision Tree', desc: 'Interpretable single tree model', badge: 'Interpretable' },
    { icon: Rocket, name: 'Gradient Boosting', desc: 'Sequential ensemble for high accuracy', badge: 'Ensemble' },
];

const TECH_STACK = [
    'Python', 'scikit-learn', 'NumPy', 'pandas',
    'Node.js', 'Express.js', 'React.js', 'Vite', 'CSS Modules', 'Lucide React', 'Axios'
];

export default function About() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Hero */}
                <div className={styles.hero}>
                    <div className={styles.badge}><GraduationCap size={14} /> Capstone Project</div>
                    <h1 className={styles.title}>
                        About <span className="gradient-text">CropSense AI</span>
                    </h1>
                    <p className={styles.subtitle}>
                        A Machine Learning-powered crop recommendation system built as a Capstone Project.
                        It uses soil and climate data to predict the best crop to grow, achieving 99%+ accuracy.
                    </p>
                </div>

                {/* Overview */}
                <div className={styles.overview}>
                    <h2 className={styles.sectionTitle}><Sprout size={24} color="#4ec97e" /> Project Overview</h2>
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
                            production model, serialized as a <code className={styles.codeGreen}>model.pkl</code> file.
                        </p>
                    </div>
                </div>

                {/* Model Details */}
                <div className={styles.modelSection}>
                    <h2 className={styles.sectionTitle}><Bot size={24} color="#4ec97e" /> ML Model Details</h2>
                    <div className={styles.modelGrid}>
                        {MODEL_DETAILS.map(m => (
                            <div key={m.label} className={styles.modelItem}>
                                <div className={styles.modelIcon}><m.icon size={28} /></div>
                                <div className={styles.modelLabel}>{m.label}</div>
                                <div className={styles.modelValue}>{m.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dataset */}
                <div className={styles.datasetSection}>
                    <h2 className={styles.sectionTitle}><BarChart3 size={24} color="#4ec97e" /> Dataset Details</h2>
                    <div className={styles.datasetGrid}>
                        {DATASET_FACTS.map(f => (
                            <div key={f.text} className={styles.datasetFact}>
                                <span className={styles.factIcon}><f.icon size={18} /></span>
                                <span>{f.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Algorithms Compared */}
                <div className={styles.algoSection}>
                    <h2 className={styles.sectionTitle}><TestTube size={24} color="#4ec97e" /> Algorithms Benchmarked</h2>
                    <p className={styles.algoSectionDesc}>
                        We compared multiple ML algorithms. Random Forest emerged as the best performer.
                    </p>
                    <div className={styles.algoList}>
                        {ALGORITHMS.map(a => (
                            <div key={a.name} className={styles.algoItem}>
                                <div className={styles.algoLeft}>
                                    <span className={styles.algoEmoji}><a.icon size={20} /></span>
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
                    <h2 className={styles.sectionTitle}><Wrench size={24} color="#4ec97e" /> Technology Stack</h2>
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
                <div className={styles.ctaSection}>
                    <Link to="/predict" className={`btn-primary ${styles.btnFlex}`}>
                        <Sprout size={18} /> Try the Prediction Tool
                    </Link>
                </div>
            </div>
        </div>
    );
}
