import { useQuery } from 'react-query';
import { useHttp } from '@/hooks/useHttp';

interface PageParamsProps {
  pageIndex: string
}
export const useFetchTemplates = (param: PageParamsProps) => {
  const client = useHttp();
  return useQuery(['templates', param], () => client('templates', { data: param }));
};

export const useFetchWorks = (param?: PageParamsProps) => {
  const client = useHttp();
  return useQuery(['works', param], () => client('works', { data: param }));
};
