import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import TextExpander from '@/app/_components/TextExpander';

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return {
    title: `Cabin ${name}`,
    description: `Cabin ${name}`,
  };
}

/**
 * Generates the static parameters for the cabin pages.
 *
 * This function is used by Next.js to generate the static paths for the cabin pages.
 * It retrieves all the cabins from the data service and maps them to an array of
 * objects with the `cabinId` parameter.
 * This array is then used by Next.js to generate the static paths for the cabin pages.
 *
 * @returns {Promise<{ cabinId: string }[]>} An array of objects with the `cabinId` parameter.
 */
export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }));
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />

      <div>
        <h2 className='text-5xl font-semibold text-center'>
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
