import React from 'react';

const FilterSlider = ({ filters, setFilters, onReset, onSave }) => {
  
  const handleSliderChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: parseInt(value) },
    }));
  };

  return (
    <div className='flex-[3] bg-[#1e1e1e] flex flex-col overflow-hidden rounded-xl border border-zinc-800'>
      
      {/* Scrollable Filter List */}
      <div className='flex-1 overflow-y-auto p-6'>
        <h2 className='text-xl font-bold mb-6 text-zinc-100'>Adjust</h2>
        {Object.entries(filters).map(([name, settings]) => (
          <div key={name} className='mb-6'>
            <div className='flex justify-between mb-2'>
              <span className='capitalize text-xs font-medium text-gray-400 tracking-wider'>
                {name.replace(/([A-Z])/g, " $1")}
              </span>
              <span className='text-xs font-mono text-amber-500'>
                {settings.value}{settings.unit}
              </span>
            </div>
            <input
              type="range"
              min={settings.min}
              max={settings.max}
              value={settings.value}
              onChange={(e) => handleSliderChange(name, e.target.value)}
              className='w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400'
            />
          </div>
        ))}
      </div>

      {/* Fixed Bottom Actions */}
      <div className='p-4 border-t border-zinc-800 bg-[#1a1a1a] flex gap-3'>
        <button
          onClick={onReset}
          className='flex-1 py-3 px-4 rounded-lg font-semibold text-sm bg-zinc-700 hover:bg-zinc-600 text-white transition-all'
        >
          Reset
        </button>
        <button
          onClick={onSave}
          className='flex-1 py-3 px-4 rounded-lg font-semibold text-sm bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20 transition-all'
        >
          Save Image
        </button>
      </div>
    </div>
  );
};

export default FilterSlider;
