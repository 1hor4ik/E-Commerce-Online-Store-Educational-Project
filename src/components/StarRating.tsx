import React from "react";
import { Icon, Stack } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Icon as={FaStar} key={i} color="yellow.500" />);
    } else if (i - 0.5 <= rating) {
      stars.push(<Icon as={FaStarHalfAlt} key={i} color="yellow.500" />);
    } else {
      stars.push(<Icon as={FaRegStar} key={i} color="yellow.500" />);
    }
  }

  return <Stack direction="row">{stars}</Stack>;
};

export default StarRating;
