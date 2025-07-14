import React, { useState } from "react";
import './SearchBox.css';

// Icon Components
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string>("");

  // Popular search tags with subcategories
  const searchTags = [
    {
      name: "Electronics",
      subcategories: [
        { name: "Smartphones", count: 145 },
        { name: "Laptops", count: 89 },
        { name: "Headphones", count: 67 },
        { name: "Cameras", count: 34 },
        { name: "Smart Watches", count: 56 }
      ]
    },
    {
      name: "Phones",
      subcategories: [
        { name: "iPhone", count: 45 },
        { name: "Samsung", count: 38 },
        { name: "Google Pixel", count: 22 },
        { name: "OnePlus", count: 18 },
        { name: "Accessories", count: 89 }
      ]
    },
    {
      name: "Laptops",
      subcategories: [
        { name: "MacBook", count: 25 },
        { name: "Dell", count: 32 },
        { name: "HP", count: 28 },
        { name: "Gaming Laptops", count: 41 },
        { name: "Business Laptops", count: 19 }
      ]
    },
    {
      name: "Gaming",
      subcategories: [
        { name: "Gaming Mice", count: 47 },
        { name: "Keyboards", count: 39 },
        { name: "Headsets", count: 52 },
        { name: "Controllers", count: 31 },
        { name: "Gaming Chairs", count: 23 }
      ]
    },
    {
      name: "Fashion",
      subcategories: [
        { name: "Men's Clothing", count: 156 },
        { name: "Women's Clothing", count: 198 },
        { name: "Shoes", count: 87 },
        { name: "Accessories", count: 64 },
        { name: "Bags", count: 43 }
      ]
    }, {
      name: "Phones",
      subcategories: [
        { name: "iPhone", count: 45 },
        { name: "Samsung", count: 38 },
        { name: "Google Pixel", count: 22 },
        { name: "OnePlus", count: 18 },
        { name: "Accessories", count: 89 }
      ]
    }, {
      name: "Phones",
      subcategories: [
        { name: "iPhone", count: 45 },
        { name: "Samsung", count: 38 },
        { name: "Google Pixel", count: 22 },
        { name: "OnePlus", count: 18 },
        { name: "Accessories", count: 89 }
      ]
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
    }
  };

  const handleTagClick = (tag: string): void => {
    setSearchTerm(tag);
    setActiveTag(tag);
    console.log("Tag selected:", tag);
  };

  const handleSubcategoryClick = (subcategory: string): void => {
    setSearchTerm(subcategory);
    setActiveTag(subcategory);
    console.log("Subcategory selected:", subcategory);
  };

  return (
    <div className="search-wrapper">
      <form className="form-search" onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <SearchIcon />
        </button>
      </form>

      <div className="tags-container">
        {searchTags.map((tag) => (
          <span
            key={tag.name}
            className={`tag ${activeTag === tag.name ? 'active' : ''}`}
            onClick={() => handleTagClick(tag.name)}
          >
            {tag.name}
            <div className="category-dropdown">
              {tag.subcategories.map((sub) => (
                <div
                  key={sub.name}
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubcategoryClick(sub.name);
                  }}
                >
                  <span className="item-name">{sub.name}</span>
                  <span className="item-count">({sub.count})</span>
                </div>
              ))}
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;