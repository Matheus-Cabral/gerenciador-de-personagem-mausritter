import React from 'react';
import { Character } from '../types/character';

interface CharacterDetailsProps {
  character: Character;
  onUpdate: (updates: Partial<Character>) => void;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  onUpdate,
}) => {
  const handleInputChange = (field: keyof Character) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate({ [field]: e.target.value });
  };

  const handleNumberChange = (field: keyof Character) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value) || 0;
    
    // Validate current attributes don't exceed their max values
    if (field === 'strength' && value > character.maxStrength) {
      onUpdate({ [field]: character.maxStrength });
    } else if (field === 'dexterity' && value > character.maxDexterity) {
      onUpdate({ [field]: character.maxDexterity });
    } else if (field === 'will' && value > character.maxWill) {
      onUpdate({ [field]: character.maxWill });
    } else if (field === 'hitPoints' && value > character.maxHitPoints) {
      onUpdate({ [field]: character.maxHitPoints });
    } else {
      onUpdate({ [field]: value });
    }
  };

  const handleCheckboxChange = (field: keyof Character) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onUpdate({ [field]: e.target.checked });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-medium text-theme-primary-800 mb-4">Detalhes do Personagem</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
            Nome
          </label>
          <input
            type="text"
            value={character.name}
            onChange={handleInputChange('name')}
            className={`input-field w-full ${
              !character.alive ? 'line-through opacity-60' : ''
            }`}
            placeholder="Insira o nome do personagem"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-theme-primary-800">
            Status
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={character.alive}
              onChange={handleCheckboxChange('alive')}
              className="w-3 h-3 text-theme-primary-600 border-theme-primary-300 rounded focus:ring-theme-primary-600 focus:ring-1"
            />
            <span className={`text-xs ${
              character.alive ? 'text-theme-primary-800' : 'text-theme-primary-500'
            }`}>
              {character.alive ? 'Vivo' : 'Morto'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
              Nível
            </label>
            <input
              type="number"
              value={character.level}
              onChange={handleNumberChange('level')}
              className="input-field w-full"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
              XP
            </label>
            <input
              type="number"
              value={character.experience}
              onChange={handleNumberChange('experience')}
              className="input-field w-full"
              min="0"
            />
          </div>
        </div>
        <div className="text-xs text-theme-primary-600 -mt-2">
          Tesouro Recuperado → XP
        </div>

        {/* Attributes */}
        <div className="space-y-3">
          {/* STR */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-theme-primary-800">
              FOR
            </label>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={character.strength}
                onChange={handleNumberChange('strength')}
                className="input-field w-24 text-center font-semibold"
                min="0"
                max={character.maxStrength}
              />
              <span className="text-theme-primary-800 font-bold">/</span>
              <input
                type="number"
                value={character.maxStrength}
                onChange={handleNumberChange('maxStrength')}
                className="input-field w-24 text-center font-semibold"
                min="1"
              />
            </div>
          </div>
          
          {/* DEX */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-theme-primary-800">
              DES
            </label>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={character.dexterity}
                onChange={handleNumberChange('dexterity')}
                className="input-field w-24 text-center font-semibold"
                min="0"
                max={character.maxDexterity}
              />
              <span className="text-theme-primary-800 font-bold">/</span>
              <input
                type="number"
                value={character.maxDexterity}
                onChange={handleNumberChange('maxDexterity')}
                className="input-field w-24 text-center font-semibold"
                min="1"
              />
            </div>
          </div>
          
          {/* WIL */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-theme-primary-800">
              VON
            </label>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={character.will}
                onChange={handleNumberChange('will')}
                className="input-field w-24 text-center font-semibold"
                min="0"
                max={character.maxWill}
              />
              <span className="text-theme-primary-800 font-bold">/</span>
              <input
                type="number"
                value={character.maxWill}
                onChange={handleNumberChange('maxWill')}
                className="input-field w-24 text-center font-semibold"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Hit Points - spaced apart */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-theme-primary-800">
            PV
          </label>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              value={character.hitPoints}
              onChange={handleNumberChange('hitPoints')}
              className="input-field w-24 text-center font-semibold"
              min="0"
              max={character.maxHitPoints}
            />
            <span className="text-theme-primary-800 font-bold">/</span>
            <input
              type="number"
              value={character.maxHitPoints}
              onChange={handleNumberChange('maxHitPoints')}
              className="input-field w-24 text-center font-semibold"
              min="1"
            />
          </div>
        </div>

        {/* Pips */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-theme-primary-800">
            Grãos
          </label>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              value={character.pips}
              onChange={handleNumberChange('pips')}
              className="input-field w-24 text-center font-semibold"
              min="0"
              max="250"
            />
            <span className="text-theme-primary-800 font-bold">/</span>
            <span className="w-24 text-center font-semibold text-theme-primary-800">250</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
            Antecedente
          </label>
          <input
            type="text"
            value={character.background}
            onChange={handleInputChange('background')}
            className="input-field w-full"
            placeholder="ex. Forrageador de Cozinha"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
            Signo
          </label>
          <input
            type="text"
            value={character.birthsign}
            onChange={handleInputChange('birthsign')}
            className="input-field w-full"
            placeholder="ex. Estrela"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
            Pelagem
          </label>
          <input
            type="text"
            value={character.coat}
            onChange={handleInputChange('coat')}
            className="input-field w-full"
            placeholder="Descreva sua Pelagem"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
            Visual
          </label>
          <textarea
            value={character.look}
            onChange={handleInputChange('look')}
            className="input-field w-full h-20 resize-none"
            placeholder="Descreva o Visual do seu personagem"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
            Bravura
          </label>
          <input
            type="number"
            value={character.grit}
            onChange={handleNumberChange('grit')}
            className="input-field w-full"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
            Condições Ignoradas
          </label>
          <textarea
            value={character.ignoredConditions}
            onChange={handleInputChange('ignoredConditions')}
            className="input-field w-full h-24 resize-none"
            placeholder="Liste as condições ignoradas graças a sua Bravura"
          />
          <div className="text-xs text-theme-primary-600 mt-1">
            Ignore um número de condições igual a sua Bravura
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-theme-primary-800 mb-1">
            Itens e Grão estocados
          </label>
          <textarea
            value={character.bankedItemsAndPips}
            onChange={handleInputChange('bankedItemsAndPips')}
            className="input-field w-full h-24 resize-none"
            placeholder="Liste os Itens e Grãos qu você guardou em um local seguro"
          />
        </div>

      </div>
    </div>
  );
};
