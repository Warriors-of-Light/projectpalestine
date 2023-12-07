import React from 'react';
import AlternativesItem from './alternativesItem';
import { Alternative } from '@/constants';

interface AlternativesListProps {
    alternatives: Alternative[];
}

const AlternativesList = ({ alternatives }: AlternativesListProps) => {
  return (
    <div className="flex flex-row justify-center pt-8 flex-wrap">
      {alternatives.map((alternative, index) => (
        <AlternativesItem key={index} alternative={alternative} />
      ))}
    </div>
  );
};

export default AlternativesList;
