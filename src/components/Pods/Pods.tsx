import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { usePods } from '../../queries/pods';
import type { Pod } from '../../types';
import Header from '../common/Header/Header';
import CreateNewButton from './CreateNewButton/CreateNewButton';
import Button from '../common/Button/Button';
import styles from './Pods.module.scss';

const Pods = () => {
  const navigate = useNavigate();
  const { data: pods, isLoading } = usePods();

  return (
    <>
      <Header />
      <div className={styles.pods}>
        <div className={styles.podList}>
          {isLoading ? (
            <div className={styles.loading}>Loading Pods...</div>
          ) : (
            <>
              {Array.isArray(pods) &&
                pods.map((pod: Pod) => (
                  <Button
                    key={pod._id}
                    className={styles.podCard}
                    onClick={() => navigate({ to: '/pods/$podId', params: { podId: pod._id } })}
                  >
                    <div className={styles.podName}>{pod.name || 'Untitled Pod'}</div>
                    <div className={styles.podMeta}>
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
