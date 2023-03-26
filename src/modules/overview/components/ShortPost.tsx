import { Button, Divider, Dropdown, MenuProps, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { marked } from 'marked';
import dayjs from 'dayjs';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => void;
  data: {
    title: string;
    content: string;
    slug: string;
    _id: string;
    created_at: string;
  };
}

export const createMarkUp = (val) => {
  if (val) return { __html: marked(val) };
};

export default function ShortPost(props: IProps) {
  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => setDeleteState({ open: true })}>Delete</div>,
      key: 0,
    },
  ];
  const [deleteState, setDeleteState] = useState({ open: false });

  const handleDelete = async () => {
    props.handleDelete(props.data?._id);
    setDeleteState({ open: false });
  };

  return (
    <>
      <div className="max-w-[900px] bg-white px-16 pt-8 pb-8 mx-auto mt-8 flex flex-col items-center relative">
        <Dropdown menu={{ items }}>
          <span className="text-2xl absolute top-3 right-4 cursor-pointer hover:bg-bg-body rounded-full p-1 w-[36px] h-[36px] flex items-center justify-center text-center">
            <EllipsisOutlined />
          </span>
        </Dropdown>
        <h1 className="text-3xl font-bold text-center leading-10 mb-4">{props.data?.title}</h1>
        <span className="">
          {dayjs(props.data?.created_at).format('DD-MM-YYYY')} - Rối nước tế tiêu - 0 Bình luận
        </span>
        <div className="w-[60px]">
          <Divider className="h-[2px]" />
        </div>
        <p className="text-lg leading-10 text-justify mb-8 max-h-[200px] overflow-hidden">
          <div dangerouslySetInnerHTML={createMarkUp(props.data?.content)}></div>
        </p>
        <Button>
          <Link href={`/overview/${props.data?.slug}` || '/'}> Đọc thêm </Link>
        </Button>
      </div>
      <Modal
        open={deleteState.open}
        className="modal-web"
        width="720"
        onCancel={() => setDeleteState({ open: false })}
        title={<div className="relative flex items-center justify-center py-2">Xoá bài viết</div>}
        footer={
          <div className="flex justify-end gap-x-3">
            <Button size="small" onClick={() => setDeleteState({ open: false })}>
              Huỷ
            </Button>
            <Button size="small" onClick={handleDelete}>
              Đồng ý
            </Button>
          </div>
        }
      >
        <p className="m-0 flex justify-center flex-1">
          <span> Bạn có muốn xoá bài viết này? </span>
        </p>
      </Modal>
    </>
  );
}