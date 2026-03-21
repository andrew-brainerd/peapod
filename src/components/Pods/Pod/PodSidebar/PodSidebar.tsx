import React, { useState } from 'react';
import PlayQueue from '../PlayQueue/PlayQueue';
import PlayHistory from '../PlayHistory/PlayHistory';

type SidebarTab = 'queue' | 'history';

interface PodSidebarProps {
  podId?: string;
}

const PodSidebar = ({ podId }: PodSidebarProps) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('queue');

  return (
    <div className="border-l border-gray-75 flex flex-col min-w-[280px] w-[35%] max-mobile:border-l-0 max-mobile:border-t max-mobile:border-gray-75 max-mobile:min-w-0 max-mobile:w-full">
      <div className="flex border-b border-gray-75">
        <button
          className={`bg-transparent border-none text-gray-35 cursor-pointer flex-1 text-[0.9em] p-2.5 transition-colors duration-200 hover:text-text-primary ${activeTab === 'queue' ? 'border-b-2 border-b-peapod text-text-primary' : ''}`}
          onClick={() => setActiveTab('queue')}
        >
          Queue
        </button>
        <button
          className={`bg-transparent border-none text-gray-35 cursor-pointer flex-1 text-[0.9em] p-2.5 transition-colors duration-200 hover:text-text-primary ${activeTab === 'history' ? 'border-b-2 border-b-peapod text-text-primary' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'queue' ? <PlayQueue podId={podId} /> : <PlayHistory podId={podId} />}
      </div>
    </div>
  );
};

export default PodSidebar;
