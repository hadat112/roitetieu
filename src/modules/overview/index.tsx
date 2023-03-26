import { createPost, deletePost, getPost } from '@/services/puppetService';
import { Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import CreatePost from '../../modules/overview/components/CreatePost';
import ShortPost from '../../modules/overview/components/ShortPost';
import Sider from '../../modules/overview/components/Sider';

export default function Overview() {
  const [modalState, setModalState] = useState({ open: false });
  const [post, setPost] = useState<any>();

  function removeAccents(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }
  const handleSubmit = async (title: string, content: any) => {
    const dataForm = {
      title: title,
      content: content,
      slug: removeAccents(title).toLocaleLowerCase().split(' ').join('-'),
      type: 'overview',
    };
    const result: any = await createPost(dataForm);

    if (result.error) {
      setModalState({ open: false });
      return message.error(result.error);
    }

    setPost((state) => [result.data, ...state]);
    setModalState({ open: false });
  };

  const handleDeletePost = async (id) => {
    const result: any = await deletePost({ id });
    if (result.error) return message.error(result.error);

    const newPost = post.filter((post) => post._id !== id);

    setPost(newPost);
  };

  const getPostList = async () => {
    const response: any = await getPost({ type: 'post' });
    if (response.error) return message.error(response.error);
    setPost(response.data);
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div className="flex bg-[#ECEFF1]">
      <div className="flex flex-col flex-1 w-full p-4">
        <div className="max-w-[900px] w-full flex gap-4 mx-auto">
          <Input />
          <Button className="text-2xl leading-5" onClick={() => setModalState({ open: true })}>
            +
          </Button>
        </div>

        {post?.map((post) => {
          return (
            <div key={post._id} className="w-full flex-1">
              <ShortPost handleDelete={handleDeletePost} data={post} />
            </div>
          );
        })}
        <CreatePost
          onOk={handleSubmit}
          onCancel={() => setModalState({ open: false })}
          visible={modalState.open}
        />
      </div>
      <Sider className="" />
    </div>
  );
}