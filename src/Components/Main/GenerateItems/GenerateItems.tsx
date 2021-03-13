import React from 'react';
import { MainItem } from '../../styledComponents';

interface GenerateItemsProps {
  data: string[];
}

const GenerateItems: React.FC<GenerateItemsProps> = ({ data }) => (
  <>
    {data.map((item) => (
      <MainItem key={item}>
        {item}
      </MainItem>
    ))}
  </>
);

export default GenerateItems;
