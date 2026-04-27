import React, { useState } from 'react';
import { InventoryItem } from '../types/inventory';
import { MausritterItemData } from '../hooks/useMausritterItems';
import { useItemImages } from '../hooks/useItemImages';

interface CustomItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: 'weapon' | 'armor' | 'item' | 'spell' | 'condition';
  onSubmit: (itemData: MausritterItemData, type: InventoryItem['type']) => void;
}

export const CustomItemDialog: React.FC<CustomItemDialogProps> = ({
  isOpen,
  onClose,
  category,
  onSubmit
}) => {
  const { getImageOptionsByCategory, getImageUrl } = useItemImages();
  const [formData, setFormData] = useState({
    name: '',
    damage: '',
    weaponCategory: 'light' as 'light' | 'medium' | 'heavy',
    defense: 1,
    size: 'small' as 'small' | 'wide' | 'tall' | 'large',
    maxUsageDots: 3,
    description: '',
    clearInstructions: '',
    imageKey: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const itemData: MausritterItemData = {
      name: formData.name.trim(),
      size: formData.size,
      maxUsageDots: formData.maxUsageDots,
      usageDots: 0,
      imageKey: formData.imageKey || undefined,
      ...(category === 'weapon' && {
        damage: formData.damage || 'd6',
        weaponCategory: formData.weaponCategory
      }),
      ...(category === 'armor' && {
        defense: formData.defense
      }),
      ...(category === 'condition' && {
        description: formData.description,
        clearInstructions: formData.clearInstructions
      })
    };

    onSubmit(itemData, category);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      damage: '',
      weaponCategory: 'light',
      defense: 1,
      size: 'small',
      maxUsageDots: 3,
      description: '',
      clearInstructions: '',
      imageKey: ''
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  const getCategoryLabel = () => {
    const labels = {
      weapon: 'Arma',
      armor: 'Armadura',
      item: 'Item',
      spell: 'Faitiço',
      condition: 'Condição'
    };
    return labels[category];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medium text-stone-800">
              Criar {getCategoryLabel()} Customizado(a)
            </h2>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 text-xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name - Required for all */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
                placeholder={`Insira o nome do(a) ${getCategoryLabel()}`}
                required
              />
            </div>

            {/* Size - For all items */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Tamanho
              </label>
              <select
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
              >
                <option value="small">Pequeno (1×1)</option>
                <option value="wide">Largo (2×1)</option>
                <option value="tall">Alto (1×2)</option>
                <option value="large">Grande (2×2)</option>
              </select>
            </div>

            {/* Image Selector */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Imagem do Item
              </label>
              <div className="space-y-2">
                <select
                  value={formData.imageKey}
                  onChange={(e) => handleInputChange('imageKey', e.target.value)}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">Sem imagem</option>
                  {getImageOptionsByCategory().map(categoryGroup => (
                    <optgroup key={categoryGroup.name} label={categoryGroup.name}>
                      {categoryGroup.options.map(option => (
                        <option key={option.key} value={option.key}>
                          {option.displayName}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {formData.imageKey && (
                  <div className="flex justify-center">
                    <img
                      src={getImageUrl(formData.imageKey)}
                      alt="Selected item"
                      className="w-16 h-16 object-contain border border-stone-200 rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Weapon-specific fields */}
            {category === 'weapon' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Dano
                  </label>
                  <input
                    type="text"
                    value={formData.damage}
                    onChange={(e) => handleInputChange('damage', e.target.value)}
                    className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
                    placeholder="ex., d6, d8, d6/d8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={formData.weaponCategory}
                    onChange={(e) => handleInputChange('weaponCategory', e.target.value)}
                    className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="light">Leve</option>
                    <option value="medium">Médio</option>
                    <option value="heavy">Pesado</option>
                    <option value="light ranged">Curto Alcance</option>
                    <option value="medium ranged">Médio Alcance</option>
                    <option value="heavy ranged">Longo Alcance</option>
                    <option value="ammunition">Munição</option>
                    <option value="improvised">Improvisado</option>
                  </select>
                </div>
              </>
            )}

            {/* Armor-specific fields */}
            {category === 'armor' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Defesa
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.defense}
                  onChange={(e) => handleInputChange('defense', parseInt(e.target.value) || 1)}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
                />
              </div>
            )}

            {/* Condition-specific fields */}
            {category === 'condition' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full border border-stone-300 rounded px-3 py-2 text-sm h-20"
                    placeholder="Descreva o efeito da Condição"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Instruções claras
                  </label>
                  <textarea
                    value={formData.clearInstructions}
                    onChange={(e) => handleInputChange('clearInstructions', e.target.value)}
                    className="w-full border border-stone-300 rounded px-3 py-2 text-sm h-20"
                    placeholder="Como remover esta condição"
                  />
                </div>
              </>
            )}

            {/* Usage dots - For items, weapons, armor, spells */}
            {category !== 'condition' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Pontos de Uso Máximo
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.maxUsageDots}
                    onChange={(e) => handleInputChange('maxUsageDots', parseInt(e.target.value) || 3)}
                    className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
                  />
                </div>
              </>
            )}

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-stone-300 rounded text-sm text-stone-700 hover:bg-stone-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 button-primary text-sm"
              >
                Criar {getCategoryLabel()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
