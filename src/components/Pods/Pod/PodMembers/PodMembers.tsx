import React from 'react';
import { useParams } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../../stores/spotifyStore';
import { useProfile } from '../../../../queries/spotify';
import { usePod } from '../../../../queries/pods';
import type { PodMember } from '../../../../types';

const getIsActiveMember = (member: PodMember, activeList: string[]) =>
  activeList.find(activeMember => activeMember === member.id);

const PodMembers = () => {
  const { podId } = useParams({ strict: false }) as { podId: string };
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const { data: profile } = useProfile(accessToken);
  const userId = profile?.id;
  const { data: pod } = usePod(podId);

  const memberList = pod?.members ?? [];
  const activeMemberList = pod?.activeMembers ?? [];
  const podCreatorId = pod?.createdBy?.id;

  return (
    <div className="m-[25px]">
      <div className="text-[1.1em] pb-[3px] relative underline">Pod Members</div>
      {memberList.map((member: PodMember) => {
        const isActiveMember = getIsActiveMember(member, activeMemberList);
        const isCurrentUser = member.id === userId;

        return (
          <div
            key={member.id}
            className={`py-2.5 my-[5px] ${isActiveMember || isCurrentUser ? 'text-peapod' : ''} ${member.id === podCreatorId ? "italic after:content-['_(Creator)']" : ''}`}
          >
            {member.display_name}
          </div>
        );
      })}
    </div>
  );
};

export default PodMembers;
