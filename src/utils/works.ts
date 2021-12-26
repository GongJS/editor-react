import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHttp } from '@/hooks/useHttp';
import { ComponentDataProps } from '@/store/editor';
import useWork from '@/hooks/useWork';

interface PageParamsProps {
  pageIndex: number;
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

export const useFetchTemplates = (param: PageParamsProps) => {
  const client = useHttp();
  return useQuery(['templates', param], () => client('templates', { data: param }));
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

export const useFetchWorks = (param?: PageParamsProps) => {
  const client = useHttp();
  return useQuery(['works', param], () => client('works', { data: param }));
};

export const useFetchWorkById = (workId?: string) => {
  const { getWork } = useWork();
  const client = useHttp();
  return useQuery(['work', { workId }], () => client(`works/${workId}`), {
    enabled: Boolean(workId),
    onSuccess: (data) => {
      if (data.errno === 0) {
        getWork(data.data);
      }
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
        await queryClient.invalidateQueries('getChannels');
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
    ['getChannels', { workId }],
    () => client(`channel/getWorkChannels/${workId}`),
    {
      enabled: Boolean(workId),
      onSuccess: async (data) => {
        if (data.errno === 0) {
          getChannels(data.data.list);
          if (data.data.list.length === 0 && workId) {
            await fetchCreatChannel({ name: '默认', workId: parseInt(workId, 10) });
            await queryClient.invalidateQueries('getChannels');
          }
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
        await queryClient.invalidateQueries('getChannels');
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

export const useFetchSaveWork = (workId?: string) => {
  const client = useHttp();
  return useMutation((param: SaveWorkProps) =>
    client(`works/${workId}`, {
      data: param,
      method: 'PATCH',
    }),
  );
};

export const useFetchCopyWork = () => {
  const client = useHttp();
  return useMutation((workId: string) =>
    client(`works/copy/${workId}`, {
      method: 'POST',
    }),
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
