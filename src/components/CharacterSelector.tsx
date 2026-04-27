import React, { useState, useRef } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useCharacterStore } from '../stores/characterStore-simple';
import { Character } from '../types/character';
import { CharacterGenerationWizard } from './CharacterGenerationWizard';
import { CharacterFactory } from '../factories';

export const CharacterSelector: React.FC = () => {
  const { 
    characters, 
    currentCharacter, 
    addCharacter, 
    setCurrentCharacter, 
    deleteCharacter 
  } = useCharacterStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const importFileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateCharacter = () => {
    const newCharacter = CharacterFactory.createBlank();
    addCharacter(newCharacter);
  };

  const handleDeleteCharacter = (id: string) => {
    deleteCharacter(id);
    setShowDeleteConfirm(null);
  };

  const importCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as Character;
        
        // Validate that it's a valid character object by checking required fields
        if (!imported.id || typeof imported.name !== 'string' || typeof imported.level !== 'number') {
          alert('Invalid character file format');
          return;
        }

        // Use factory to create character from imported data with new ID
        const characterWithNewId = CharacterFactory.createFromImport(imported);

        addCharacter(characterWithNewId);
        alert(`Character "${characterWithNewId.name}" imported successfully!`);
      } catch (error) {
        alert('Error reading character file. Please make sure it\'s a valid JSON file.');
      }
    };

    reader.readAsText(file);
    // Reset the input value so the same file can be imported again if needed
    event.target.value = '';
  };

  if (characters.length === 0) {
    return (
      <>
        <div className="max-w-md mx-auto mt-20 text-center px-4">
          <div className="card">
            <h1 className="text-2xl sm:text-3xl text-theme-primary-800 text-theme-primary-800 mb-6">
              Gerenciador de Personagem - Mausritter
            </h1>
            <p className="text-theme-primary-800 mb-6">
              Bem-Vindo(a)! Você não tem personagens ainda...
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setShowWizard(true)}
                className="button-primary text-base sm:text-lg px-4 sm:px-6 py-3 w-full min-h-[44px] touch-manipulation"
              >
                🎲 Gerar Personagem aleatório
              </button>
              <div className="text-sm text-theme-text-light">ou</div>
              <button
                onClick={handleCreateCharacter}
                className="px-4 sm:px-6 py-3 border border-theme-primary-800 text-theme-primary-800 rounded hover:bg-theme-primary-100 transition-colors text-base sm:text-lg w-full min-h-[44px] touch-manipulation"
              >
                Criar Personagem em Branco
              </button>
              <div className="text-sm text-theme-text-light">ou</div>
              <button
                onClick={() => importFileInputRef.current?.click()}
                className="px-4 sm:px-6 py-3 border border-theme-primary-800 text-theme-primary-800 rounded hover:bg-theme-primary-100 transition-colors text-base sm:text-lg w-full min-h-[44px] touch-manipulation"
              >
                📄 Importar de JSON
              </button>
            </div>
          </div>
        </div>
        
        <CharacterGenerationWizard 
          isOpen={showWizard}
          onClose={() => setShowWizard(false)}
        />
        
        <input
          ref={importFileInputRef}
          type="file"
          accept=".json"
          onChange={importCharacter}
          className="hidden"
        />
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h1 className="text-2xl sm:text-3xl text-theme-primary-800 text-theme-primary-800">
            Seus Personagens
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowWizard(true)}
              className="button-primary min-h-[44px] touch-manipulation text-sm sm:text-base"
            >
              🎲 Gerar
            </button>
            <button
              onClick={handleCreateCharacter}
              className="px-3 sm:px-4 py-2 border border-theme-primary-800 text-theme-primary-800 rounded hover:bg-theme-primary-100 transition-colors min-h-[44px] touch-manipulation text-sm sm:text-base"
            >
              Personagem em branco
            </button>
            <button
              onClick={() => importFileInputRef.current?.click()}
              className="px-3 sm:px-4 py-2 border border-theme-primary-800 text-theme-primary-800 rounded hover:bg-theme-primary-100 transition-colors min-h-[44px] touch-manipulation text-sm sm:text-base"
              title="Importar personagem de arquivo JSON"
            >
              📄 Importar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`relative group border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                currentCharacter?.id === character.id
                  ? 'border-theme-primary-600 bg-theme-primary-600 bg-opacity-10'
                  : 'border-theme-primary-800 bg-theme-surface hover:bg-theme-primary-200'
              }`}
              onClick={() => setCurrentCharacter(character)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h3 className={`text-2xl font-medium text-theme-primary-800 ${
                    !character.alive ? 'line-through opacity-60' : ''
                  }`}>
                    {character.name || 'Personagem sem Nome'}
                  </h3>
                  {!character.alive && <span className="text-lg">💀</span>}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(character.id);
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                             text-theme-primary-600 hover:text-theme-error-600 w-6 h-6 
                             flex items-center justify-center pointer-events-auto"
                  title="Deletar personagem"
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
              
              <div className="text-sm text-theme-primary-800 opacity-75 mb-2">
                Nível {character.level} • {character.experience} XP
              </div>
              
              <div className="text-xs text-theme-primary-800">
                {character.background && (
                  <div>Background: {character.background}</div>
                )}
                <div>
                  FOR {character.strength} • DES {character.dexterity} • VON {character.will}
                </div>
                <div>
                  PV {character.hitPoints}/{character.maxHitPoints}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-theme-primary-800 mb-4">
              Deletar Personagem
            </h3>
            <p className="text-theme-primary-800 mb-6">
              Você tem certeza que quer deletar este personagem? Esta ação não pode ser desfeita.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDeleteCharacter(showDeleteConfirm)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Deletar
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-theme-primary-800 text-theme-primary-800 rounded hover:bg-theme-primary-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      <CharacterGenerationWizard 
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
      />
      
      <input
        ref={importFileInputRef}
        type="file"
        accept=".json"
        onChange={importCharacter}
        className="hidden"
      />
    </div>
  );
};
