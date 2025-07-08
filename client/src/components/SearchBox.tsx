import React, { useState } from "react";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  
  form {
    display: flex;
    align-items: center;
    border: 1px solid rgb(209, 200, 200);
    border-radius: 20px;
    overflow: hidden;
    background: rgb(255, 255, 255);

    &:focus-within {
      border-color: #3EA6FF;
    }
  }
  
  input {
    width: 500px;
    background: transparent;
    border: none;
    color: rgb(0, 0, 0);
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    outline: none;
    
    &::placeholder {
      color: rgb(0, 0, 0);
    }
  }

  .search-btn {
    background: rgb(150, 93, 93);
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: rgb(179, 135, 135);
    }
    
    svg {
      width: 18px;
      height: 18px;
      color: #fff;
    }
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding: 0 0.5rem;
  }

  .tag {
    background: #f0f0f0;
    color: #333;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    cursor: pointer;
    border: 1px solid #ddd;
    transition: all 0.2s;
    
    &:hover {
      background: #e0e0e0;
      border-color: #bbb;
    }
    
    &.active {
      background: rgb(150, 93, 93);
      color: white;
      border-color: rgb(150, 93, 93);
    }
  }
`;

// Icon Components
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);



const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string>("");

  // Popular search tags
  const searchTags = [
    "Electronics", "Phones", "Laptops", "Headphones",
    "Cameras", "Gaming", "Fashion"
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

  return (
    <SearchWrapper>
      <form onSubmit={handleSubmit}>
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
            key={tag}
            className={`tag ${activeTag === tag ? 'active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </SearchWrapper>
  );
};

export default SearchBox;