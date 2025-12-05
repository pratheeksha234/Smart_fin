# === ML Processing Logic ===
# File: smartfin-backend/model.py

def process_data(df):
    summary = {}

    # Basic summaries
    summary['total_income'] = df[df['Type'] == 'Income']['Amount'].sum()
    summary['total_expense'] = df[df['Type'] == 'Expense']['Amount'].sum()
    summary['savings'] = summary['total_income'] - summary['total_expense']

    # Top categories
    if 'Category' in df.columns:
        summary['top_expenses'] = df[df['Type'] == 'Expense'].groupby('Category')['Amount'].sum().nlargest(3).to_dict()

    return summary
