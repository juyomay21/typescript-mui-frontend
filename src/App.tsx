import React, { useState, useEffect, useMemo } from 'react'
import { Container } from '@mui/material'

import './App.css'
import jsonData from './utils/characters.json'
import type { Character, AbilityName } from './types'

import Header from './components/Header'
import SelectedSquad from './components/SelectedSquad'
import Filters from './components/Filters'
import CharacterTable from './components/CharacterTable'


const data: Character[] = jsonData as Character[]

function App() {
  const abilityList: AbilityName[] = ['Power', 'Mobility', 'Technique', 'Survivability', 'Energy'];

  // Selected character state variable
  const [selectedCharacter, setSelectedCharacter] = useState<readonly Character[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<readonly string[]>([]);
  const [tagList, setTagList] = useState<readonly string[]>([]);

  // Handle character add or remove.
  const handleCharacterClick = (character: Character) => {
    const selectedIndex = selectedCharacter.indexOf(character);
    let newSelected: readonly Character[] = [];

    if ( selectedIndex === -1 ) {
      // Limit the maximum number of selection to 5
      if ( selectedCharacter.length >= 6 ) return;
      // Add new selected character
      newSelected = newSelected.concat(selectedCharacter, character);
      setSelectedCharacter(newSelected);
    } 
    else {
      // Remove selected character
      removeCharacter(character);
    } 
  };

  // Handle remove a character from selected squad.
  const removeCharacter = (character: Character) => {
    let removedCharacters: readonly Character[] = [];
    removedCharacters = selectedCharacter.filter((element: Character) => element !== character);
    setSelectedCharacter(removedCharacters);
  };

  const handleTagClick = (tag: string | 'ClearAll') => {

    if (tag === 'ClearAll') {
      setSelectedTag([]);
      return;
    }

    const selectedIndex = selectedTag.indexOf(tag);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      // Add new selected tag
      newSelected = newSelected.concat(selectedTag, tag);
    } 
    else {
      // Remove selected tag
      newSelected = selectedTag.filter((element: string) => element !== tag);
    } 
    setSelectedTag(newSelected);
  };

  // Handle search box change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Filter name and tags with search input box value
  const filterBySearchText = (character: Character) => {
    let resultFlag = false;
    if (character.name.toUpperCase().includes(searchText.toUpperCase())) {
        resultFlag = true;
    }
    else if (character.tags) {
      character.tags.forEach((tag: { tag_name: string }) => {
        if (tag.tag_name.toUpperCase().includes(searchText.toUpperCase()))
          resultFlag = true;
      })
    }
    return resultFlag;
  }

  // Filter by tag selection
  const filterByTag = (character: Character) => {
    let resultFlag = false;
    if (selectedTag.length === 0) {
      resultFlag = true;
    }
    else if (character.tags) {
      character.tags.forEach((tag: { tag_name: string }) => {
        if (selectedTag.includes(tag.tag_name))
          resultFlag = true;
      })
    }
    return resultFlag;
  }

  // Handle character list filter
  const characterList = useMemo(() => {
    return data.filter(filterBySearchText).filter(filterByTag);
  }, [searchText, selectedTag]);

  useEffect(() => {
    let tagArray :string[] = [];
    data.forEach((character: Character) => {
      if (character.tags) {
        character.tags.forEach((tag: { tag_name: string }) => {
          if (tagArray.indexOf(tag.tag_name) === -1)
            tagArray.push(tag.tag_name);
        });
      }
    });
    setTagList(tagArray);
  }, []);

  return (
    <div className="App">
      <Header />
      <Container className="App-container">
        <SelectedSquad 
          abilityList={ abilityList }
          selected={ selectedCharacter }
          removeCharacter={ removeCharacter }
        />
        <Filters 
          handleInputChange={ handleInputChange }
          tagList={ tagList }
          selectedTag={ selectedTag }
          handleTagClick={ handleTagClick }
        />
        <CharacterTable 
          characterList={ characterList }
          abilityList={ abilityList }
          selected={ selectedCharacter }
          handleClick={ handleCharacterClick }
        />
      </Container>
    </div>
  )
}

export default App
