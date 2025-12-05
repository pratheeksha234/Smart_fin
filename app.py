from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pdfplumber
import logging
import openai
import yfinance as yf
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

openai.api_key = os.getenv("OPENAI_API_KEY")

# === Helper to parse PDF ===
def parse_pdf(file):
    try:
        all_data = []
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                table = page.extract_table()
                if table:
                    headers = table[0]
                    for row in table[1:]:
                        all_data.append(dict(zip(headers, row)))
        df = pd.DataFrame(all_data)

        # Normalize column names
        df.columns = df.columns.str.strip()
        df = df.rename(columns=lambda x: x.strip().capitalize())

        if not {'Date', 'Category', 'Amount'}.issubset(df.columns):
            raise ValueError("PDF missing required columns: Date, Category, Amount")

        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce')
        df = df.dropna(subset=['Date', 'Amount', 'Category'])
        return df

    except Exception as e:
        logging.error(f"Failed to parse PDF: {e}")
        raise ValueError("Could not extract structured data from PDF.")


# === Upload Endpoint ===
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
        elif file.filename.endswith('.pdf'):
            df = parse_pdf(file)
        else:
            return jsonify({'error': 'Unsupported file format'}), 400

        required_columns = {'Date', 'Category', 'Amount'}
        if not required_columns.issubset(df.columns):
            return jsonify({'error': f'Missing required columns: {required_columns}'}), 400

        df['Date'] = pd.to_datetime(df['Date'])
        df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce').fillna(0)

        total_income = df[df['Amount'] > 0]['Amount'].sum()
        total_expense = df[df['Amount'] < 0]['Amount'].sum()
        savings = df['Amount'].sum()

        top_expenses = (
            df[df['Amount'] < 0]
            .groupby('Category')['Amount']
            .sum()
            .abs()
            .nlargest(5)
            .to_dict()
        )

        df['Month'] = df['Date'].dt.to_period('M').astype(str)
        monthly_data = df.groupby(['Month']).agg(
            income=('Amount', lambda x: x[x > 0].sum()),
            expense=('Amount', lambda x: x[x < 0].sum())
        ).fillna(0).reset_index()
        monthly_data['expense'] = monthly_data['expense'].abs()

        return jsonify({
            'message': 'File uploaded successfully',
            'summary': {
                'total_income': total_income,
                'total_expense': abs(total_expense),
                'savings': savings,
                'top_expenses': top_expenses,
                'monthly': monthly_data.to_dict(orient='records')
            }
        })

    except Exception as e:
        logging.error(f"Error processing file: {str(e)}")
        return jsonify({'error': f'Failed to process file: {str(e)}'}), 500


# === AI Chat, Transactions, Health check (keep as is) ===
@app.route('/')
def home():
    return "✅ Flask backend is running."

if __name__ == '__main__':
    app.run(debug=True)