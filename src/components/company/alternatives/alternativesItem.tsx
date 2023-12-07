import React from 'react';
import { Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Alternative } from '@/constants';

interface AlternativesItemProps {
  alternative: Alternative;
}

const AlternativesItem = ({ alternative }: AlternativesItemProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center m-2" style={{ width: '80px', height: '110px' }}>
      <button onClick={() => router.push(`/companyprofile/${alternative.company.companyId}`)} className="w-20 h-20 rounded-full items-center bg-gray-300 mb-2">
        <Avatar src={alternative.company.logo} style={{ width: '100%', height: '100%' }} />
      </button>
      <span className="text-center font-bold max-w-full whitespace-normal line-clamp-2">{alternative.company.name}</span>
    </div>
  );
};

export default AlternativesItem;
