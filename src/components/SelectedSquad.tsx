import React, { FC } from 'react';
import { Box, Container, Typography, Stack, Avatar } from '@mui/material';

import type { Character, CharacterAbility } from '../types'

interface Props {
  abilityList     : string[],
  selected        : readonly Character[],
  removeCharacter : ( character: Character ) => void
}

const SelectedSquad: FC<Props> = ({ abilityList, selected, removeCharacter }) => {
  return  (
    <Container>

      <Typography variant="h6" component="div" fontWeight="700">
        { selected.length > 0 ? 'Your champions!' : 
          'Select your squad to defend earthrealm' }
      </Typography>

      <Stack 
        direction={{ xs:'column', sm: 'row'}} 
        spacing={2} 
        justifyContent="center" 
        alignItems="center" 
        margin="1em 0"
      >
        {selected.map(( character: Character, index ) => (
          <Avatar
            className="character-avatar selected-avatar" 
            alt={character.name}
            src={character.image}
            sx={{ width:80, height:80 }}
            key={`avatar-${index}`}
            onClick={() => removeCharacter( character )}
          />
        ))}
      </Stack>

      <Container maxWidth="sm">
        <Stack 
          className="average-ability--wraper"
          direction={{ xs:'column', sm: 'row'}}
          spacing={4}
          padding={0}
        >
          {abilityList.map(( ability: string, index: number ) => {
            let result = 0;
            if ( selected.length > 0 ) {
              selected.forEach(( character: Character ) => {
                result += character.abilities.filter(( element: CharacterAbility ) => 
                  element.abilityName === ability )[0].abilityScore;
              })
            }
            return (
              <Box 
                className="individual-average-ability"
                key={`individual-average-${index}`}
              >
                <Box margin="1.2em 0">
                  { ability }
                </Box>
                <Box 
                  fontSize="1.5em"
                  fontWeight="700"
                  margin="0 0 1em 0"
                >
                  { selected.length > 0 ? (result / selected.length).toFixed(2) : '-' }
                </Box>
              </Box>
            );
          })}
        </Stack>
        <Box className="small-text">* Total as average for squad</Box>
      </Container>
    </Container>
  );
};

export default SelectedSquad;