import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box, FormControl, InputAdornment, OutlinedInput, SvgIcon, Button, ButtonProps } from '@mui/material';


const TagButton = styled( Button )<ButtonProps>(() => ({
  backgroundColor : 'rgb(255, 255, 255)',
  border          : '1px solid',
  borderRadius    : '1.2em',
  margin          : '0 10px 10px 0',
  fontSize        : '.8em',
  height          : '2.4em',
  lineHeight      : '2.4em',
}));

interface Props {
  handleInputChange : (e: React.ChangeEvent<HTMLInputElement>) => void,
  tagList           : readonly string[],
  selectedTag       : readonly string[],
  handleTagClick    : (tag: string | 'ClearAll') => void
}

const Filters: FC<Props> = ({ handleInputChange, tagList, selectedTag, handleTagClick }) => {
  return  (
    <>
      <Box className="search-box--wrapper">
        <FormControl fullWidth>
          <OutlinedInput 
            className="search--input"
            placeholder="Search characters..."
            size="small"
            startAdornment={
              <InputAdornment position="start">
                  <SvgIcon width="32px" height="32px">
                    <path d="m19.6 21.225-6.35-6.35q-.75.575-1.725.925-.975.35-2.075.35-2.775 0-4.7-1.938Q2.825 12.275 2.825 9.5q0-2.775 1.925-4.713Q6.675 2.85 9.45 2.85q2.775 0 4.713 1.937Q16.1 6.725 16.1 9.5q0 1.1-.337 2.075-.338.975-.913 1.7l6.325 6.35ZM9.45 13.85q1.825 0 3.1-1.263 1.275-1.262 1.275-3.087 0-1.825-1.275-3.088-1.275-1.262-3.1-1.262-1.825 0-3.087 1.262Q5.1 7.675 5.1 9.5q0 1.825 1.263 3.087Q7.625 13.85 9.45 13.85Z" />
                  </SvgIcon>
              </InputAdornment>
            }
            onChange={( e: React.ChangeEvent<HTMLInputElement> ) => { handleInputChange( e )}}
          />
        </FormControl>
      </Box>
      <Box marginTop="50px" textAlign="left">
        {tagList.map(( tag: string, index ) => {
          const style = selectedTag.indexOf( tag ) >= 0 ? 'tag-selected--button' : '';
          return (
            <TagButton 
              className={`tag--button ${style}`}
              variant="outlined"
              key={`tag-btn-${index}`}
              onClick={ () => { handleTagClick( tag ) } }
            >
              <span>✔</span>
              {tag}
            </TagButton>
          );
        })}
        <button 
          className="clear-all--btn"
          onClick={ () => { handleTagClick( 'ClearAll' ) }}
        >
          Clear All
        </button>
      </Box>
    </>
  );
};

export default Filters;