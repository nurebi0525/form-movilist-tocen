import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getAllMovies } from "../store/moviesSlice";
import styled from "styled-components";
import { Button } from "@mui/material";

export const MovieList = () => {
  const { movies, loading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const [favoriteMovies, setFavoriteMovies] = useState({});

  const handleFavoriteToggle = (id) => {
    setFavoriteMovies((prev) => ({
      ...prev,
      [id]: !prev[id],  // toggle the favorite status
    }));
  };

  return (
    <StyledDiv>
      {movies.map(({ title, id, image, rating }) => (
        <Block key={id}>
          <img src={image} alt={title} width="200px" />
          <h1>Title: {title}</h1>
          <h3>Rating: {rating}</h3>
          <Button onClick={() => handleDelete(id)}>Delete</Button>
          <Button onClick={() => handleFavoriteToggle(id)}>
            {favoriteMovies[id] ? "🧡" : "🤍"  }
          </Button>
        </Block>
      ))}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  margin: 100px;
  gap: 20px;
`;

const Block = styled.div`
  color: #757575;
  width: 200px;
  height: 250px;
`;
