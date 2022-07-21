import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import type { Character, CharacterAbility } from '../types'

interface Props {
  characterList : Character[],
  abilityList   : string[],
  selected      : readonly Character[],
  handleClick   : (character: Character) => void
}

const CharacterTable: FC<Props> = ({ characterList, abilityList, selected, handleClick }) => {

  const [ page, setPage ] = React.useState<number>( 0 );
  const [ rowsPerPage, setRowsPerPage ] = React.useState<number>( 5 );

  // Handle pagination
  const handleChangePage = ( event: unknown, newPage: number ) => {
    setPage( newPage );
  };

  // Handle pagination
  const handleChangeRowsPerPage = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setRowsPerPage( parseInt( event.target.value, 10 ));
    setPage(0);
  };

  const isSelected = ( character: Character ) => selected.indexOf( character ) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max( 0, (1 + page) * rowsPerPage - characterList.length ) : 0;

  return (
    <Paper sx={{ width: '100%', mb: 2, marginY: '50px' }}>
      <TableContainer>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Character</TableCell>
              <TableCell>Tags</TableCell>
              {abilityList.map(( ability, index ) => (
                <TableCell 
                  padding="none"
                  align="center"
                  key={ index }
                >
                  {ability}
                </TableCell>                    
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {characterList.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
              .map(( character: Character, index ) => {
                const isItemSelected = isSelected( character );

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick( character )}
                    tabIndex={-1}
                    key={character.name}
                    selected={ isItemSelected }
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* Checkbox Column */}
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={ isItemSelected }
                      />
                    </TableCell>
                    
                    {/* Character name & avatar column */}
                    <TableCell
                      scope="row"
                      padding="none"
                    >
                      <Stack direction="row" spacing={2}>
                        <Avatar 
                          className="character-avatar" 
                          sx={{ width:36, height:36 }}
                          alt={ character.name }
                          src={ character.thumbnail }
                        />
                        <Box className="character-name">
                          { character.name }
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* Chracter tags column */}
                    <TableCell>
                      <Box className="tag--wrapper">
                        {character.tags && 
                        character.tags.map(( tag: { slot:number, tag_name:string }) => (
                          <Box 
                            className="character-tag" 
                            key={`${tag.slot}-${tag.tag_name}`}
                          >
                            { tag.tag_name }
                          </Box>
                        ))}
                      </Box>
                    </TableCell>

                    {/* Character ability value columns */}
                    {abilityList.map(( ability, index ) => {
                      const abilities: CharacterAbility = character.abilities.filter(
                        ( element: { abilityName: string; }) => element.abilityName === ability )[0];
                      return ( abilities && 
                        <TableCell 
                          align="center" 
                          padding="none"
                          key={index} 
                          className={ abilities.abilityScore === 10 ? 'top-rated' : '' }
                        >
                          { abilities.abilityScore }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[ 5, 10, 25 ]}
        component="div"
        count={ characterList.length }
        rowsPerPage={ rowsPerPage }
        page={ page }
        onPageChange={ handleChangePage }
        onRowsPerPageChange={ handleChangeRowsPerPage }
      />
    </Paper>
  );
}

export default CharacterTable;