import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { usePods } from '../../queries/pods';
import type { Pod } from '../../types';
import Header from '../common/Header/Header';
import CreateNewButton from './CreateNewButton/CreateNewButton';
import Button from '../common/Button/Button';

const Pods = () => {
  const navigate = useNavigate();
  const { data: pods, isLoading } = usePods();

  return (
    <>
      <Header />
      <div className="p-5">
        <div className="content-start flex flex-row flex-wrap justify-center mx-auto overflow-y-auto w-[98%]">
          {isLoading ? (
            <div className="text-text-primary text-[1.2em] my-10 mx-auto text-center">Loading Pods...</div>
          ) : (
            <>
              {Array.isArray(pods) &&
                pods.map((pod: Pod) => (
                  <Button
                    key={pod._id}
                    className="shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.2),0_1px_4px_rgba(0,0,0,0.16)] !items-center !bg-gray-80 !border-gray-70 !flex !flex-col !h-[125px] !justify-center !m-5 transition-[box-shadow] duration-150 !w-[200px] hover:!bg-gray-70 hover:!border-peapod-50 max-mobile:!w-full max-mobile:!mx-0 max-mobile:!my-2.5"
                    onClick={() => navigate({ to: '/pods/$podId', params: { podId: pod._id } })}
                  >
                    <div className="text-text-primary text-[1.1em] mb-2">{pod.name || 'Untitled Pod'}</div>
                    <div className="text-gray-40 text-[0.85em]">
                      {pod.members.length} {pod.members.length === 1 ? 'member' : 'members'}
                    </div>
                  </Button>
                ))}
              <CreateNewButton />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Pods;
