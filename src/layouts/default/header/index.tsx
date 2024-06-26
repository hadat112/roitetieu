import RightHeader from './RightHeader';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function Header({ children }: IProps) {
  return (
    <div className="flex items-center justify-between bg-primary text-yellow px-8 h-[64x] w-full">
      <div className="text-[3rem] mr-5 inline-flex"></div>
      <div className="block items-center w-full max-w-[80%] h-[64px]">{children}</div>
      <RightHeader />
    </div>
  );
}
