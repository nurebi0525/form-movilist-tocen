import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addMovie } from '../store/moviesSlice';


export const MovieForm = () => {
const [title, setTitle] = useState("");
const [rating, setRating] = useState(0)
const [image, setImage] = useState("")
const [isFavorite, setIsFavorite] = useState(false);
const dispatch = useDispatch();

const titleValue = (e) => {
    setTitle(e.target.value);
  };
  const ratingValue = (e) => {
    setRating(e.target.value);
  };
  const imageValue = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (title.trim() && image.trim() && rating > 0) {
        const data = {
          title,
          rating,
          image,
          isFavorite,
        };
        dispatch(addMovie(data));
      }
  
      setTitle("");
      setImage("");
      setRating(0);
    };

  return (
      <StyledBox onSubmit={handleSubmit}>
       <StyledInput 
        label="Muvie:"
         placeholder='movie'
          variant='standard'
          value={title}
          onChange={titleValue}
          />
       <StyledInput 
       label="Raiting:" 
       type='number'
        placeholder='10/10'
        value={rating}
        onChange={ratingValue}
         variant='standard'/>
       <StyledInput
        label="Image URL:"
         placeholder='url'
          variant='standard'
          value={image}
          onChange={imageValue}
          />
          <Button variant='contained' color='primary' type='submit'>Add</Button>
      </StyledBox>
  )
}
 

const StyledBox = styled.form`
  display: flex;
  flex-direction: column;
`

const StyledInput = styled(TextField)`
  width: 400px;
`
