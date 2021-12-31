import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from 'react-query';
import { useHttp } from '@/hooks/useHttp';
import { useConfig } from '@/hooks/useOptimisticOptions';
import { ComponentDataProps } from '@/store/editor';
import useWork from '@/hooks/useWork';

interface PageParamsProps {
  pageIndex: number;
  pageSize: number;
}

interface CreateWorksProps {
  title: string;
  desc: string;
  coverImg: string;
}

interface SaveWorkProps {
  content: {
    components: ComponentDataProps[];
    props: { [k: string]: any };
    setting: { [k: string]: any };
  };
  coverImg?: string;
  desc?: string;
  title?: string;
}

interface CreateChannelProps {
  name: string;
  workId: number;
}

interface WorkType {
  id: string;
}

interface WorkListType {
  list: WorkType[];
}
export const useDeleteWorkConfig = (queryKey: QueryKey) =>
  useConfig<WorkListType>(
    queryKey,
    (target, old) => old?.list?.filter((item) => item.id !== target.id) || [],
  );

export const useFetchTemplates = () => {
  const client = useHttp();
  return useInfiniteQuery(
    'templates',
    ({ pageParam = 0 }) => client(`templates?pageIndex=${pageParam}&pageSize=4`),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 < lastPage.pageTotal ? lastPage.page + 1 : undefined,
    },
  );
};

export const useFetchPublishTemplate = () => {
  const client = useHttp();
  const { publishTemplate } = useWork();
  return useMutation(
    (id: string) =>
      client(`works/publish-template/${id}`, {
        method: 'POST',
      }),
    {
      onSuccess: () => {
        publishTemplate();
      },
    },
  );
};

export const useFetchWorks = (param: PageParamsProps) => {
  const client = useHttp();
  return useQuery(
    ['works', param],
    () =>
      client('works', {
        data: param,
      }),
    {
      keepPreviousData: true,
    },
  );
};

export const useFetchWorkById = (workId?: string) => {
  const { getWork } = useWork();
  const client = useHttp();
  return useQuery(['work', { workId }], () => client(`works/${workId}`), {
    enabled: Boolean(workId),
    onSuccess: (data) => {
      getWork(data);
    },
  });
};

export const useFetchCreteChannel = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (param: CreateChannelProps) =>
      client('channel', {
        data: param,
        method: 'POST',
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('channels');
      },
    },
  );
};

export const useFetchGetChannels = (workId?: string) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const { getChannels } = useWork();
  const { mutateAsync: fetchCreatChannel } = useFetchCreteChannel();
  return useQuery(
    ['channels', { workId }],
    () => client(`channel/getWorkChannels/${workId}`),
    {
      enabled: Boolean(workId),
      onSuccess: async (data) => {
        getChannels(data.list);
        if (data.list.length === 0 && workId) {
          await fetchCreatChannel({ name: '默认', workId: parseInt(workId, 10) });
          await queryClient.invalidateQueries('channels');
        }
      },
    },
  );
};

export const useFetchDeleteChannel = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      client(`channel/${id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('channels');
      },
    },
  );
};

export const useFetchCreateWork = () => {
  const client = useHttp();
  return useMutation((param: CreateWorksProps) =>
    client('works', {
      data: param,
      method: 'POST',
    }),
  );
};

export const useFetchDeleteWork = () => {
  const client = useHttp();
  return useMutation(
    (workId: string | number) =>
      client(`works/${workId}`, {
        method: 'DELETE',
      }),
    useDeleteWorkConfig(['works']),
  );
};

export const useFetchSaveWork = (workId?: string) => {
  const client = useHttp();
  const { saveWork } = useWork();
  return useMutation(
    (param: SaveWorkProps) =>
      client(`works/${workId}`, {
        data: param,
        method: 'PATCH',
      }),
    {
      onSuccess: () => {
        saveWork();
      },
    },
  );
};

export const useFetchCopyWork = () => {
  const client = useHttp();
  const { copyWork } = useWork();
  return useMutation(
    (workId: string | number) =>
      client(`works/copy/${workId}`, {
        method: 'POST',
      }),
    {
      onSuccess: () => {
        copyWork();
      },
    },
  );
};

export const useFetchPublishWork = () => {
  const { publishWork } = useWork();
  const client = useHttp();
  return useMutation(
    (workId?: string) =>
      client(`works/publish/${workId}`, {
        method: 'POST',
      }),
    {
      onSuccess: () => {
        publishWork();
      },
    },
  );
};
