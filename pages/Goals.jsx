import React, { useState } from 'react';

const Goals = () => {
  const [goals, setGoals] = useState([
    { title: 'Emergency Fund', targetAmount: 50000, saved: 15000, deadline: '2025-12-31' },
    { title: 'Vacation', targetAmount: 30000, saved: 10000, deadline: '2025-08-01' },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
  });

  const [contributions, setContributions] = useState({});

  const handleChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) return;

    const goal = {
      ...newGoal,
      saved: 0,
      targetAmount: parseFloat(newGoal.targetAmount),
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', targetAmount: '', deadline: '' });
  };

  const handleContributionChange = (e, index) => {
    setContributions({ ...contributions, [index]: e.target.value });
  };

  const handleAddSavings = (index) => {
    const amountToAdd = parseFloat(contributions[index]);
    if (!amountToAdd || amountToAdd <= 0) return;

    const updatedGoals = [...goals];
    updatedGoals[index].saved += amountToAdd;
    setGoals(updatedGoals);

    setContributions({ ...contributions, [index]: '' });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🎯 Financial Goals</h2>

      <div className="card p-4 mb-4">
        <h5>Add New Goal</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Goal Title"
              name="title"
              value={newGoal.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Target Amount"
              name="targetAmount"
              value={newGoal.targetAmount}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              name="deadline"
              value={newGoal.deadline}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="btn btn-success mt-3" onClick={handleAddGoal}>
          ➕ Add Goal
        </button>
      </div>

      {goals.map((goal, index) => {
        const progress = Math.min(
          Math.round((goal.saved / goal.targetAmount) * 100),
          100
        );

        return (
          <div className="card p-3 mb-3" key={index}>
            <h5>{goal.title}</h5>
            <p>
              Target: ₹{goal.targetAmount.toLocaleString()} | Deadline: {goal.deadline}
            </p>
            <div className="progress mb-2" style={{ height: '20px' }}>
              <div
                className="progress-bar bg-info"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            <small>Saved: ₹{goal.saved.toLocaleString()}</small>

            <div className="input-group mt-2">
              <input
                type="number"
                className="form-control"
                placeholder="Add to savings"
                value={contributions[index] || ''}
                onChange={(e) => handleContributionChange(e, index)}
              />
              <button
                className="btn btn-primary"
                onClick={() => handleAddSavings(index)}
              >
                💰 Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Goals;
