import React from 'react';
import { Header3D } from '../Header/Header3D';

interface HeaderProps {
  webGpuActive: boolean;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return <Header3D {...props} />;
};

export { Header3D };

