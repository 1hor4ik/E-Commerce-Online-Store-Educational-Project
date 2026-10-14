import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextInterface {
  category: string;
  setCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextInterface | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [category, setCategory] = useState<string>("all");

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextInterface => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
