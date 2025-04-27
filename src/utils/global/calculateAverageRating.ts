type TVotes = {
  [key: number]: number;
};

function calculateAverageRating(votes: TVotes): {
  totalVotes: number;
  averageRating: number;
} {
  let totalWeightedRating = 0;
  let totalVotes = 0;

  Object.entries(votes).forEach(([rate, votesCount]) => {
    totalWeightedRating += +rate * votesCount;
    totalVotes += votesCount;
  });
  return {
    totalVotes,
    averageRating: +(totalWeightedRating / totalVotes).toFixed(2),
  };
}

export default calculateAverageRating;
