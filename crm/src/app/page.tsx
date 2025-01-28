import AddCompanyButton from './components/add-company-button';
import StatusLabel, { Status } from './components/status-label';

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Home Page
      </h1>
      <AddCompanyButton />
    </main>
  );
}
