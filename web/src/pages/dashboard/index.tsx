// src/App.js
import React, { useEffect, useState } from 'react';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  // Dummy data for initial reviews
  const dummyReviews = [
    { rating: 4, comment: 'Great recipe!' },
    { rating: 5, comment: 'Absolutely loved it!' },
    { rating: 3.5, comment: 'Great !' },
    { rating: 4.5, comment: 'Nice recipe!' },
  ];

  // Calculate average rating from current reviews
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return null;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(2);
  };

  // Simulate fetching reviews and average rating when component mounts
  useEffect(() => {
    setReviews(dummyReviews);
    setAverageRating(calculateAverageRating(dummyReviews));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input
    if (newRating < 1 || newRating > 5) {
      alert('Please provide a rating between 1 and 5.');
      return;
    }

    if (!newComment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    // Create a new review
    const newReview = {
      rating: newRating,
      comment: newComment,
    };

    // Update the reviews state
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setAverageRating(calculateAverageRating(updatedReviews));

    // Clear the input fields
    setNewRating(0);
    setNewComment('');
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Recipe Reviews</h1>
      <h2 className="text-xl mb-3">Average Rating: {averageRating || 'No ratings yet'}</h2>

      <form onSubmit={handleSubmit} className="mb-5">
        <div>
          <label className="block">Rating:</label>
          <input
            type="number"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            min="1"
            max="5"
            className="border p-2 mb-3"
            placeholder="Enter rating (1-5)"
          />
        </div>
        <div>
          <label className="block">Comment:</label>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} // Ensure this updates the state
            className="border p-2 mb-3"
            placeholder="Write your comment here..."
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit Review</button>
      </form>

      <h2 className="text-xl mb-3">Reviews:</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className="mb-2 border p-3 rounded">
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
