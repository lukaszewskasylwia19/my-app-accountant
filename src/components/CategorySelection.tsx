import "../style/CategorySelection.css";

interface CategorySelectionProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

export default function CategorySelection({ categories, onSelectCategory }: CategorySelectionProps) {
  return (
    <div className="category-container">
      <h2 className="category-title">Wybierz kategorię</h2>
      <div className="category-options">
        {categories.map((category) => (
          <button key={category} onClick={() => onSelectCategory(category)} className="category-option">
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
