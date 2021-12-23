import { useMutation, useQuery } from 'react-query';
import { useHttp } from '@/hooks/useHttp';
import {ComponentDataProps} from '@/store/editor';

interface PageParamsProps {
  pageIndex: number
}

interface CreateWorksProps {
  title: string
  desc: string
  coverImg: string
}

interface SaveWorkProps {
  content: {
    components: ComponentDataProps[],
    props: {[k: string]: any},
    setting: {[k: string]: any},
  },
  coverImg?: string,
  desc?: string,
  title?: string
}
export const useFetchTemplates = (param: PageParamsProps) => {
  const client = useHttp();
  return useQuery(['templates', param], () => client('templates', { data: param }));
};

export const useFetchWorks = (param?: PageParamsProps) => {
  const client = useHttp();
  return useQuery(['works', param], () => client('works', { data: param }));
};

export const useFetchWorkById = (workId?: string) => {
  const client = useHttp();
  return useQuery(['work', { workId }], () => client(`works/${workId}`), {
    enabled: Boolean(workId),
  });
};

export const useFetchCreateWork = () => {
  const client = useHttp();
  return useMutation((param: CreateWorksProps) => client('works', {
    data: param,
    method: 'POST',
  }));
};

export const useFetchSaveWork = (workId?: string) => {
  const client = useHttp();
  return useMutation((param: SaveWorkProps) => client(`works/${workId}`, {
    data: param,
    method: 'PATCH',
  }));
};
