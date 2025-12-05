import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container-fluid px-0">
      {/* === Hero Section with Logo + Hero Text === */}
      <section className="hero-section d-flex">
        <div className="row w-100 m-0">

          {/* === Left Half: Logo === */}
          <div className="col-md-6 d-flex justify-content-center align-items-center logo-half">
            <img
              src="/assets/logo.jpg"
              alt="SmartFin Logo"
              className="img-fluid logo-large"
            />
          </div>

          {/* === Right Half: Hero Text === */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="hero-textbox text-center">
              <h1 className="text-color">Plan. Predict. Prosper.</h1>
              <p className="lead">
                Unify all your finances in one dashboard. Get smarter with AI-powered insights and forecasting.
              </p>
              <Link to="/dashboard" className="btn btn-primary btn-lg mt-3 shadow">
                Explore Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === Info Cards Section === */}
      <section className="info-section py-5">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-4">
              <div className="info-card p-3 border rounded shadow-sm bg-light">
                <h5 className="text-primary mb-2">📌 Key Highlights</h5>
                <ul className="list-unstyled mb-0">
                  <li>✅ Upload transaction files (CSV/XLSX)</li>
                  <li>✅ Visualize income, expenses, savings</li>
                  <li>✅ Ask AI for investment advice</li>
                  <li>✅ Track financial goals with ease</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="info-card p-3 border rounded shadow-sm bg-light">
                <h5 className="text-primary mb-2">🎯 Who’s It For?</h5>
                <ul className="list-unstyled mb-0">
                  <li>👩‍🎓 Students managing daily budgets</li>
                  <li>💼 Professionals planning savings</li>
                  <li>🧑‍💻 Freelancers tracking income</li>
                  <li>📊 Beginners learning personal finance</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="info-card p-3 border rounded shadow-sm bg-light">
                <h5 className="text-primary mb-2">⚙️ How It Works</h5>
                <ul className="list-unstyled mb-0">
                  <li>📥 Upload your transaction data (CSV/XLSX)</li>
                  <li>📊 Get instant charts for income & expenses</li>
                  <li>🤖 Ask AI for budgeting and investment tips</li>
                  <li>🎯 Track goals and monitor progress visually</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
