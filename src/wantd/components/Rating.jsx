import { StarIcon } from "./Icons.jsx";

export default function Rating({ value, count }) {
  return (
    <div className="rating" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= Math.round(value)} />
      ))}
      <span>{value}{count != null && ` (${count})`}</span>
    </div>
  );
}
