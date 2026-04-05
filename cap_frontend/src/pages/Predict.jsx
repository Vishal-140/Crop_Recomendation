import { useState } from 'react';
import { predictCrop } from '../services/api';
import { Leaf, MountainSnow, FlaskConical, Thermometer, Droplets, Scale, CloudRain, BrainCircuit, TreePine, BarChart3, CheckCircle, RefreshCw, Sparkles, Lightbulb } from 'lucide-react';
import styles from './Predict.module.css';

const INITIAL_FORM = { N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: '' };

const FIELDS = [
    { key: 'N', label: 'Nitrogen (N)', hint: '0 – 140', placeholder: 'e.g. 90', unit: 'mg/kg', icon: Leaf },
    { key: 'P', label: 'Phosphorus (P)', hint: '5 – 145', placeholder: 'e.g. 42', unit: 'mg/kg', icon: MountainSnow },
    { key: 'K', label: 'Potassium (K)', hint: '5 – 205', placeholder: 'e.g. 43', unit: 'mg/kg', icon: FlaskConical },
    { key: 'temperature', label: 'Temperature', hint: '8 – 44', placeholder: 'e.g. 20.8', unit: '°C', icon: Thermometer },
    { key: 'humidity', label: 'Humidity', hint: '14 – 100', placeholder: 'e.g. 82', unit: '%', icon: Droplets },
    { key: 'ph', label: 'Soil pH', hint: '3.5 – 10', placeholder: 'e.g. 6.5', unit: '', icon: Scale },
    { key: 'rainfall', label: 'Rainfall', hint: '20 – 299', placeholder: 'e.g. 202.9', unit: 'mm', icon: CloudRain },
];

export default function Predict() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setFieldErrors(prev => ({ ...prev, [e.target.name]: '' }));
        setError('');
    };

    const validate = () => {
        const errs = {};
        FIELDS.forEach(({ key, label }) => {
            if (!form[key] && form[key] !== 0) {
                errs[key] = `${label.replace(/^.*? /, '')} is required`;
            } else if (isNaN(Number(form[key]))) {
                errs[key] = 'Must be a number';
            }
        });
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setFieldErrors(errs); return; }
        setLoading(true); setError(''); setResult(null);
        try {
            const payload = Object.fromEntries(FIELDS.map(f => [f.key, Number(form[f.key])]));
            const data = await predictCrop(payload);
            setResult(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            const data = err.response?.data;
            if (data?.details && Array.isArray(data.details)) {
                setError(`Validation error: ${data.details.join(', ')}`);
            } else {
                const msg = data?.error || data?.message || 'Failed to get prediction. Is the backend running?';
                setError(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setForm(INITIAL_FORM);
        setResult(null);
        setError('');
        setFieldErrors({});
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.badge}><BrainCircuit size={14} /> ML-Powered Prediction</div>
                    <h1 className={styles.title}>
                        Get Your <span className="gradient-text">Crop Recommendation</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Enter your soil and climate parameters below. Our AI model will analyze them and suggest the best crop to grow.
                    </p>
                </div>

                {/* Result */}
                {result && (
                    <div className={styles.resultCard}>
                        <img
                            src={`/crop-icons/${result.icon || 'rice.png'}`}
                            alt={result.crop}
                            className={styles.resultCropIcon}
                        />
                        <div className={styles.resultTextWrap}>
                            <div className={styles.resultLabel}>RECOMMENDED CROP</div>
                            <div className={styles.resultCrop}>{result.crop}</div>
                            
                            <div className={styles.resultMeta}>
                                <span className={styles.resultBadge}><TreePine size={14} /> Random Forest Model</span>
                                <span className={styles.resultBadge}><BarChart3 size={14} /> Trained on 2,200 samples</span>
                                <span className={styles.resultBadge}><CheckCircle size={14} /> Dataset-validated</span>
                            </div>
                            
                            <button className={styles.resultAgain} onClick={handleReset}>
                                <RefreshCw size={18} /> Try Another Prediction
                            </button>
                        </div>
                    </div>
                )}

                {/* Form */}
                {!result && (
                    <div className={styles.formCard}>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className={styles.formGrid}>
                                {FIELDS.map(({ key, label, hint, placeholder, icon: Icon }) => (
                                    <div key={key} className={styles.inputGroup}>
                                        <label className={styles.label} htmlFor={key}>
                                            <span className={styles.labelIcon}><Icon size={16} /> {label}</span>
                                            <span className={styles.labelHint}>{hint}</span>
                                        </label>
                                        <input
                                            id={key}
                                            name={key}
                                            type="number"
                                            step="any"
                                            placeholder={placeholder}
                                            value={form[key]}
                                            onChange={handleChange}
                                            className={`${styles.input} ${fieldErrors[key] ? styles.inputError : ''}`}
                                        />
                                        {fieldErrors[key] && <span className={styles.errorMsg}>{fieldErrors[key]}</span>}
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className={styles.apiError}>
                                    ⚠️ {error}
                                </div>
                            )}

                            <div className={styles.formActions}>
                                <button type="submit" className={styles.submitBtn} disabled={loading}>
                                    {loading ? <><div className={styles.spinner} /> Analyzing...</> : <><Sparkles size={18} /> Predict Best Crop</>}
                                </button>
                                <button type="button" className={styles.resetBtn} onClick={handleReset}>
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tips */}
                {!result && (
                    <div className={styles.tips}>
                        <div className={styles.tipsTitle}><Lightbulb size={20} color="#ffdd57" /> Tips for Accurate Results</div>
                        <ul className={styles.tipsList}>
                            <li className={styles.tipItem}>Get soil NPK values from a certified soil testing laboratory for your region.</li>
                            <li className={styles.tipItem}>Use average temperature and humidity for the main growing season, not daily extremes.</li>
                            <li className={styles.tipItem}>Rainfall should be the average annual precipitation in millimetres for your location.</li>
                            <li className={styles.tipItem}>Soil pH can be measured with a simple pH test kit or soil probe available at agri-stores.</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
