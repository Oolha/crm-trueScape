import Header from '../../../components/header';

interface PageProps {
  params: { id: string };
}
const Page = ({ params }: PageProps) => {
  return (
    <>
      <Header>Companies({params.id})</Header>
    </>
  );
};

export default Page;
