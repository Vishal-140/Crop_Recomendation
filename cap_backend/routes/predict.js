const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

// Input validation ranges based on dataset statistics
const VALID_RANGES = {
    N: { min: 0, max: 140, label: 'Nitrogen (N)' },
    P: { min: 5, max: 145, label: 'Phosphorus (P)' },
    K: { min: 5, max: 205, label: 'Potassium (K)' },
    temperature: { min: 8, max: 44, label: 'Temperature' },
    humidity: { min: 14, max: 100, label: 'Humidity' },
    ph: { min: 3.5, max: 10, label: 'pH' },
    rainfall: { min: 20, max: 299, label: 'Rainfall' }
};

function validateInputs(body) {
    const errors = [];
    for (const [key, range] of Object.entries(VALID_RANGES)) {
        const val = parseFloat(body[key]);
        if (body[key] === undefined || body[key] === null || body[key] === '') {
            errors.push(`${range.label} is required`);
        } else if (isNaN(val)) {
            errors.push(`${range.label} must be a number`);
        } else if (val < range.min || val > range.max) {
            errors.push(`${range.label} must be between ${range.min} and ${range.max}`);
        }
    }
    return errors;
}

router.post('/predict', (req, res) => {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    // Validate inputs
    const errors = validateInputs(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const scriptPath = path.join(__dirname, '..', 'predict.py');
    const args = [N, P, K, temperature, humidity, ph, rainfall].map(String);

    const pythonProcess = spawn('python3', [scriptPath, ...args], {
        env: { ...process.env }
    });

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error('Python script error:', stderr);
            return res.status(500).json({
                error: 'Prediction failed',
                message: stderr || 'Unknown error from ML model'
            });
        }

        try {
            const result = JSON.parse(stdout.trim());
            if (result.error) {
                return res.status(500).json({ error: result.error });
            }
            return res.json(result);
        } catch (parseError) {
            console.error('Parse error:', parseError, 'stdout:', stdout);
            return res.status(500).json({ error: 'Failed to parse model output' });
        }
    });

    pythonProcess.on('error', (err) => {
        console.error('Failed to spawn Python process:', err);
        res.status(500).json({ error: 'Failed to run ML model. Is Python installed?' });
    });
});

module.exports = router;
