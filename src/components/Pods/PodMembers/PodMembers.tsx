import React from 'react';

interface PodMember {
  name: string;
}

interface PodMembersProps {
  members?: PodMember[];
}

const PodMembers = ({ members = [] }: PodMembersProps) => {
  return (
    <>
      <div className="text-[18px]">Members</div>
      <div className="text-[16px] h-[210px] mx-auto my-2.5">
        {members.map(({ name }, m) => (
          <div key={m}>{name}</div>
        ))}
      </div>
    </>
  );
};

export default PodMembers;
